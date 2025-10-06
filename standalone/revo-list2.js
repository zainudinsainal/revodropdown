import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';

function getItemLabel(item, dataLabel) {
    if (!item) {
        return '';
    }
    return dataLabel ? item[dataLabel] : item;
}
function getItemValue(item, dataId) {
    return dataId ? item[dataId] : item;
}

const revoListStyleCss = "revo-list{overflow-x:hidden;overflow-y:auto;max-height:100%;display:block}revo-list ul{margin:0;padding:0;outline:0;list-style:none}revo-list ul>li{width:auto;overflow:hidden;font-size:14px;-webkit-box-sizing:border-box;box-sizing:border-box;min-height:48px;font-weight:400;line-height:1.5;padding-top:6px;white-space:nowrap;padding-bottom:6px;padding-left:16px;padding-right:16px;display:-ms-flexbox;display:flex;position:relative;text-align:left;-ms-flex-align:center;align-items:center;-ms-flex-pack:start;justify-content:flex-start;text-decoration:none;cursor:pointer}revo-list ul>li.selected{background-color:rgba(0, 0, 0, 0.04)}revo-list ul>li:hover{background-color:rgba(0, 0, 0, 0.04)}";

const RevoDropdownList = /*@__PURE__*/ proxyCustomElement(class RevoDropdownList extends HTMLElement {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
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
    static get style() { return revoListStyleCss; }
}, [256, "revo-list", {
        "sourceItems": [16],
        "isFocused": [4, "is-focused"],
        "dataLabel": [1, "data-label"],
        "currentItem": [32],
        "refresh": [64]
    }, [[4, "keydown", "onKey"]]]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["revo-list"];
    components.forEach(tagName => { switch (tagName) {
        case "revo-list":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RevoDropdownList);
            }
            break;
    } });
}

export { RevoDropdownList as R, getItemValue as a, defineCustomElement as d, getItemLabel as g };
//# sourceMappingURL=revo-list2.js.map

//# sourceMappingURL=revo-list2.js.map