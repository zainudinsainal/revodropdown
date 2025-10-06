import { h, Host } from "@stencil/core";
import "../../utils/closestPolifill";
import { UUID } from "../../utils/consts";
import { getItemLabel, getItemValue } from "../../utils/item.helpers";
import { DropdownListFilter } from "../list/revo-list.filter";
import { ArrowRenderer } from "./arrow";
export class RevoDropdown {
    constructor() {
        this.uuid = '';
        this.isClosing = false;
        this.currentItem = null;
        this.isVisible = false;
        /**
         * Should dropdown autoclose on changeValue
         */
        this.autoClose = true;
        /**
         * Define object mapping for id/value
         */
        this.source = [];
        /**
         * Define object mapping for id/value that should always be available
         * in the results even after filtering
         */
        this.appendSource = [];
        /**
         * Placeholder text
         */
        this.placeholder = 'Select';
        /**
         * Where to append element
         */
        this.appendTo = 'body';
        this.hasFilter = true;
        this.multiple = false;
        this.autocomplete = false;
        this.autoFocus = false;
    }
    // --------------------------------------------------------------------------
    //
    //  Methods
    //
    // --------------------------------------------------------------------------
    /**
     * Close dropdown
     */
    async doClose(isDisconnected = false) {
        if (!isDisconnected) {
            const event = this.close.emit();
            if (event.defaultPrevented) {
                return;
            }
        }
        this.isClosing = true;
        this.isVisible = false;
    }
    /**
     * Open dropdown
     */
    async doOpen() {
        const event = this.open.emit();
        if (event.defaultPrevented) {
            return;
        }
        this.isVisible = true;
    }
    /**
     * Change value
     */
    async doChange(val, originalEvent) {
        const realValue = getItemValue(val, this.dataId);
        if (this.multiple) {
            let newVals = [...(this.value || [])];
            if (Array.isArray(this.value)) {
                newVals.push(realValue);
            }
            else {
                newVals = [realValue];
            }
            this.value = newVals;
        }
        else {
            this.value = realValue;
        }
        this.changeValue.emit({ val: this.value, originalEvent });
        if (this.autocompleteInput) {
            this.autocompleteInput.value = this.multiple ? '' : getItemLabel(this.currentItem, this.dataLabel);
        }
        if (this.autoClose && this.isVisible) {
            this.doClose();
        }
    }
    // --------------------------------------------------------------------------
    //
    //  Internal
    //
    // --------------------------------------------------------------------------
    /** Action finished */
    onMouseUp(e) {
        var _a;
        if (this.isVisible && !e.defaultPrevented) {
            const isOutside = !((_a = e.target) === null || _a === void 0 ? void 0 : _a.closest(`[${UUID}="${this.uuid}"]`));
            if (isOutside) {
                this.doClose();
            }
        }
    }
    onKey(e) {
        switch (e.code) {
            case 'Escape':
                e.preventDefault();
                this.doClose();
                break;
        }
    }
    onValueChanged(newVal) {
        console.log('onValueChanged', newVal);
        if (Array.isArray(newVal)) {
            this.currentItem = newVal.map((val) => this.getValue(val));
        }
        else {
            this.currentItem = this.getValue(newVal);
        }
        console.log('onValueChanged', this.currentItem);
    }
    // componentWillLoad() {
    //   if (this.value) {
    //     console.log('componentWillLoad', this.value);
    //     this.currentItem = this.value;
    //   }
    // }
    connectedCallback() {
        this.uuid = `${this.uuidv4(new Date().getTime())}-rvdropdown`;
        if (typeof this.value !== 'undefined') {
            this.onValueChanged(this.value);
        }
    }
    disconnectedCallback() {
        this.doClose(true);
    }
    componentDidRender() {
        if (this.dropdown && this.appendTo === 'body') {
            document.body.appendChild(this.dropdown);
        }
        if (this.isVisible) {
            this.updateStyles();
        }
        if (this.dropdownInput) {
            this.dropdownInput.focus();
        }
        if (this.autoFocus) {
            if (this.autocomplete) {
                setTimeout(() => { var _a; return (_a = this.autocompleteInput) === null || _a === void 0 ? void 0 : _a.focus(); }, 0);
            }
        }
    }
    getSelectedItemLabel(item) {
        return item && getItemLabel(item, this.dataLabel) || '';
    }
    renderDropdown() {
        return (h("div", { class: "revo-dropdown-list", ref: e => (this.dropdown = e) }, h("div", { [UUID]: this.uuid, class: "dropdown-inner", ref: e => (this.dropdownInner = e) }, this.hasFilter && !this.autocomplete ? (h(DropdownListFilter, { ref: e => (this.dropdownInput = e), source: this.source, filter: this.filter, dataLabel: this.dataLabel, value: this.currentFilter || '', filterValue: this.currentFilter || '', onFilterChange: e => {
                var _a;
                this.currentFilter = e.value;
                this.currentSource = e.items.concat(this.appendSource);
                (_a = this.revoList) === null || _a === void 0 ? void 0 : _a.refresh(this.currentSource);
            } })) : undefined, h("revo-list", { ref: e => (this.revoList = e), isFocused: true, sourceItems: this.currentSource, dataLabel: this.dataLabel, onChanged: e => this.doChange(e.detail.item, e.detail.e) }))));
    }
    deselect(index) {
        if (Array.isArray(this.currentItem)) {
            const items = [...this.currentItem];
            delete items[index];
            this.currentItem = [...items].filter((item) => item);
        }
    }
    renderSelect() {
        const val = this.multiple ? '' : this.getSelectedItemLabel(this.currentItem);
        return h("input", { type: "text", disabled: true, class: "filter-box", value: val });
    }
    renderAutocomplete() {
        const val = this.multiple ? '' : this.getSelectedItemLabel(this.currentItem);
        return (h(DropdownListFilter, { ref: e => (this.autocompleteInput = e), autocomplete: 'true', source: this.source, filter: this.filter, dataLabel: this.dataLabel, value: val, filterValue: this.currentFilter, onKeyDown: e => {
                if (this.isVisible) {
                    return;
                }
                switch (e.code) {
                    case 'ArrowUp':
                    case 'ArrowDown':
                        e.preventDefault();
                        this.showAutoComplete();
                        break;
                }
            }, onInput: () => this.showAutoComplete(), onFocus: () => this.showAutoComplete(), onClick: () => this.showAutoComplete(), onFilterChange: e => {
                var _a;
                this.currentFilter = e.value;
                this.currentSource = e.items.concat(this.appendSource);
                (_a = this.revoList) === null || _a === void 0 ? void 0 : _a.refresh(this.currentSource);
            } }));
    }
    renderMultiselected() {
        let values = [];
        if (Array.isArray(this.currentItem)) {
            values = [...this.currentItem];
        }
        if (values.length) {
            return h("div", null, values.map((item, index) => h("button", { style: { 'margin-left': index > 0 ? '2px' : '' }, onClick: e => {
                    e.stopPropagation();
                    this.deselect(index);
                } }, h("span", { style: { 'margin-right': '5px' } }, this.getSelectedItemLabel(item)), h("span", { style: { cursor: 'pointer', 'font-weight': 'bold' } }, "\u2715"))));
        }
    }
    render() {
        var _a;
        let list;
        if (this.isVisible) {
            list = this.renderDropdown();
        }
        const props = {
            [UUID]: this.uuid,
            class: {
                active: this.isVisible,
                shrink: this.isVisible || !!this.currentItem || !!((_a = this.autocompleteInput) === null || _a === void 0 ? void 0 : _a.value),
            },
            ref: e => (this.element = e),
            onClick: e => this.selectClick(e)
        };
        if (this.autocomplete) {
            props['autocomplete'] = true;
        }
        return (h(Host, Object.assign({ key: '9ccb049ed09d7588897a83ad3dfb308d8e9eb691' }, props), h("label", { key: 'c97e4c8dcbbf87b03d3a8d69a22c4e01f9ee0e3e' }, this.placeholder), h("div", { key: '4d7f12bd93508dc5385f30645f25ebd06dd39e97', class: "rv-dr-root" }, this.multiple && this.renderMultiselected(), this.autocomplete ? this.renderAutocomplete() : this.renderSelect(), h("span", { key: 'a170b03f042f37b1eae4cc4ce17e787d65d65667', class: "actions" }, h(ArrowRenderer, { key: 'a1b09246d6e53b8a3b8bac52d56eb5f3a40d5fa3' })), h("fieldset", { key: '45ecfb0b2ec9b26fd7f7aef2af204186b3185981' }, h("legend", { key: 'a0f9e1ae462d123ca0f9191ae82fc11953206b37' }, h("span", { key: 'aa56112e44b30774b1351cf9b951af2c820abb47' }, this.placeholder)))), list));
    }
    showAutoComplete() {
        if (!this.isVisible && !this.isClosing) {
            this.isVisible = true;
        }
        this.isClosing = false;
    }
    getValue(newVal) {
        for (let index in this.source) {
            const item = this.source[index];
            if (newVal == getItemValue(item, this.dataId)) {
                return item;
            }
        }
        return null;
    }
    selectClick(e) {
        if (e.defaultPrevented) {
            return;
        }
        if (this.isVisible) {
            this.doClose();
        }
        else {
            this.doOpen();
        }
    }
    updateStyles() {
        if (!this.dropdown) {
            return;
        }
        const { top, left, height } = this.element.getBoundingClientRect();
        const visibleRect = this.clientRectangle();
        let currentTop = top + height + visibleRect.top;
        const style = {
            opacity: 1,
            display: 'block'
        };
        // top
        if (currentTop > visibleRect.centerY) {
            style.top = `${currentTop - height}px`;
            style.maxHeight = currentTop - height - visibleRect.top - 50;
            this.dropdown.classList.add('top');
            // bottom
        }
        else {
            style.top = `${currentTop}px`;
            style.maxHeight = visibleRect.bottom - currentTop - 50;
            this.dropdown.classList.remove('top');
        }
        // left
        let currentLeft = left + visibleRect.left;
        const rightSpace = visibleRect.right - (currentLeft + this.dropdown.clientWidth);
        if (rightSpace < 0) {
            currentLeft += rightSpace;
        }
        style.left = `${currentLeft}px`;
        this.dropdownInner.style.maxHeight = `${Math.min(style.maxHeight, this.maxHeight || style.maxHeight)}px`;
        this.dropdownInner.style.maxWidth = style.maxWidth;
        for (let s in style) {
            this.dropdown.style[s] = style[s];
        }
    }
    clientRectangle() {
        const rect = {
            top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
            bottom: 0,
            centerY: 0,
            height: document.body.clientHeight,
            left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
            right: 0,
            width: document.body.clientWidth,
            centerX: 0,
        };
        rect.bottom = rect.top + rect.height;
        rect.right = rect.left + rect.width;
        rect.centerY = rect.top + rect.height / 2;
        rect.centerX = rect.left + rect.width / 2;
        return rect;
    }
    uuidv4(stamp) {
        return `${stamp}-xx-y`.replace(/[xy]/g, (c) => {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    static get is() { return "revo-dropdown"; }
    static get originalStyleUrls() {
        return {
            "$": ["revo-dropdown.style.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["revo-dropdown.style.css"]
        };
    }
    static get properties() {
        return {
            "dataLabel": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Define object mapping for labels"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "data-label"
            },
            "value": {
                "type": "any",
                "mutable": true,
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Selected value"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "value"
            },
            "currentFilter": {
                "type": "any",
                "mutable": true,
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Filter value"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "current-filter"
            },
            "dataId": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Define object mapping for id/value"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "data-id"
            },
            "autoClose": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Should dropdown autoclose on changeValue"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "auto-close",
                "defaultValue": "true"
            },
            "source": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "any[]",
                    "resolved": "any[]",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Define object mapping for id/value"
                },
                "getter": false,
                "setter": false,
                "defaultValue": "[]"
            },
            "appendSource": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "any[]",
                    "resolved": "any[]",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Define object mapping for id/value that should always be available\nin the results even after filtering"
                },
                "getter": false,
                "setter": false,
                "defaultValue": "[]"
            },
            "placeholder": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Placeholder text"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "placeholder",
                "defaultValue": "'Select'"
            },
            "appendTo": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'body' | 'current'",
                    "resolved": "\"body\" | \"current\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Where to append element"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "append-to",
                "defaultValue": "'body'"
            },
            "filter": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'contains' | 'start'",
                    "resolved": "\"contains\" | \"start\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Filter criteria"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "filter"
            },
            "maxHeight": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "max-height"
            },
            "hasFilter": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "has-filter",
                "defaultValue": "true"
            },
            "multiple": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "multiple",
                "defaultValue": "false"
            },
            "autocomplete": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "autocomplete",
                "defaultValue": "false"
            },
            "autoFocus": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "auto-focus",
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "currentItem": {},
            "isVisible": {}
        };
    }
    static get events() {
        return [{
                "method": "changeValue",
                "name": "changed",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "When value changed"
                },
                "complexType": {
                    "original": "{ val: any; originalEvent?: MouseEvent }",
                    "resolved": "{ val: any; originalEvent?: MouseEvent; }",
                    "references": {
                        "MouseEvent": {
                            "location": "global",
                            "id": "global::MouseEvent"
                        }
                    }
                }
            }, {
                "method": "close",
                "name": "close",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Before element close, can be prevented"
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }, {
                "method": "open",
                "name": "open",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Before element open, can be prevented"
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }];
    }
    static get methods() {
        return {
            "doClose": {
                "complexType": {
                    "signature": "(isDisconnected?: boolean) => Promise<void>",
                    "parameters": [{
                            "name": "isDisconnected",
                            "type": "boolean",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Close dropdown",
                    "tags": []
                }
            },
            "doOpen": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Open dropdown",
                    "tags": []
                }
            },
            "doChange": {
                "complexType": {
                    "signature": "(val: any, originalEvent?: MouseEvent) => Promise<void>",
                    "parameters": [{
                            "name": "val",
                            "type": "any",
                            "docs": ""
                        }, {
                            "name": "originalEvent",
                            "type": "MouseEvent",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "MouseEvent": {
                            "location": "global",
                            "id": "global::MouseEvent"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Change value",
                    "tags": []
                }
            }
        };
    }
    static get watchers() {
        return [{
                "propName": "value",
                "methodName": "onValueChanged"
            }];
    }
    static get listeners() {
        return [{
                "name": "mousedown",
                "method": "onMouseUp",
                "target": "document",
                "capture": false,
                "passive": true
            }, {
                "name": "keydown",
                "method": "onKey",
                "target": "document",
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=revo-dropdown.js.map
