import { h, Host } from '@stencil/core';
import '../../utils/closestPolifill';
import { UUID } from '../../utils/consts';
import { getItemLabel, getItemValue } from '../../utils/item.helpers';
import { DropdownListFilter } from '../list/revo-list.filter';
import { ArrowRenderer } from './arrow';
export class RevoDropdown {
  constructor() {
    this.uuid = '';
    this.isClosing = false;
    this.currentItem = null;
    this.isVisible = false;
    this.dataLabel = undefined;
    this.value = undefined;
    this.currentFilter = undefined;
    this.dataId = undefined;
    this.autoClose = true;
    this.source = [];
    this.appendSource = [];
    this.placeholder = 'Select';
    this.appendTo = 'body';
    this.filter = undefined;
    this.maxHeight = undefined;
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
    return (h("div", { class: "revo-dropdown-list", ref: e => (this.dropdown = e) }, h("div", Object.assign({}, { [UUID]: this.uuid }, { class: "dropdown-inner", ref: e => (this.dropdownInner = e) }), this.hasFilter && !this.autocomplete ? (h(DropdownListFilter, { ref: e => (this.dropdownInput = e), source: this.source, filter: this.filter, dataLabel: this.dataLabel, value: this.currentFilter || '', filterValue: this.currentFilter || '', onFilterChange: e => {
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
    return (h(Host, Object.assign({}, props), h("label", null, this.placeholder), h("div", { class: "rv-dr-root" }, this.multiple && this.renderMultiselected(), this.autocomplete ? this.renderAutocomplete() : this.renderSelect(), h("span", { class: "actions" }, h(ArrowRenderer, null)), h("fieldset", null, h("legend", null, h("span", null, this.placeholder)))), list));
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
        "attribute": "data-label",
        "reflect": false
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
        "attribute": "value",
        "reflect": false
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
        "attribute": "current-filter",
        "reflect": false
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
        "attribute": "data-id",
        "reflect": false
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
        "attribute": "auto-close",
        "reflect": false,
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
        "attribute": "placeholder",
        "reflect": false,
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
        "attribute": "append-to",
        "reflect": false,
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
        "attribute": "filter",
        "reflect": false
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
        "attribute": "max-height",
        "reflect": false
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
        "attribute": "has-filter",
        "reflect": false,
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
        "attribute": "multiple",
        "reflect": false,
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
        "attribute": "autocomplete",
        "reflect": false,
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
        "attribute": "auto-focus",
        "reflect": false,
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
              "location": "global"
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
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
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
              "location": "global"
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
              "tags": [],
              "text": ""
            }, {
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            },
            "MouseEvent": {
              "location": "global"
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
