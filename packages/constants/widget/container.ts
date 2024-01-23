import { operationButtons, tableColumns, tableData } from "./table";
import { treeData } from "./tree";

export type DesWidget = {
  name: string;
  iconName?: string;
  category?: string;
  type: string;
  children?: DesWidget[];
  options: { [key: string]: any };
  [key: string]: any;
};

export type DesWidgetList = Array<DesWidget>;

export const containers: DesWidgetList = [
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
      hidden: false,
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
      hidden: false,
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
      fit: true,
      height: "100%",
      highlightCurrentRow: false,
      name: "",
      operationButtons,
      operationAlign: "center",
      operationLabel: "操作",
      operationWidth: 120,
      showCheckBox: true,
      showHeader: true,
      showIndex: true,
      showOperation: true,
      size: "default",
      stripe: true,
      rowKey: "id",
      tableColumns,
      tableData,
      width: "100%"
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
      showClose: true,
      showConfirmButton: false,
      showCancelButton: false,
      size: "",
      title: ""
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
      showClose: true,
      showConfirmButton: false,
      showCancelButton: false,
      title: "",
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
      draggable: true,
      defaultExpandAll: true,
      lazy: false,
      name: "",
      nodeKey: "id",
      props: {
        children: "children",
        label: "label"
      },
      treeData,
      showCheckbox: true,
      showCheckAllOrCancelAll: true,
      showFilter: true,
      showExpandOrRetract: true,
      showLinkage: true,
      showOperationButton: true
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
];
