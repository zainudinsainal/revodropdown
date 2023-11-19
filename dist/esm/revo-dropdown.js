import { p as promiseResolve, b as bootstrapLazy } from './index-422e5084.js';
export { s as setNonce } from './index-422e5084.js';

/*
 Stencil Client Patch Browser v2.22.2 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["revo-dropdown_2",[[0,"revo-dropdown",{"dataLabel":[1,"data-label"],"value":[1032],"currentFilter":[1032,"current-filter"],"dataId":[1,"data-id"],"autoClose":[4,"auto-close"],"source":[16],"appendSource":[16],"placeholder":[1],"appendTo":[1,"append-to"],"filter":[1],"maxHeight":[2,"max-height"],"hasFilter":[4,"has-filter"],"multiple":[4],"autocomplete":[4],"autoFocus":[4,"auto-focus"],"currentItem":[32],"isVisible":[32],"doClose":[64],"doOpen":[64],"doChange":[64]},[[5,"mousedown","onMouseUp"],[4,"keydown","onKey"]]],[0,"revo-list",{"sourceItems":[16],"isFocused":[4,"is-focused"],"dataLabel":[1,"data-label"],"currentItem":[32],"refresh":[64]},[[4,"keydown","onKey"]]]]]], options);
});
