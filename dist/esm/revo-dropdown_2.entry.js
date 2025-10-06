import { h, r as registerInstance, c as createEvent, H as Host } from './index-CRX5f2UQ.js';

(function closest() {
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }
    if (!Element.prototype.closest) {
        Element.prototype.closest = function (s) {
            let el = this;
            do {
                if (Element.prototype.matches.call(el, s)) {
                    return el;
                }
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);
            return null;
        };
    }
})();

const UUID = 'uuid';

function getItemLabel(item, dataLabel) {
    if (!item) {
        return '';
    }
    return dataLabel ? item[dataLabel] : item;
}
function getItemValue(item, dataId) {
    return dataId ? item[dataId] : item;
}

function doFilter(p, val) {
    var _a;
    let newSource = [];
    const filterValue = (_a = val === null || val === void 0 ? void 0 : val.trim()) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase();
    if (!filterValue) {
        newSource = p.source;
    }
    else {
        for (let item of p.source) {
            let val = getItemLabel(item, p.dataLabel);
            if (typeof val === 'string') {
                val = val.toLocaleLowerCase();
                switch (p.filter) {
                    case 'start':
                        if (val.indexOf(filterValue) === 0) {
                            newSource.push(item);
                        }
                        break;
                    default:
                        if (val.indexOf(filterValue) > -1) {
                            newSource.push(item);
                        }
                        break;
                }
            }
        }
    }
    return newSource;
}
const DropdownListFilter = (p) => {
    const filterChange = (value) => {
        const items = doFilter(p, value);
        p.onFilterChange({ value, items });
    };
    if (!p.filter) {
        p.filter = 'contains';
    }
    filterChange(p.filterValue);
    if (p.autocomplete) {
        p.value = p.filterValue;
    }
    return (h("input", Object.assign({ class: { 'filter-box': true, }, type: "text" }, p, { onClick: e => {
            e.preventDefault();
            p.onClick && p.onClick(e);
        }, onInput: e => {
            var _a;
            p.onInput && p.onInput();
            const value = (_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.value;
            filterChange(value);
        } })));
};

const ArrowRenderer = () => {
    return (h("span", { class: "arrow-wrapper" }, h("svg", { class: "arrow", "aria-hidden": "true", focusable: "false", role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 320 512" }, h("path", { fill: "currentColor", d: "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z" }))));
};

const revoDropdownStyleCss = "revo-dropdown{font-size:1em;font-family:\"Roboto\", \"Helvetica\", \"Arial\", sans-serif;font-weight:400;line-height:2em;letter-spacing:0.01em;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;vertical-align:top;padding:0;-webkit-box-sizing:border-box;box-sizing:border-box;cursor:pointer;position:relative}revo-dropdown .rv-dr-root{padding:5px 9px;padding-right:35px;-ms-flex-wrap:wrap;flex-wrap:wrap;position:relative;border-radius:4px;cursor:text;display:-ms-inline-flexbox;display:inline-flex;position:relative;font-size:1rem;-webkit-box-sizing:border-box;box-sizing:border-box;-ms-flex-align:center;align-items:center}revo-dropdown input.filter-box{padding-left:6px;padding:9.5px 4px;width:0;min-width:30px;-ms-flex-positive:1;flex-grow:1;text-overflow:ellipsis;border:0;height:1.1876em;margin:0;display:block;background:none;-webkit-box-sizing:content-box;box-sizing:content-box;letter-spacing:inherit;-webkit-animation-duration:10ms;animation-duration:10ms}revo-dropdown input.filter-box:focus{outline:none}revo-dropdown .actions{right:9px;top:calc(50% - 14px);position:absolute}revo-dropdown label{font-size:1rem;z-index:100;top:0;left:0;position:absolute;display:block;-webkit-transform-origin:top left;transform-origin:top left;line-height:1;-webkit-transition:color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, -webkit-transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;transition:color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, -webkit-transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;transition:color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;transition:color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, -webkit-transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;-webkit-transform:translate(14px, 14px) scale(1);transform:translate(14px, 14px) scale(1);pointer-events:none}revo-dropdown fieldset{border-color:#ececec;top:-5px;left:0;right:0;bottom:0;margin:0;padding:0 8px;overflow:hidden;position:absolute;z-index:0;border-style:solid;border-width:1px;border-radius:inherit;pointer-events:none}revo-dropdown fieldset legend{width:auto;height:11px;display:block;padding:0;font-size:0.75em;max-width:0.01px;text-align:left;-webkit-transition:max-width 50ms cubic-bezier(0, 0, 0.2, 1) 0ms;transition:max-width 50ms cubic-bezier(0, 0, 0.2, 1) 0ms;visibility:hidden}revo-dropdown fieldset legend>span{display:inline-block;padding-left:5px;padding-right:5px}revo-dropdown.shrink label{-webkit-transform:translate(14px, -6px) scale(0.75);transform:translate(14px, -6px) scale(0.75)}revo-dropdown.shrink legend{max-width:1000px;-webkit-transition:max-width 100ms cubic-bezier(0, 0, 0.2, 1) 50ms;transition:max-width 100ms cubic-bezier(0, 0, 0.2, 1) 50ms}revo-dropdown .arrow{width:9px;margin-top:5px;margin-left:5px;opacity:0.4}revo-dropdown .arrow-wrapper{width:15px;text-align:center}revo-dropdown.active label{color:#0089ff}revo-dropdown.active fieldset{border-color:#0089ff}.revo-dropdown-list{font-size:1em;font-family:\"Roboto\", \"Helvetica\", \"Arial\", sans-serif;font-weight:400;line-height:2em;letter-spacing:0.01em;position:absolute;-webkit-transition:opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, -webkit-transform 160ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;transition:opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, -webkit-transform 160ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;transition:opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 160ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;transition:opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 160ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, -webkit-transform 160ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;z-index:999;display:none;opacity:0}.revo-dropdown-list.top .dropdown-inner{bottom:2px;-ms-flex-direction:column-reverse;flex-direction:column-reverse}.revo-dropdown-list.top .dropdown-inner .filter-box{margin-bottom:0}.revo-dropdown-list:not(.top) .dropdown-inner{top:2px;-ms-flex-direction:column;flex-direction:column}.revo-dropdown-list:not(.top) .dropdown-inner .filter-box{margin-top:0}.revo-dropdown-list .dropdown-inner{display:-ms-flexbox;display:flex;max-height:100%;position:absolute;padding:8px 0;-webkit-box-sizing:border-box;box-sizing:border-box;min-height:16px;min-width:16px;-webkit-box-shadow:0 0 14px 0 rgba(53, 64, 82, 0.05);box-shadow:0 0 14px 0 rgba(53, 64, 82, 0.05);border:1px solid rgba(0, 0, 0, 0.05);border-radius:4px;color:rgba(0, 0, 0, 0.87);overflow:hidden;background-color:#fff}.revo-dropdown-list .dropdown-inner .filter-box{border:1px solid #ececec;min-height:30px;line-height:30px;margin:10px;border-radius:6px}.revo-dropdown-list .dropdown-inner .filter-box:focus{outline:none;border-color:#0089ff}";

const RevoDropdown = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.changeValue = createEvent(this, "changed", 7);
        this.close = createEvent(this, "close", 7);
        this.open = createEvent(this, "open", 7);
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
    static get watchers() { return {
        "value": ["onValueChanged"]
    }; }
};
RevoDropdown.style = revoDropdownStyleCss;

const revoListStyleCss = "revo-list{overflow-x:hidden;overflow-y:auto;max-height:100%;display:block}revo-list ul{margin:0;padding:0;outline:0;list-style:none}revo-list ul>li{width:auto;overflow:hidden;font-size:14px;-webkit-box-sizing:border-box;box-sizing:border-box;min-height:48px;font-weight:400;line-height:1.5;padding-top:6px;white-space:nowrap;padding-bottom:6px;padding-left:16px;padding-right:16px;display:-ms-flexbox;display:flex;position:relative;text-align:left;-ms-flex-align:center;align-items:center;-ms-flex-pack:start;justify-content:flex-start;text-decoration:none;cursor:pointer}revo-list ul>li.selected{background-color:rgba(0, 0, 0, 0.04)}revo-list ul>li:hover{background-color:rgba(0, 0, 0, 0.04)}";

const RevoDropdownList = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.changed = createEvent(this, "changed", 3);
        this.currentItem = 0;
        /**
         * Define object mapping for id/value
         */
        this.sourceItems = [];
        this.isFocused = false;
    }
    /** Recived keyboard down from element */
    onKey(e) {
        let item;
        if (!this.isFocused) {
            return;
        }
        switch (e.code) {
            case 'ArrowUp':
                e.preventDefault();
                if (this.currentItem <= 0) {
                    return;
                }
                this.currentItem--;
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (this.sourceItems[this.currentItem + 1]) {
                    this.currentItem++;
                }
                break;
            case 'Tab':
                e.preventDefault();
                item = this.sourceItems[this.currentItem];
                if (item) {
                    this.changed.emit({ item, e });
                }
                break;
            case 'Enter':
                e.preventDefault();
                item = this.sourceItems[this.currentItem];
                if (item) {
                    this.changed.emit({ item, e });
                }
                break;
        }
    }
    async refresh(source) {
        this.sourceItems = source;
    }
    componentDidRender() {
        var _a;
        (_a = this.selectedEl) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
            block: 'nearest',
            inline: 'nearest',
        });
    }
    render() {
        this.selectedEl = undefined;
        const items = [];
        for (let i in this.sourceItems) {
            const item = this.sourceItems[i];
            const isSelected = parseInt(i) === this.currentItem;
            const props = {
                class: { 'selected': isSelected },
                ref: e => {
                    if (isSelected) {
                        this.selectedEl = e;
                    }
                },
                onClick: e => this.changed.emit({ item, e })
            };
            const li = h("li", Object.assign({ key: '12ec212d9d51dedfe992b57475b8ce5330acda0c' }, props), getItemLabel(item, this.dataLabel));
            items.push(li);
        }
        return h("ul", { key: '834691d43763a29c33a20f7bd2857fb008de012b' }, items);
    }
};
RevoDropdownList.style = revoListStyleCss;

export { RevoDropdown as revo_dropdown, RevoDropdownList as revo_list };
//# sourceMappingURL=revo-dropdown.revo-list.entry.js.map
