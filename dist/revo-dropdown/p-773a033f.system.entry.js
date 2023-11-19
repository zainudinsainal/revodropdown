var __awaiter=this&&this.__awaiter||function(e,t,i,r){function o(e){return e instanceof i?e:new i((function(t){t(e)}))}return new(i||(i=Promise))((function(i,n){function s(e){try{l(r.next(e))}catch(e){n(e)}}function a(e){try{l(r["throw"](e))}catch(e){n(e)}}function l(e){e.done?i(e.value):o(e.value).then(s,a)}l((r=r.apply(e,t||[])).next())}))};var __generator=this&&this.__generator||function(e,t){var i={label:0,sent:function(){if(n[0]&1)throw n[1];return n[1]},trys:[],ops:[]},r,o,n,s;return s={next:a(0),throw:a(1),return:a(2)},typeof Symbol==="function"&&(s[Symbol.iterator]=function(){return this}),s;function a(e){return function(t){return l([e,t])}}function l(a){if(r)throw new TypeError("Generator is already executing.");while(s&&(s=0,a[0]&&(i=0)),i)try{if(r=1,o&&(n=a[0]&2?o["return"]:a[0]?o["throw"]||((n=o["return"])&&n.call(o),0):o.next)&&!(n=n.call(o,a[1])).done)return n;if(o=0,n)a=[a[0]&2,n.value];switch(a[0]){case 0:case 1:n=a;break;case 4:i.label++;return{value:a[1],done:false};case 5:i.label++;o=a[1];a=[0];continue;case 7:a=i.ops.pop();i.trys.pop();continue;default:if(!(n=i.trys,n=n.length>0&&n[n.length-1])&&(a[0]===6||a[0]===2)){i=0;continue}if(a[0]===3&&(!n||a[1]>n[0]&&a[1]<n[3])){i.label=a[1];break}if(a[0]===6&&i.label<n[1]){i.label=n[1];n=a;break}if(n&&i.label<n[2]){i.label=n[2];i.ops.push(a);break}if(n[2])i.ops.pop();i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e];o=0}finally{r=n=0}if(a[0]&5)throw a[1];return{value:a[0]?a[1]:void 0,done:true}}};var __spreadArray=this&&this.__spreadArray||function(e,t,i){if(i||arguments.length===2)for(var r=0,o=t.length,n;r<o;r++){if(n||!(r in t)){if(!n)n=Array.prototype.slice.call(t,0,r);n[r]=t[r]}}return e.concat(n||Array.prototype.slice.call(t))};System.register(["./p-9c8f9e06.system.js"],(function(e){"use strict";var t,i,r,o;return{setters:[function(e){t=e.h;i=e.r;r=e.c;o=e.H}],execute:function(){(function e(){if(!Element.prototype.matches){Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector}if(!Element.prototype.closest){Element.prototype.closest=function(e){var t=this;do{if(Element.prototype.matches.call(t,e)){return t}t=t.parentElement||t.parentNode}while(t!==null&&t.nodeType===1);return null}}})();var n="uuid";function s(e,t){if(!e){return""}return t?e[t]:e}function a(e,t){return t?e[t]:e}function l(e,t){var i;var r=[];var o=(i=t===null||t===void 0?void 0:t.trim())===null||i===void 0?void 0:i.toLocaleLowerCase();if(!o){r=e.source}else{for(var n=0,a=e.source;n<a.length;n++){var l=a[n];var u=s(l,e.dataLabel);if(typeof u==="string"){u=u.toLocaleLowerCase();switch(e.filter){case"start":if(u.indexOf(o)===0){r.push(l)}break;default:if(u.indexOf(o)>-1){r.push(l)}break}}}}return r}var u=function(e){var i=function(t){var i=l(e,t);e.onFilterChange({value:t,items:i})};if(!e.filter){e.filter="contains"}i(e.filterValue);if(e.autocomplete){e.value=e.filterValue}return t("input",Object.assign({class:{"filter-box":true},type:"text"},e,{onClick:function(t){t.preventDefault();e.onClick&&e.onClick(t)},onInput:function(t){var r;e.onInput&&e.onInput();var o=(r=t.currentTarget)===null||r===void 0?void 0:r.value;i(o)}}))};var c=function(){return t("span",{class:"arrow-wrapper"},t("svg",{class:"arrow","aria-hidden":"true",focusable:"false",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 320 512"},t("path",{fill:"currentColor",d:"M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"})))};var d='revo-dropdown{font-size:1em;font-family:"Roboto", "Helvetica", "Arial", sans-serif;font-weight:400;line-height:2em;letter-spacing:0.01em;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;vertical-align:top;padding:0;-webkit-box-sizing:border-box;box-sizing:border-box;cursor:pointer;position:relative}revo-dropdown .rv-dr-root{padding:5px 9px;padding-right:35px;-ms-flex-wrap:wrap;flex-wrap:wrap;position:relative;border-radius:4px;cursor:text;display:-ms-inline-flexbox;display:inline-flex;position:relative;font-size:1rem;-webkit-box-sizing:border-box;box-sizing:border-box;-ms-flex-align:center;align-items:center}revo-dropdown input.filter-box{padding-left:6px;padding:9.5px 4px;width:0;min-width:30px;-ms-flex-positive:1;flex-grow:1;text-overflow:ellipsis;border:0;height:1.1876em;margin:0;display:block;background:none;-webkit-box-sizing:content-box;box-sizing:content-box;letter-spacing:inherit;-webkit-animation-duration:10ms;animation-duration:10ms}revo-dropdown input.filter-box:focus{outline:none}revo-dropdown .actions{right:9px;top:calc(50% - $font-size);position:absolute}revo-dropdown label{font-size:1rem;z-index:100;top:0;left:0;position:absolute;display:block;-webkit-transform-origin:top left;transform-origin:top left;line-height:1;-webkit-transition:color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, -webkit-transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;transition:color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, -webkit-transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;transition:color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;transition:color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, -webkit-transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;-webkit-transform:translate(14px, 14px) scale(1);transform:translate(14px, 14px) scale(1);pointer-events:none}revo-dropdown fieldset{border-color:#ececec;top:-5px;left:0;right:0;bottom:0;margin:0;padding:0 8px;overflow:hidden;position:absolute;z-index:0;border-style:solid;border-width:1px;border-radius:inherit;pointer-events:none}revo-dropdown fieldset legend{width:auto;height:11px;display:block;padding:0;font-size:0.75em;max-width:0.01px;text-align:left;-webkit-transition:max-width 50ms cubic-bezier(0, 0, 0.2, 1) 0ms;transition:max-width 50ms cubic-bezier(0, 0, 0.2, 1) 0ms;visibility:hidden}revo-dropdown fieldset legend>span{display:inline-block;padding-left:5px;padding-right:5px}revo-dropdown.shrink label{-webkit-transform:translate(14px, -6px) scale(0.75);transform:translate(14px, -6px) scale(0.75)}revo-dropdown.shrink legend{max-width:1000px;-webkit-transition:max-width 100ms cubic-bezier(0, 0, 0.2, 1) 50ms;transition:max-width 100ms cubic-bezier(0, 0, 0.2, 1) 50ms}revo-dropdown .arrow{width:9px;margin-top:5px;margin-left:5px;opacity:0.4}revo-dropdown .arrow-wrapper{width:15px;text-align:center}revo-dropdown.active label{color:#0089ff}revo-dropdown.active fieldset{border-color:#0089ff}.revo-dropdown-list{font-size:1em;font-family:"Roboto", "Helvetica", "Arial", sans-serif;font-weight:400;line-height:2em;letter-spacing:0.01em;position:absolute;-webkit-transition:opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, -webkit-transform 160ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;transition:opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, -webkit-transform 160ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;transition:opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 160ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;transition:opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 160ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, -webkit-transform 160ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;z-index:999;display:none;opacity:0}.revo-dropdown-list.top .dropdown-inner{bottom:2px;-ms-flex-direction:column-reverse;flex-direction:column-reverse}.revo-dropdown-list.top .dropdown-inner .filter-box{margin-bottom:0}.revo-dropdown-list:not(.top) .dropdown-inner{top:2px;-ms-flex-direction:column;flex-direction:column}.revo-dropdown-list:not(.top) .dropdown-inner .filter-box{margin-top:0}.revo-dropdown-list .dropdown-inner{display:-ms-flexbox;display:flex;max-height:100%;position:absolute;padding:8px 0;-webkit-box-sizing:border-box;box-sizing:border-box;min-height:16px;min-width:16px;-webkit-box-shadow:0 0 14px 0 rgba(53, 64, 82, 0.05);box-shadow:0 0 14px 0 rgba(53, 64, 82, 0.05);border:1px solid rgba(0, 0, 0, 0.05);border-radius:4px;color:rgba(0, 0, 0, 0.87);overflow:hidden;background-color:#fff}.revo-dropdown-list .dropdown-inner .filter-box{border:1px solid #ececec;min-height:30px;line-height:30px;margin:10px;border-radius:6px}.revo-dropdown-list .dropdown-inner .filter-box:focus{outline:none;border-color:#0089ff}';var p=e("revo_dropdown",function(){function e(e){i(this,e);this.changeValue=r(this,"changed",7);this.close=r(this,"close",7);this.open=r(this,"open",7);this.uuid="";this.isClosing=false;this.currentItem=null;this.isVisible=false;this.dataLabel=undefined;this.value=undefined;this.currentFilter=undefined;this.dataId=undefined;this.autoClose=true;this.source=[];this.appendSource=[];this.placeholder="Select";this.appendTo="body";this.filter=undefined;this.maxHeight=undefined;this.hasFilter=true;this.multiple=false;this.autocomplete=false;this.autoFocus=false}e.prototype.doClose=function(e){if(e===void 0){e=false}return __awaiter(this,void 0,void 0,(function(){var t;return __generator(this,(function(i){if(!e){t=this.close.emit();if(t.defaultPrevented){return[2]}}this.isClosing=true;this.isVisible=false;return[2]}))}))};e.prototype.doOpen=function(){return __awaiter(this,void 0,void 0,(function(){var e;return __generator(this,(function(t){e=this.open.emit();if(e.defaultPrevented){return[2]}this.isVisible=true;return[2]}))}))};e.prototype.doChange=function(e,t){return __awaiter(this,void 0,void 0,(function(){var i,r;return __generator(this,(function(o){i=a(e,this.dataId);if(this.multiple){r=__spreadArray([],this.value||[],true);if(Array.isArray(this.value)){r.push(i)}else{r=[i]}this.value=r}else{this.value=i}this.changeValue.emit({val:this.value,originalEvent:t});if(this.autocompleteInput){this.autocompleteInput.value=this.multiple?"":s(this.currentItem,this.dataLabel)}if(this.autoClose&&this.isVisible){this.doClose()}return[2]}))}))};e.prototype.onMouseUp=function(e){var t;if(this.isVisible&&!e.defaultPrevented){var i=!((t=e.target)===null||t===void 0?void 0:t.closest("[".concat(n,'="').concat(this.uuid,'"]')));if(i){this.doClose()}}};e.prototype.onKey=function(e){switch(e.code){case"Escape":e.preventDefault();this.doClose();break}};e.prototype.onValueChanged=function(e){var t=this;console.log("onValueChanged",e);if(Array.isArray(e)){this.currentItem=e.map((function(e){return t.getValue(e)}))}else{this.currentItem=this.getValue(e)}console.log("onValueChanged",this.currentItem)};e.prototype.connectedCallback=function(){this.uuid="".concat(this.uuidv4((new Date).getTime()),"-rvdropdown");if(typeof this.value!=="undefined"){this.onValueChanged(this.value)}};e.prototype.disconnectedCallback=function(){this.doClose(true)};e.prototype.componentDidRender=function(){var e=this;if(this.dropdown&&this.appendTo==="body"){document.body.appendChild(this.dropdown)}if(this.isVisible){this.updateStyles()}if(this.dropdownInput){this.dropdownInput.focus()}if(this.autoFocus){if(this.autocomplete){setTimeout((function(){var t;return(t=e.autocompleteInput)===null||t===void 0?void 0:t.focus()}),0)}}};e.prototype.getSelectedItemLabel=function(e){return e&&s(e,this.dataLabel)||""};e.prototype.renderDropdown=function(){var e;var i=this;return t("div",{class:"revo-dropdown-list",ref:function(e){return i.dropdown=e}},t("div",Object.assign({},(e={},e[n]=this.uuid,e),{class:"dropdown-inner",ref:function(e){return i.dropdownInner=e}}),this.hasFilter&&!this.autocomplete?t(u,{ref:function(e){return i.dropdownInput=e},source:this.source,filter:this.filter,dataLabel:this.dataLabel,value:this.currentFilter||"",filterValue:this.currentFilter||"",onFilterChange:function(e){var t;i.currentFilter=e.value;i.currentSource=e.items.concat(i.appendSource);(t=i.revoList)===null||t===void 0?void 0:t.refresh(i.currentSource)}}):undefined,t("revo-list",{ref:function(e){return i.revoList=e},isFocused:true,sourceItems:this.currentSource,dataLabel:this.dataLabel,onChanged:function(e){return i.doChange(e.detail.item,e.detail.e)}})))};e.prototype.deselect=function(e){if(Array.isArray(this.currentItem)){var t=__spreadArray([],this.currentItem,true);delete t[e];this.currentItem=__spreadArray([],t,true).filter((function(e){return e}))}};e.prototype.renderSelect=function(){var e=this.multiple?"":this.getSelectedItemLabel(this.currentItem);return t("input",{type:"text",disabled:true,class:"filter-box",value:e})};e.prototype.renderAutocomplete=function(){var e=this;var i=this.multiple?"":this.getSelectedItemLabel(this.currentItem);return t(u,{ref:function(t){return e.autocompleteInput=t},autocomplete:"true",source:this.source,filter:this.filter,dataLabel:this.dataLabel,value:i,filterValue:this.currentFilter,onKeyDown:function(t){if(e.isVisible){return}switch(t.code){case"ArrowUp":case"ArrowDown":t.preventDefault();e.showAutoComplete();break}},onInput:function(){return e.showAutoComplete()},onFocus:function(){return e.showAutoComplete()},onClick:function(){return e.showAutoComplete()},onFilterChange:function(t){var i;e.currentFilter=t.value;e.currentSource=t.items.concat(e.appendSource);(i=e.revoList)===null||i===void 0?void 0:i.refresh(e.currentSource)}})};e.prototype.renderMultiselected=function(){var e=this;var i=[];if(Array.isArray(this.currentItem)){i=__spreadArray([],this.currentItem,true)}if(i.length){return t("div",null,i.map((function(i,r){return t("button",{style:{"margin-left":r>0?"2px":""},onClick:function(t){t.stopPropagation();e.deselect(r)}},t("span",{style:{"margin-right":"5px"}},e.getSelectedItemLabel(i)),t("span",{style:{cursor:"pointer","font-weight":"bold"}},"✕"))})))}};e.prototype.render=function(){var e;var i=this;var r;var s;if(this.isVisible){s=this.renderDropdown()}var a=(e={},e[n]=this.uuid,e.class={active:this.isVisible,shrink:this.isVisible||!!this.currentItem||!!((r=this.autocompleteInput)===null||r===void 0?void 0:r.value)},e.ref=function(e){return i.element=e},e.onClick=function(e){return i.selectClick(e)},e);if(this.autocomplete){a["autocomplete"]=true}return t(o,Object.assign({},a),t("label",null,this.placeholder),t("div",{class:"rv-dr-root"},this.multiple&&this.renderMultiselected(),this.autocomplete?this.renderAutocomplete():this.renderSelect(),t("span",{class:"actions"},t(c,null)),t("fieldset",null,t("legend",null,t("span",null,this.placeholder)))),s)};e.prototype.showAutoComplete=function(){if(!this.isVisible&&!this.isClosing){this.isVisible=true}this.isClosing=false};e.prototype.getValue=function(e){for(var t in this.source){var i=this.source[t];if(e==a(i,this.dataId)){return i}}return null};e.prototype.selectClick=function(e){if(e.defaultPrevented){return}if(this.isVisible){this.doClose()}else{this.doOpen()}};e.prototype.updateStyles=function(){if(!this.dropdown){return}var e=this.element.getBoundingClientRect(),t=e.top,i=e.left,r=e.height;var o=this.clientRectangle();var n=t+r+o.top;var s={opacity:1,display:"block"};if(n>o.centerY){s.top="".concat(n-r,"px");s.maxHeight=n-r-o.top-50;this.dropdown.classList.add("top")}else{s.top="".concat(n,"px");s.maxHeight=o.bottom-n-50;this.dropdown.classList.remove("top")}var a=i+o.left;var l=o.right-(a+this.dropdown.clientWidth);if(l<0){a+=l}s.left="".concat(a,"px");this.dropdownInner.style.maxHeight="".concat(Math.min(s.maxHeight,this.maxHeight||s.maxHeight),"px");this.dropdownInner.style.maxWidth=s.maxWidth;for(var u in s){this.dropdown.style[u]=s[u]}};e.prototype.clientRectangle=function(){var e={top:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,bottom:0,centerY:0,height:document.body.clientHeight,left:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft,right:0,width:document.body.clientWidth,centerX:0};e.bottom=e.top+e.height;e.right=e.left+e.width;e.centerY=e.top+e.height/2;e.centerX=e.left+e.width/2;return e};e.prototype.uuidv4=function(e){return"".concat(e,"-xx-y").replace(/[xy]/g,(function(e){var t=Math.random()*16|0,i=e=="x"?t:t&3|8;return i.toString(16)}))};Object.defineProperty(e,"watchers",{get:function(){return{value:["onValueChanged"]}},enumerable:false,configurable:true});return e}());p.style=d;var h="revo-list{overflow-x:hidden;overflow-y:auto;max-height:100%;display:block}revo-list ul{margin:0;padding:0;outline:0;list-style:none}revo-list ul>li{width:auto;overflow:hidden;font-size:14px;-webkit-box-sizing:border-box;box-sizing:border-box;min-height:48px;font-weight:400;line-height:1.5;padding-top:6px;white-space:nowrap;padding-bottom:6px;padding-left:16px;padding-right:16px;display:-ms-flexbox;display:flex;position:relative;text-align:left;-ms-flex-align:center;align-items:center;-ms-flex-pack:start;justify-content:flex-start;text-decoration:none;cursor:pointer}revo-list ul>li.selected{background-color:rgba(0, 0, 0, 0.04)}revo-list ul>li:hover{background-color:rgba(0, 0, 0, 0.04)}";var f=e("revo_list",function(){function e(e){i(this,e);this.changed=r(this,"changed",3);this.currentItem=0;this.sourceItems=[];this.isFocused=false;this.dataLabel=undefined}e.prototype.onKey=function(e){var t;if(!this.isFocused){return}switch(e.code){case"ArrowUp":e.preventDefault();if(this.currentItem<=0){return}this.currentItem--;break;case"ArrowDown":e.preventDefault();if(this.sourceItems[this.currentItem+1]){this.currentItem++}break;case"Tab":e.preventDefault();t=this.sourceItems[this.currentItem];if(t){this.changed.emit({item:t,e:e})}break;case"Enter":e.preventDefault();t=this.sourceItems[this.currentItem];if(t){this.changed.emit({item:t,e:e})}break}};e.prototype.refresh=function(e){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){this.sourceItems=e;return[2]}))}))};e.prototype.componentDidRender=function(){var e;(e=this.selectedEl)===null||e===void 0?void 0:e.scrollIntoView({block:"nearest",inline:"nearest"})};e.prototype.render=function(){var e=this;this.selectedEl=undefined;var i=[];var r=function(r){var n=o.sourceItems[r];var a=parseInt(r)===o.currentItem;var l={class:{selected:a},ref:function(t){if(a){e.selectedEl=t}},onClick:function(t){return e.changed.emit({item:n,e:t})}};var u=t("li",Object.assign({},l),s(n,o.dataLabel));i.push(u)};var o=this;for(var n in this.sourceItems){r(n)}return t("ul",null,i)};return e}());f.style=h}}}));