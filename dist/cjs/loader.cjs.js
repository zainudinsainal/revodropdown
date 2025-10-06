'use strict';

var index = require('./index-DKY__Una.js');
var appGlobals = require('./app-globals-V2Kpy_OQ.js');

const defineCustomElements = async (win, options) => {
  if (typeof window === 'undefined') return undefined;
  await appGlobals.globalScripts();
  return index.bootstrapLazy([["revo-dropdown_2.cjs",[[256,"revo-dropdown",{"dataLabel":[1,"data-label"],"value":[1032],"currentFilter":[1032,"current-filter"],"dataId":[1,"data-id"],"autoClose":[4,"auto-close"],"source":[16],"appendSource":[16],"placeholder":[1],"appendTo":[1,"append-to"],"filter":[1],"maxHeight":[2,"max-height"],"hasFilter":[4,"has-filter"],"multiple":[4],"autocomplete":[4],"autoFocus":[4,"auto-focus"],"currentItem":[32],"isVisible":[32],"doClose":[64],"doOpen":[64],"doChange":[64]},[[5,"mousedown","onMouseUp"],[4,"keydown","onKey"]],{"value":["onValueChanged"]}],[256,"revo-list",{"sourceItems":[16],"isFocused":[4,"is-focused"],"dataLabel":[1,"data-label"],"currentItem":[32],"refresh":[64]},[[4,"keydown","onKey"]]]]]], options);
};

exports.setNonce = index.setNonce;
exports.defineCustomElements = defineCustomElements;
//# sourceMappingURL=loader.cjs.js.map
