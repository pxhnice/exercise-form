import { DesFormWidget } from "@exercise-form/core";
import { operationButtons, tableColumns, tableData } from "./table";
import { treeData } from "./tree";

export const containers = [
  {
    name: "栅格",
    iconName: "grid",
    category: "container",
    type: "grid",
    children: [],
    options: {
      colHeight: "",
      customClass: "",
      gutter: 10,
      hidden: false,
      name: "",
      style: {
        minHeight: "40px"
      }
    }
  },
  {
    name: "表格",
    iconName: "table",
    category: "container",
    type: "table",
    children: [],
    options: {
      customClass: "",
      hidden: false,
      name: ""
    }
  },
  {
    name: "卡片",
    iconName: "card",
    category: "container",
    type: "card",
    children: [],
    options: {
      cardWidth: "100%",
      customClass: "",
      hidden: false,
      label: "卡片",
      name: "",
      shadow: "always"
    }
  },
  {
    name: "标签页",
    category: "container",
    iconName: "tabs",
    type: "tabs",
    children: [],
    options: {
      customClass: "",
      hidden: false,
      isPane: true,
      name: "",
      modelDefaultValue: null,
      onTabClick: "",
      type: "border-card"
    }
  },
  {
    name: "栅格列",
    iconName: "",
    type: "grid-col",
    category: "container",
    children: [],
    options: {
      customClass: "",
      // hidden: false,
      name: "",
      span: 12,
      offset: 0,
      push: 0,
      pull: 0
    }
  },
  {
    name: "单元格",
    type: "table-td",
    category: "container",
    children: [],
    merged: true,
    options: {
      cellWidth: "",
      cellHeight: "",
      colspan: 1,
      customClass: "",
      // hidden: false,
      name: "",
      rowspan: 1
    }
  },
  {
    name: "数据表格",
    iconName: "data-table",
    category: "container",
    type: "data-table",
    children: [],
    options: {
      border: true,
      childrenKey: "children",
      customClass: "",
      dataSourceName: "",
      dataSourceSetName: "",
      fit: true,
      height: "300px",
      highlightCurrentRow: false,
      hidden: false,
      name: "",
      onSelect: "",
      onSelectAll: "",
      onSelectionChange: "",
      onCellClick: "",
      onRowClick: "",
      onHeaderClick: "",
      onSortChange: "",
      onFilterChange: "",
      onExpandChange: "",
      onPageSizeChange: "",
      onCurrentPageChange: "",
      operationAlign: "center",
      operationButtons,
      operationFixed: "right",
      operationLabel: "操作",
      operationWidth: 150,
      paginationAlign: "left",
      pagination: {
        currentPage: 1,
        pageSizes: [10, 15, 20, 30, 50, 100, 200],
        pageSize: 20,
        total: 400
      },
      showCheckBox: true,
      showDataSource: false,
      showHeader: true,
      showIndex: true,
      showOperation: true,
      showPagination: true,
      showSummary: false,
      size: "default",
      small: false,
      stripe: true,
      rowKey: "id",
      tableColumns,
      tableData,
      tableWidth: "100%"
    }
  },
  {
    name: "侧边抽屉",
    iconName: "side-drawer",
    category: "container",
    type: "side-drawer",
    children: [],
    options: {
      cancelText: "取消",
      closeOnClickModal: true,
      closeOnPressEscape: true,
      confirmText: "确认",
      customClass: "",
      direction: "rtl",
      modal: true,
      name: "",
      onCancelButtonClick: "",
      onConfirmButtonClick: "",
      onDrawerClose: "",
      onDrawerOpened: "",
      showClose: true,
      showConfirmButton: true,
      showCancelButton: true,
      size: "",
      title: "侧边抽屉"
    }
  },
  {
    name: "弹出窗口",
    iconName: "popup-box",
    category: "container",
    type: "popup-box",
    children: [],
    options: {
      cancelText: "取消",
      center: false,
      closeOnClickModal: true,
      closeOnPressEscape: true,
      confirmText: "确认",
      customClass: "",
      draggable: false,
      fullscreen: false,
      modal: true,
      name: "",
      onCancelButtonClick: "",
      onConfirmButtonClick: "",
      onDialogClose: "",
      onDialogOpened: "",
      showClose: true,
      showConfirmButton: true,
      showCancelButton: true,
      title: "弹出窗口",
      width: ""
    }
  },
  {
    name: "树形",
    iconName: "data-tree",
    category: "container",
    type: "data-tree",
    children: [],
    options: {
      customClass: "",
      dataSourceName: "",
      dataSourceSetName: "",
      draggable: true,
      defaultExpandAll: true,
      hidden: false,
      lazy: false,
      name: "",
      nodeKey: "id",
      // props: {
      //   children: "children",
      //   label: "label"
      // },
      onNodeClick: "",
      onNodeCheck: "",
      onCheckChange: "",
      treeData,
      showCheckbox: true,
      showDataSource: false,
      showCheckAllOrCancelAll: true,
      showFilter: true,
      showExpandOrRetract: true,
      showLinkage: true,
      showOperationButton: true
    }
  },
  {
    name: "按钮组",
    iconName: "button-group",
    category: "container",
    type: "button-group",
    children: [],
    options: {
      buttonGroups: [
        {
          disabled: false,
          label: "新增",
          link: false,
          name: "add",
          round: false,
          onClick: "",
          type: ""
        },
        {
          disabled: false,
          label: "编辑",
          link: false,
          name: "edit",
          round: false,
          text: false,
          onClick: "",
          type: ""
        },
        {
          disabled: false,
          label: "删除",
          link: false,
          name: "delete",
          round: false,
          text: false,
          onClick: "",
          type: ""
        }
      ],
      customClass: "",
      hidden: false,
      name: "",
      size: "default"
    }
  },
  {
    name: "对象容器",
    iconName: "object-group",
    category: "container",
    type: "object-group",
    children: [],
    options: {
      customClass: "",
      hidden: false,
      objectName: "objectName",
      name: ""
    }
  },
  {
    name: "标签",
    iconName: "",
    category: "container",
    type: "tab-pane",
    children: [],
    options: {
      name: "tab1",
      label: "tab1"
    }
  }
] as DesFormWidget[];
