import { Component, Prop, h, VNode, State, Listen, Event, EventEmitter, Method, Watch, Host } from '@stencil/core';
import '../../utils/closestPolifill';
import { UUID } from '../../utils/consts';
import { getItemLabel, getItemValue } from '../../utils/item.helpers';
import { DropdownListFilter } from '../list/revo-list.filter';
import { ArrowRenderer } from './arrow';

@Component({
  tag: 'revo-dropdown',
  styleUrl: 'revo-dropdown.style.scss',
})
export class RevoDropdown {
  private element: Element;
  private dropdown: HTMLElement;
  private dropdownInner: HTMLElement;
  private dropdownInput: HTMLInputElement;
  private autocompleteInput: HTMLInputElement;
  private revoList: HTMLRevoListElement;
  private uuid: string = '';
  private currentSource?: any[];
  private isClosing = false;

  @State() currentItem: any = null;
  @State() isVisible = false;

  // --------------------------------------------------------------------------
  //
  //  Props
  //
  // --------------------------------------------------------------------------
  /**
   * Define object mapping for labels
   */
  @Prop() dataLabel: string;
  /**
   * Selected value
   */
  @Prop({ mutable: true }) value: any;
  /**
   * Filter value
   */
  @Prop({ mutable: true }) currentFilter: any;

  /**
   * Define object mapping for id/value
   */
  @Prop() dataId: string;
  /**
   * Should dropdown autoclose on changeValue
   */
  @Prop() autoClose: boolean = true;

  /**
   * Define object mapping for id/value
   */
  @Prop() source: any[] = [];

  /**
   * Define object mapping for id/value that should always be available
   * in the results even after filtering
   */
  @Prop() appendSource: any[] = [];

  /**
   * Placeholder text
   */
  @Prop() placeholder: string = 'Select';
  /**
   * Where to append element
   */
  @Prop() appendTo: 'body' | 'current' = 'body';
  /**
   * Filter criteria
   */
  @Prop() filter: 'contains' | 'start';

  @Prop() maxHeight: number;

  @Prop() hasFilter: boolean = true;

  @Prop() multiple: boolean = false;
  @Prop() autocomplete: boolean = false;
  @Prop() autoFocus: boolean = false;

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------
  /**
   * When value changed
   */
  @Event({ eventName: 'changed' }) changeValue: EventEmitter<{ val: any; originalEvent?: MouseEvent }>;
  /**
   * Before element close, can be prevented
   */
  @Event() close: EventEmitter;

  /**
   * Before element open, can be prevented
   */
  @Event() open: EventEmitter;

  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------

