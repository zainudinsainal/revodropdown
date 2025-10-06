import { h } from "@stencil/core";
import { getItemLabel } from "../../utils/item.helpers";
export class RevoDropdownList {
    constructor() {
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
    static get is() { return "revo-list"; }
    static get originalStyleUrls() {
        return {
            "$": ["revo-list.style.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["revo-list.style.css"]
        };
    }
    static get properties() {
        return {
            "sourceItems": {
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
            "isFocused": {
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
                "attribute": "is-focused",
                "defaultValue": "false"
            },
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
            }
        };
    }
    static get states() {
        return {
            "currentItem": {}
        };
    }
    static get events() {
        return [{
                "method": "changed",
                "name": "changed",
                "bubbles": false,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "{ item: any; e: any }",
                    "resolved": "{ item: any; e: any; }",
                    "references": {}
                }
            }];
    }
    static get methods() {
        return {
            "refresh": {
                "complexType": {
                    "signature": "(source: any[]) => Promise<void>",
                    "parameters": [{
                            "name": "source",
                            "type": "any[]",
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
                    "text": "",
                    "tags": []
                }
            }
        };
    }
    static get listeners() {
        return [{
                "name": "keydown",
                "method": "onKey",
                "target": "document",
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=revo-list.js.map
