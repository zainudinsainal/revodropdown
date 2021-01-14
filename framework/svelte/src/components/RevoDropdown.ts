/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
import { Components, JSX } from '@revolist/revo-dropdown';


interface RevoDropdownProps {
  
  /** Define object mapping for labels */
  dataLabel?: Components.RevoDropdown["dataLabel"]
  
  /** Selected value */
  value?: Components.RevoDropdown["value"]
  
  /** Filter value */
  currentFilter?: Components.RevoDropdown["currentFilter"]
  
  /** Define object mapping for id/value */
  dataId?: Components.RevoDropdown["dataId"]
  
  /** Should dropdown autoclose on changeValue */
  autoClose?: Components.RevoDropdown["autoClose"]
  
  /** Define object mapping for id/value */
  source?: Components.RevoDropdown["source"]
  
  /** Placeholder text */
  placeholder?: Components.RevoDropdown["placeholder"]
  
  /** Where to append element */
  appendTo?: Components.RevoDropdown["appendTo"]
  
  /** Filter criteria */
  filter?: Components.RevoDropdown["filter"]
  
  /**  */
  maxHeight?: Components.RevoDropdown["maxHeight"]
  
  /**  */
  hasFilter?: Components.RevoDropdown["hasFilter"]
  
  /**  */
  autocomplete?: Components.RevoDropdown["autocomplete"]
  
  /**  */
  autoFocus?: Components.RevoDropdown["autoFocus"]
}

interface RevoDropdownEvents {
  
  /** When value changed */
  changeValue: Parameters<JSX.RevoDropdown["onChangeValue"]>[0]
  
  /** Before element close, can be prevented */
  close: Parameters<JSX.RevoDropdown["onClose"]>[0]
  
  /** Before element open, can be prevented */
  open: Parameters<JSX.RevoDropdown["onOpen"]>[0]
}

interface RevoDropdownSlots {
  default: any
}
  
/* generated by Svelte v3.31.2 */
import {
	SvelteComponent,
	binding_callbacks,
	create_slot,
	detach,
	element,
	init,
	insert,
	listen,
	run_all,
	safe_not_equal,
	set_custom_element_data,
	transition_in,
	transition_out,
	update_slot
} from "svelte/internal";

import { createEventDispatcher, onMount } from "svelte";