  /**
   * Close dropdown
   */
  @Method() async doClose(isDisconnected = false): Promise<void> {
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
  @Method() async doOpen(): Promise<void> {
    const event = this.open.emit();
    if (event.defaultPrevented) {
      return;
    }
    this.isVisible = true;
  }

  /**
   * Change value
   */
  @Method() async doChange(val: any, originalEvent?: MouseEvent): Promise<void> {
    const realValue = getItemValue(val, this.dataId);

    if (this.multiple) {
      let newVals = [...(this.value || [])];

      if (Array.isArray(this.value)) {
        newVals.push(realValue);
      } else {
        newVals = [realValue];
      }

      this.value = newVals;
    } else {
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
  @Listen('mousedown', { target: 'document' })
  onMouseUp(e: MouseEvent): void {
    if (this.isVisible && !e.defaultPrevented) {
      const isOutside = !(e.target as HTMLElement|null)?.closest(`[${UUID}="${this.uuid}"]`);
      if (isOutside) {
        this.doClose();
      }
    }
  }

  @Listen('keydown', { target: 'document' }) onKey(e: KeyboardEvent) {
    switch (e.code) {
      case 'Escape':
        e.preventDefault();
        this.doClose();
        break;
    }
  }

  @Watch('value') onValueChanged(newVal: any) {
    console.log('onValueChanged', newVal);
    if (Array.isArray(newVal)) {
      this.currentItem = newVal.map((val) => this.getValue(val));
    } else {
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
        setTimeout(() => this.autocompleteInput?.focus(), 0);
      }
    }
  }

  private getSelectedItemLabel(item?: any) {
    return item && getItemLabel(item, this.dataLabel) || '';
  }

  private renderDropdown() {
    return (
      <div class="revo-dropdown-list" ref={e => (this.dropdown = e)}>
        <div {...{ [UUID]: this.uuid }} class="dropdown-inner" ref={e => (this.dropdownInner = e)}>
          {this.hasFilter && !this.autocomplete ? (
            <DropdownListFilter
              ref={e => (this.dropdownInput = e)}
              source={this.source}
              filter={this.filter}
              dataLabel={this.dataLabel}
              value={this.currentFilter || ''}
              filterValue={this.currentFilter || ''}
              onFilterChange={e => {
                this.currentFilter = e.value;
                this.currentSource = e.items.concat(this.appendSource);
                this.revoList?.refresh(this.currentSource);
              }}
            />
          ) : undefined}
          <revo-list
            ref={e => (this.revoList = e)}
            isFocused={true}
            sourceItems={this.currentSource}
            dataLabel={this.dataLabel}
            onChanged={e => this.doChange(e.detail.item, e.detail.e)}
          />
        </div>
      </div>
    );
  }

  private deselect(index: number) {
    if (Array.isArray(this.currentItem)) {
      const items = [...this.currentItem];
      delete items[index];
      this.currentItem = [...items].filter((item) => item);
    }
  }

  renderSelect() {
    const val = this.multiple ? '' : this.getSelectedItemLabel(this.currentItem);
    return <input type="text" disabled class="filter-box" value={val} />;
  }

  renderAutocomplete() {
    const val = this.multiple ? '' : this.getSelectedItemLabel(this.currentItem);
    return (
      <DropdownListFilter
        ref={e => (this.autocompleteInput = e)}
        autocomplete='true'
        source={this.source}
        filter={this.filter}
        dataLabel={this.dataLabel}
        value={val}
        filterValue={this.currentFilter}
        onKeyDown={e => {
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
        }}
        onInput={() => this.showAutoComplete()}
        onFocus={() => this.showAutoComplete()}
        onClick={() => this.showAutoComplete()}
        onFilterChange={e => {
          this.currentFilter = e.value;
          this.currentSource = e.items.concat(this.appendSource);
          this.revoList?.refresh(this.currentSource);
        }}
      />
    );
  }

  renderMultiselected() {
    let values = [];

    if (Array.isArray(this.currentItem)) {
      values = [...this.currentItem];
    }

    if (values.length) {
      return <div>
        {values.map((item: any, index: number) => <button style={{ 'margin-left': index > 0 ? '2px' : '' }} onClick={e => {
          e.stopPropagation();
          this.deselect(index);
        }}>
          <span style={{ 'margin-right': '5px' }}>{this.getSelectedItemLabel(item)}</span>
          <span style={{ cursor: 'pointer', 'font-weight': 'bold' }}>✕</span>
        </button>)}
      </div>
    }
  }

  render() {
    let list: VNode;
    if (this.isVisible) {
      list = this.renderDropdown();
    }
    const props = {
      [UUID]: this.uuid,
      class: {
        active: this.isVisible,
        shrink: this.isVisible || !!this.currentItem || !!this.autocompleteInput?.value,
      },
      ref: e => (this.element = e),
      onClick: e => this.selectClick(e)
    };
    if (this.autocomplete) {
      props['autocomplete'] = true;
    }
    return (
      <Host {...props}>
        <label>{this.placeholder}</label>
        <div class="rv-dr-root">
          {this.multiple && this.renderMultiselected()}
          {this.autocomplete ? this.renderAutocomplete() : this.renderSelect()}
          <span class="actions"><ArrowRenderer/></span>
          <fieldset>
            <legend>
              <span>{this.placeholder}</span>
            </legend>
          </fieldset>
        </div>
        {list}
      </Host>
    );
  }

  private showAutoComplete() {
    if (!this.isVisible && !this.isClosing) {
      this.isVisible = true;
    }
    this.isClosing = false;
  }

  private getValue(newVal: any) {
    for (let index in this.source) {
      const item = this.source[index];
      if (newVal == getItemValue(item, this.dataId)) {
        return item;
      }
    }
    return null;
  }

  private selectClick(e: Event) {
    if (e.defaultPrevented) {
      return;
    }
    if (this.isVisible) {
      this.doClose();
    } else {
      this.doOpen();
    }
  }

  private updateStyles() {
    if (!this.dropdown) {
      return;
    }
    const { top, left, height } = this.element.getBoundingClientRect();
    const visibleRect = this.clientRectangle();
    let currentTop = top + height + visibleRect.top;

    const style: {
      top?: string;
      maxHeight?: number;
      maxWidth?: string;
      left?: string;
      opacity?: number;
      display: string;
    } = {
      opacity: 1,
      display: 'block'
    };

    // top
    if (currentTop > visibleRect.centerY) {
      style.top = `${currentTop - height}px`;
      style.maxHeight = currentTop - height - visibleRect.top - 50;
      this.dropdown.classList.add('top');

      // bottom
    } else {
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

  private clientRectangle() {
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

  private uuidv4(stamp: number) {
    return `${stamp}-xx-y`.replace(/[xy]/g, (c) => {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
