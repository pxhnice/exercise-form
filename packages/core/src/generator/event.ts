/**
 * @description 组件事件构建
 * 事件函数名命名规则：组件名（name）与事件名（例：Click）拼接
 */

import { DesFormWidgetEventMethods } from "../interface";
import { EVENT_PARAMS_NAME } from "../config";

export const globalWidgetEvent = {
  onClick: (widget) => {
    let { name, onClick } = widget.options;
    return `const ${name}Click=(${EVENT_PARAMS_NAME["onClick"]})=>{${onClick}}`;
  },
  onInput: (widget) => {
    let { name, onInput } = widget.options;
    return `const ${name}Input=(${EVENT_PARAMS_NAME["onInput"]})=>{${onInput}}`;
  },
  onChange: (widget) => {
    let { name, onChange } = widget.options;
    return `const ${name}Change=(${EVENT_PARAMS_NAME["onChange"]})=>{${onChange}}`;
  },
  onFocus: (widget) => {
    let { name, onFocus } = widget.options;
    return `const ${name}Focus=(${EVENT_PARAMS_NAME["onFocus"]})=>{${onFocus}}`;
  },
  onBlur: (widget) => {
    let { name, onBlur } = widget.options;
    return `const ${name}Blur=(${EVENT_PARAMS_NAME["onBlur"]})=>{${onBlur}}`;
  },
  onValidate: (widget) => {
    let { name, onValidate } = widget.options;
    return `const ${name}Validate=(${EVENT_PARAMS_NAME["onValidate"]})=>{${onValidate}}`;
  },
  onClear: (widget) => {
    let { name, onClear } = widget.options;
    return `const ${name}Clear=()=>{${onClear}}`;
  },
  //tabs
  onTabClick: (widget) => {
    let { name, onTabClick } = widget.options;
    return `const ${name}TabClick=(${EVENT_PARAMS_NAME["onTabClick"]})=>{${onTabClick}}`;
  },
  // tree
  onNodeClick: (widget) => {
    let { name, onNodeClick } = widget.options;
    return `const ${name}NodeClick=(${EVENT_PARAMS_NAME["onNodeClick"]})=>{${onNodeClick}}`;
  },
  onNodeCheck: (widget) => {
    let { name, onNodeCheck } = widget.options;
    return `const ${name}NodeCheck=(${EVENT_PARAMS_NAME["onNodeCheck"]})=>{${onNodeCheck}}`;
  },
  onCheckChange: (widget) => {
    let { name, onCheckChange } = widget.options;
    return `const ${name}CheckChange=(${EVENT_PARAMS_NAME["onCheckChange"]})=>{${onCheckChange}}`;
  },
  // dialog or drawer
  onCancelButtonClick: (widget) => {
    let { name, onCancelButtonClick } = widget.options;
    return `const ${name}CancelButtonClick=(${EVENT_PARAMS_NAME["onCancelButtonClick"]})=>{${onCancelButtonClick}}`;
  },
  onConfirmButtonClick: (widget) => {
    let { name, onConfirmButtonClick } = widget.options;
    return `const ${name}ConfirmButtonClick=(${EVENT_PARAMS_NAME["onConfirmButtonClick"]})=>{${onConfirmButtonClick}}`;
  },
  //dialog
  onDialogClose: (widget) => {
    let { name, onDialogClose } = widget.options;
    return `const ${name}DialogClose=(${EVENT_PARAMS_NAME["onDialogClose"]})=>{${onDialogClose}}`;
  },
  onDialogOpened: (widget) => {
    let { name, onDialogOpened } = widget.options;
    return `const ${name}DialogOpened=(${EVENT_PARAMS_NAME["onDialogOpened"]})=>{${onDialogOpened}}`;
  },
  // drawer
  onDrawerClose: (widget) => {
    let { name, onDrawerClose } = widget.options;
    return `const ${name}DrawerClose=(${EVENT_PARAMS_NAME["onDrawerClose"]})=>{${onDrawerClose}}`;
  },
  onDrawerOpened: (widget) => {
    let { name, onDrawerOpened } = widget.options;
    return `const ${name}DrawerOpened=(${EVENT_PARAMS_NAME["onDrawerOpened"]})=>{${onDrawerOpened}}`;
  },
  // table
  onSelect: (widget) => {
    let { name, onSelect } = widget.options;
    return `const ${name}Select=(${EVENT_PARAMS_NAME["onSelect"]})=>{${onSelect}}`;
  },
  onSelectAll: (widget) => {
    let { name, onSelectAll } = widget.options;
    return `const ${name}SelectAll=(${EVENT_PARAMS_NAME["onSelectAll"]})=>{${onSelectAll}}`;
  },
  onSelectionChange: (widget) => {
    let { name, onSelectionChange } = widget.options;
    return `const ${name}SelectionChange=(${EVENT_PARAMS_NAME["onSelectionChange"]})=>{${onSelectionChange}}`;
  },
  onCellClick: (widget) => {
    let { name, onCellClick } = widget.options;
    return `const ${name}CellClick=(${EVENT_PARAMS_NAME["onCellClick"]})=>{${onCellClick}}`;
  },
  onRowClick: (widget) => {
    let { name, onRowClick } = widget.options;
    return `const ${name}RowClick=(${EVENT_PARAMS_NAME["onRowClick"]})=>{${onRowClick}}`;
  },
  onHeaderClick: (widget) => {
    let { name, onHeaderClick } = widget.options;
    return `const ${name}HeaderClick=(${EVENT_PARAMS_NAME["onHeaderClick"]})=>{${onHeaderClick}}`;
  },
  onSortChange: (widget) => {
    let { name, onSortChange } = widget.options;
    return `const ${name}SortChange=(${EVENT_PARAMS_NAME["onSortChange"]})=>{${onSortChange}}`;
  },
  onFilterChange: (widget) => {
    let { name, onFilterChange } = widget.options;
    return `const ${name}FilterChange=(${EVENT_PARAMS_NAME["onFilterChange"]})=>{${onFilterChange}}`;
  },
  onExpandChange: (widget) => {
    let { name, onExpandChange } = widget.options;
    return `const ${name}ExpandChange=(${EVENT_PARAMS_NAME["onExpandChange"]})=>{${onExpandChange}}`;
  },
  onPageSizeChange: (widget) => {
    let { name, onPageSizeChange } = widget.options;
    return `const ${name}PageSizeChange=(${EVENT_PARAMS_NAME["onBlur"]})=>{${onPageSizeChange}}`;
  },
  onCurrentPageChange: (widget) => {
    let { name, onCurrentPageChange } = widget.options;
    return `const ${name}CurrentPageChange=(${EVENT_PARAMS_NAME["onBlur"]})=>{${onCurrentPageChange}}`;
  }
  //
} as DesFormWidgetEventMethods;
