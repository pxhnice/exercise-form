export interface DesTableColumns {
  align: string;
  columnsId: number;
  children?: DesTableColumns[];
  format?: string;
  headerFlag?: boolean;
  label: string;
  minWidth?: number;
  prop: string;
  render?: string;
  show?: boolean;
  sortable?: boolean;
  fixed?: boolean;
}

export interface DesOperationButton {
  disabled: boolean;
  label: string;
  link: boolean;
  name: string;
  round: boolean;
  size: string;
  text: boolean;
  type: string;
  circle: boolean;
}
