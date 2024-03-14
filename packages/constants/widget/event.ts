export const eventParamsName = {
  // common
  onClick: "e",
  onInput: "value",
  onChange: "value",
  onFocus: "e",
  onBlur: "e",
  onValidate: "rule, value, callback",
  onClear: "",
  //tabs
  onTabClick: "pane,e",
  // tree
  onNodeClick: "data, node, el",
  onNodeCheck: "data",
  onCheckChange: "node",
  // dialog or drawer
  onCancelButtonClick: "",
  onConfirmButtonClick: "",
  //dialog
  onDialogClose: "",
  onDialogOpened: "",
  // drawer
  onDrawerClose: "",
  onDrawerOpened: "",
  // table
  onSelect: "selection, row",
  onSelectAll: "selection",
  onSelectionChange: "newSelection",
  onCellClick: "row, column, cell, event",
  onRowClick: "row, column, event",
  onHeaderClick: "",
  onSortChange: "column, prop, order",
  onFilterChange: "newFilters",
  onExpandChange: "row, expandedRows",
  onPageSizeChange: "value",
  onCurrentPageChange: "value"
};
