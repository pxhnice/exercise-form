/**
 * @description 存放组件事件
 */

import { DesWidget, eventParamsName } from "@exercise-form/constants";
type DesTemplateMethod = {
  [key: string]: (widget: DesWidget) => string;
};

// onBeforeMounted: (widget) => {
//   let { onBeforeMounted } = widget;
//   return `const onBeforeMounted=()=>{${onBeforeMounted}}`;
// },
// onMounted: (widget) => {
//   let { onMounted } = widget;
//   return `const onFormMounted=()=>{${onMounted}}`;
// },

export const globalWidgetEvent: DesTemplateMethod = {
  onClick: (widget) => {
    let { name, onClick } = widget.options;
    return `const ${name}Click=(${eventParamsName["onClick"]})=>{${onClick}}`;
  },
  onInput: (widget) => {
    let { name, onInput } = widget.options;
    return `const ${name}Input=(${eventParamsName["onInput"]})=>{${onInput}}`;
  },
  onChange: (widget) => {
    let { name, onChange } = widget.options;
    return `const ${name}Change=(${eventParamsName["onChange"]})=>{${onChange}}`;
  },
  onFocus: (widget) => {
    let { name, onFocus } = widget.options;
    return `const ${name}Focus=(${eventParamsName["onFocus"]})=>{${onFocus}}`;
  },
  onBlur: (widget) => {
    let { name, onBlur } = widget.options;
    return `const ${name}Blur=(${eventParamsName["onBlur"]})=>{${onBlur}}`;
  },
  onValidate: (widget) => {
    let { name, onValidate } = widget.options;
    return `const ${name}Validate=(${eventParamsName["onValidate"]})=>{${onValidate}}`;
  },
  onClear: (widget) => {
    let { name, onClear } = widget.options;
    return `const ${name}Clear=()=>{${onClear}}`;
  },
  //tabs
  onTabClick: (widget) => {
    let { name, onTabClick } = widget.options;
    return `const ${name}TabClick=(${eventParamsName["onTabClick"]})=>{${onTabClick}}`;
  },
  // tree
  onNodeClick: (widget) => {
    let { name, onNodeClick } = widget.options;
    return `const ${name}NodeClick=(${eventParamsName["onNodeClick"]})=>{${onNodeClick}}`;
  },
  onNodeCheck: (widget) => {
    let { name, onNodeCheck } = widget.options;
    return `const ${name}NodeCheck=(${eventParamsName["onNodeCheck"]})=>{${onNodeCheck}}`;
  },
  onCheckChange: (widget) => {
    let { name, onCheckChange } = widget.options;
    return `const ${name}CheckChange=(${eventParamsName["onCheckChange"]})=>{${onCheckChange}}`;
  },
  // dialog or drawer
  onCancelButtonClick: (widget) => {
    let { name, onCancelButtonClick } = widget.options;
    return `const ${name}CancelButtonClick=(${eventParamsName["onCancelButtonClick"]})=>{${onCancelButtonClick}}`;
  },
  onConfirmButtonClick: (widget) => {
    let { name, onConfirmButtonClick } = widget.options;
    return `const ${name}ConfirmButtonClick=(${eventParamsName["onConfirmButtonClick"]})=>{${onConfirmButtonClick}}`;
  },
  //dialog
  onDialogClose: (widget) => {
    let { name, onDialogClose } = widget.options;
    return `const ${name}DialogClose=(${eventParamsName["onDialogClose"]})=>{${onDialogClose}}`;
  },
  onDialogOpened: (widget) => {
    let { name, onDialogOpened } = widget.options;
    return `const ${name}DialogOpened=(${eventParamsName["onDialogOpened"]})=>{${onDialogOpened}}`;
  },
  // drawer
  onDrawerClose: (widget) => {
    let { name, onDrawerClose } = widget.options;
    return `const ${name}DrawerClose=(${eventParamsName["onDrawerClose"]})=>{${onDrawerClose}}`;
  },
  onDrawerOpened: (widget) => {
    let { name, onDrawerOpened } = widget.options;
    return `const ${name}DrawerOpened=(${eventParamsName["onDrawerOpened"]})=>{${onDrawerOpened}}`;
  },
  // table
  onSelect: (widget) => {
    let { name, onSelect } = widget.options;
    return `const ${name}Select=(${eventParamsName["onSelect"]})=>{${onSelect}}`;
  },
  onSelectAll: (widget) => {
    let { name, onSelectAll } = widget.options;
    return `const ${name}SelectAll=(${eventParamsName["onSelectAll"]})=>{${onSelectAll}}`;
  },
  onSelectionChange: (widget) => {
    let { name, onSelectionChange } = widget.options;
    return `const ${name}SelectionChange=(${eventParamsName["onSelectionChange"]})=>{${onSelectionChange}}`;
  },
  onCellClick: (widget) => {
    let { name, onCellClick } = widget.options;
    return `const ${name}CellClick=(${eventParamsName["onCellClick"]})=>{${onCellClick}}`;
  },
  onRowClick: (widget) => {
    let { name, onRowClick } = widget.options;
    return `const ${name}RowClick=(${eventParamsName["onRowClick"]})=>{${onRowClick}}`;
  },
  onHeaderClick: (widget) => {
    let { name, onHeaderClick } = widget.options;
    return `const ${name}HeaderClick=(${eventParamsName["onHeaderClick"]})=>{${onHeaderClick}}`;
  },
  onSortChange: (widget) => {
    let { name, onSortChange } = widget.options;
    return `const ${name}SortChange=(${eventParamsName["onSortChange"]})=>{${onSortChange}}`;
  },
  onFilterChange: (widget) => {
    let { name, onFilterChange } = widget.options;
    return `const ${name}FilterChange=(${eventParamsName["onFilterChange"]})=>{${onFilterChange}}`;
  },
  onExpandChange: (widget) => {
    let { name, onExpandChange } = widget.options;
    return `const ${name}ExpandChange=(${eventParamsName["onExpandChange"]})=>{${onExpandChange}}`;
  },
  onPageSizeChange: (widget) => {
    let { name, onPageSizeChange } = widget.options;
    return `const ${name}PageSizeChange=(${eventParamsName["onBlur"]})=>{${onPageSizeChange}}`;
  },
  onCurrentPageChange: (widget) => {
    let { name, onCurrentPageChange } = widget.options;
    return `const ${name}CurrentPageChange=(${eventParamsName["onBlur"]})=>{${onCurrentPageChange}}`;
  }
  //
};
