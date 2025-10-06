import { EventEmitter } from '../../stencil-public-runtime';
import '../../utils/closestPolifill';
export declare class RevoDropdown {
    private element;
    private dropdown;
    private dropdownInner;
    private dropdownInput;
    private autocompleteInput;
    private revoList;
    private uuid;
    private currentSource?;
    private isClosing;
    currentItem: any;
    isVisible: boolean;
    /**
     * Define object mapping for labels
     */
    dataLabel: string;
    /**
     * Selected value
     */
    value: any;
    /**
     * Filter value
     */
    currentFilter: any;
    /**
     * Define object mapping for id/value
     */
    dataId: string;
    /**
     * Should dropdown autoclose on changeValue
     */
    autoClose: boolean;
    /**
     * Define object mapping for id/value
     */
    source: any[];
    /**
     * Define object mapping for id/value that should always be available
     * in the results even after filtering
     */
    appendSource: any[];
    /**
     * Placeholder text
     */
    placeholder: string;
    /**
     * Where to append element
     */
    appendTo: 'body' | 'current';
    /**
     * Filter criteria
     */
    filter: 'contains' | 'start';
    maxHeight: number;
    hasFilter: boolean;
    multiple: boolean;
    autocomplete: boolean;
    autoFocus: boolean;
    /**
     * When value changed
     */
    changeValue: EventEmitter<{
        val: any;
        originalEvent?: MouseEvent;
    }>;
    /**
     * Before element close, can be prevented
     */
    close: EventEmitter;
    /**
     * Before element open, can be prevented
     */
    open: EventEmitter;
    /**
     * Close dropdown
     */
    doClose(isDisconnected?: boolean): Promise<void>;
    /**
     * Open dropdown
     */
    doOpen(): Promise<void>;
    /**
     * Change value
     */
    doChange(val: any, originalEvent?: MouseEvent): Promise<void>;
    /** Action finished */
    onMouseUp(e: MouseEvent): void;
    onKey(e: KeyboardEvent): void;
    onValueChanged(newVal: any): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    componentDidRender(): void;
    private getSelectedItemLabel;
    private renderDropdown;
    private deselect;
    renderSelect(): any;
    renderAutocomplete(): any;
    renderMultiselected(): any;
    render(): any;
    private showAutoComplete;
    private getValue;
    private selectClick;
    private updateStyles;
    private clientRectangle;
    private uuidv4;
}
