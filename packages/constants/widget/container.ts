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
