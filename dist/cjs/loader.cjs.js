'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-997e0af6.js');

/*
 Stencil Client Patch Esm v2.22.2 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["revo-dropdown_2.cjs",[[0,"revo-dropdown",{"dataLabel":[1,"data-label"],"value":[1032],"currentFilter":[1032,"current-filter"],"dataId":[1,"data-id"],"autoClose":[4,"auto-close"],"source":[16],"appendSource":[16],"placeholder":[1],"appendTo":[1,"append-to"],"filter":[1],"maxHeight":[2,"max-height"],"hasFilter":[4,"has-filter"],"multiple":[4],"autocomplete":[4],"autoFocus":[4,"auto-focus"],"currentItem":[32],"isVisible":[32],"doClose":[64],"doOpen":[64],"doChange":[64]},[[5,"mousedown","onMouseUp"],[4,"keydown","onKey"]]],[0,"revo-list",{"sourceItems":[16],"isFocused":[4,"is-focused"],"dataLabel":[1,"data-label"],"currentItem":[32],"refresh":[64]},[[4,"keydown","onKey"]]]]]], options);
  });
};

exports.setNonce = index.setNonce;
exports.defineCustomElements = defineCustomElements;
