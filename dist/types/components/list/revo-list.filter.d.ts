import { JSXBase } from '../../stencil-public-runtime';
interface Props extends JSXBase.DOMAttributes<any> {
  value?: string;
  filterValue?: string;
  source: any[];
  dataLabel?: string;
  filter?: 'contains' | 'start';
  autocomplete?: string;
  ref?(e: HTMLInputElement): void;
  onInput?(): void;
  onFocus?(): void;
  onClick?(e: MouseEvent): void;
  onFilterChange(e: {
    value?: string;
    items: any[];
  }): void;
}
export declare const DropdownListFilter: (p: Props) => any;
export {};