function create_fragment(ctx) {
	let revo_dropdown;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[21].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[20], null);

	return {
		c() {
			revo_dropdown = element("revo-dropdown");
			if (default_slot) default_slot.c();
			set_custom_element_data(revo_dropdown, "data-label", /*dataLabel*/ ctx[0]);
			set_custom_element_data(revo_dropdown, "value", /*value*/ ctx[1]);
			set_custom_element_data(revo_dropdown, "current-filter", /*currentFilter*/ ctx[2]);
			set_custom_element_data(revo_dropdown, "data-id", /*dataId*/ ctx[3]);
			set_custom_element_data(revo_dropdown, "auto-close", /*autoClose*/ ctx[4]);
			set_custom_element_data(revo_dropdown, "placeholder", /*placeholder*/ ctx[5]);
			set_custom_element_data(revo_dropdown, "append-to", /*appendTo*/ ctx[6]);
			set_custom_element_data(revo_dropdown, "filter", /*filter*/ ctx[7]);
			set_custom_element_data(revo_dropdown, "max-height", /*maxHeight*/ ctx[8]);
			set_custom_element_data(revo_dropdown, "has-filter", /*hasFilter*/ ctx[9]);
			set_custom_element_data(revo_dropdown, "autocomplete", /*autocomplete*/ ctx[10]);
			set_custom_element_data(revo_dropdown, "auto-focus", /*autoFocus*/ ctx[11]);
		},
		m(target, anchor) {
			insert(target, revo_dropdown, anchor);

			if (default_slot) {
				default_slot.m(revo_dropdown, null);
			}

			/*revo_dropdown_binding*/ ctx[22](revo_dropdown);
			current = true;

			if (!mounted) {
				dispose = [
					listen(revo_dropdown, "changeValue", /*onEvent*/ ctx[13]),
					listen(revo_dropdown, "close", /*onEvent*/ ctx[13]),
					listen(revo_dropdown, "open", /*onEvent*/ ctx[13])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && dirty & /*$$scope*/ 1048576) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[20], dirty, null, null);
				}
			}

			if (!current || dirty & /*dataLabel*/ 1) {
				set_custom_element_data(revo_dropdown, "data-label", /*dataLabel*/ ctx[0]);
			}

			if (!current || dirty & /*value*/ 2) {
				set_custom_element_data(revo_dropdown, "value", /*value*/ ctx[1]);
			}

			if (!current || dirty & /*currentFilter*/ 4) {
				set_custom_element_data(revo_dropdown, "current-filter", /*currentFilter*/ ctx[2]);
			}

			if (!current || dirty & /*dataId*/ 8) {
				set_custom_element_data(revo_dropdown, "data-id", /*dataId*/ ctx[3]);
			}

			if (!current || dirty & /*autoClose*/ 16) {
				set_custom_element_data(revo_dropdown, "auto-close", /*autoClose*/ ctx[4]);
			}

			if (!current || dirty & /*placeholder*/ 32) {
				set_custom_element_data(revo_dropdown, "placeholder", /*placeholder*/ ctx[5]);
			}

			if (!current || dirty & /*appendTo*/ 64) {
				set_custom_element_data(revo_dropdown, "append-to", /*appendTo*/ ctx[6]);
			}

			if (!current || dirty & /*filter*/ 128) {
				set_custom_element_data(revo_dropdown, "filter", /*filter*/ ctx[7]);
			}

			if (!current || dirty & /*maxHeight*/ 256) {
				set_custom_element_data(revo_dropdown, "max-height", /*maxHeight*/ ctx[8]);
			}

			if (!current || dirty & /*hasFilter*/ 512) {
				set_custom_element_data(revo_dropdown, "has-filter", /*hasFilter*/ ctx[9]);
			}

			if (!current || dirty & /*autocomplete*/ 1024) {
				set_custom_element_data(revo_dropdown, "autocomplete", /*autocomplete*/ ctx[10]);
			}

			if (!current || dirty & /*autoFocus*/ 2048) {
				set_custom_element_data(revo_dropdown, "auto-focus", /*autoFocus*/ ctx[11]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(revo_dropdown);
			if (default_slot) default_slot.d(detaching);
			/*revo_dropdown_binding*/ ctx[22](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	let __ref;
	let __mounted = false;
	const dispatch = createEventDispatcher();
	let { dataLabel = undefined } = $$props;
	let { value = undefined } = $$props;
	let { currentFilter = undefined } = $$props;
	let { dataId = undefined } = $$props;
	let { autoClose = undefined } = $$props;
	let { source = undefined } = $$props;
	let { placeholder = undefined } = $$props;
	let { appendTo = undefined } = $$props;
	let { filter = undefined } = $$props;
	let { maxHeight = undefined } = $$props;
	let { hasFilter = undefined } = $$props;
	let { autocomplete = undefined } = $$props;
	let { autoFocus = undefined } = $$props;
	const doClose = (...args) => __ref.doClose(...args);
	const doOpen = (...args) => __ref.doOpen(...args);
	const doChange = (...args) => __ref.doChange(...args);
	const getWebComponent = () => __ref;

	onMount(() => {
		$$invalidate(19, __mounted = true);
	});

	const setProp = (prop, value) => {
		if (__ref) $$invalidate(12, __ref[prop] = value, __ref);
	};

	const onEvent = e => {
		e.stopPropagation();
		dispatch(e.type, e.detail);
	};

	function revo_dropdown_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			__ref = $$value;
			$$invalidate(12, __ref);
		});
	}

	$$self.$$set = $$props => {
		if ("dataLabel" in $$props) $$invalidate(0, dataLabel = $$props.dataLabel);
		if ("value" in $$props) $$invalidate(1, value = $$props.value);
		if ("currentFilter" in $$props) $$invalidate(2, currentFilter = $$props.currentFilter);
		if ("dataId" in $$props) $$invalidate(3, dataId = $$props.dataId);
		if ("autoClose" in $$props) $$invalidate(4, autoClose = $$props.autoClose);
		if ("source" in $$props) $$invalidate(14, source = $$props.source);
		if ("placeholder" in $$props) $$invalidate(5, placeholder = $$props.placeholder);
		if ("appendTo" in $$props) $$invalidate(6, appendTo = $$props.appendTo);
		if ("filter" in $$props) $$invalidate(7, filter = $$props.filter);
		if ("maxHeight" in $$props) $$invalidate(8, maxHeight = $$props.maxHeight);
		if ("hasFilter" in $$props) $$invalidate(9, hasFilter = $$props.hasFilter);
		if ("autocomplete" in $$props) $$invalidate(10, autocomplete = $$props.autocomplete);
		if ("autoFocus" in $$props) $$invalidate(11, autoFocus = $$props.autoFocus);
		if ("$$scope" in $$props) $$invalidate(20, $$scope = $$props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*__mounted, source*/ 540672) {
			$: if (__mounted) setProp("source", source);
		}
	};

	return [
		dataLabel,
		value,
		currentFilter,
		dataId,
		autoClose,
		placeholder,
		appendTo,
		filter,
		maxHeight,
		hasFilter,
		autocomplete,
		autoFocus,
		__ref,
		onEvent,
		source,
		doClose,
		doOpen,
		doChange,
		getWebComponent,
		__mounted,
		$$scope,
		slots,
		revo_dropdown_binding
	];
}

class RevoDropdown extends SvelteComponent {
  $$prop_def: RevoDropdownProps;
  $$events_def: RevoDropdownEvents;
  $$slot_def: RevoDropdownSlots;

  $on<K extends keyof RevoDropdownEvents>(type: K, callback: (e: RevoDropdownEvents[K]) => any): () => void {
	  return super.$on(type, callback);
	}

  $set($$props: Partial<RevoDropdownProps>): void {
	  super.$set($$props);
	}

	constructor(options) {
		super();

		init(this, options, instance, create_fragment, safe_not_equal, {
			dataLabel: 0,
			value: 1,
			currentFilter: 2,
			dataId: 3,
			autoClose: 4,
			source: 14,
			placeholder: 5,
			appendTo: 6,
			filter: 7,
			maxHeight: 8,
			hasFilter: 9,
			autocomplete: 10,
			autoFocus: 11,
			doClose: 15,
			doOpen: 16,
			doChange: 17,
			getWebComponent: 18
		});
	}

	
  /** Close dropdown */
 get doClose(): Components.RevoDropdown["doClose"] {
		return this.$$.ctx[15];
	}

	
  /** Open dropdown */
 get doOpen(): Components.RevoDropdown["doOpen"] {
		return this.$$.ctx[16];
	}

	
  /** Change value */
 get doChange(): Components.RevoDropdown["doChange"] {
		return this.$$.ctx[17];
	}

	get getWebComponent(): HTMLRevoDropdownElement | undefined {
		return this.$$.ctx[18];
	}
}

export default RevoDropdown;