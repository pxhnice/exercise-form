import { DesWidget } from "@exercise-form/constants";

type DesTemplateMethod = {
  [key: string]: () => string;
};

// 存放组件默认导出的样式
const globalWidgetStyle: DesTemplateMethod = {
  grid: () => {
    return ``;
  },
  table: () => {
    return `
    table{
      width: 100%;
      table-layout: fixed;
      min-height: 40px;
      border-collapse: collapse;
      th,
      td {
        border: 1px solid;
        border-color: #dcdfe6;
      }
      td {
        height: 40px;
      }
    }`;
  },
  card: () => {
    return ``;
  },
  tabs: () => {
    return ``;
  },
  "data-table": () => {
    return ``;
  },
  "data-tree": () => {
    return ``;
  },
  "side-drawer": () => {
    return ``;
  },
  "popup-box": () => {
    return ``;
  },
  input: () => {
    return ``;
  },
  "input-number": () => {
    return ``;
  },
  radio: () => {
    return ``;
  },
  checkbox: () => {
    return ``;
  },
  select: () => {
    return ``;
  },
  "date-picker": () => {
    return ``;
  },
  "time-picker": () => {
    return ``;
  },
  switch: () => {
    return ``;
  },
  cascader: () => {
    return ``;
  },
  rate: () => {
    return ``;
  },
  button: () => {
    return ``;
  },
  divider: () => {
    return ``;
  },
  slider: () => {
    return ``;
  },
  "color-picker": () => {
    return ``;
  },
  alert: () => {
    return ``;
  },
  text: () => {
    return ``;
  },
  slot: () => {
    return ``;
  },
  "upload-image": () => {
    return ``;
  },
  "upload-file": () => {
    return ``;
  },
  "rich-text": () => {
    return ``;
  }
};

function buildStyleTemplate(type: string) {
  return globalWidgetStyle[type] && globalWidgetStyle[type]()
    ? globalWidgetStyle[type]()
    : "";
}

function traverseWidget(widgetList: DesWidget[]) {
  let styleList: string[] = [];
  let types: Set<string> = new Set([]);
  widgetList.forEach((widget: DesWidget) => {
    if (!types.has(widget.type)) {
      let style = buildStyleTemplate(widget.type);
      styleList.push(style);
      types.add(widget.type);
    }
    if (widget.category === "container") {
      traverseWidget(widget?.children || []);
    }
  });
  return styleList;
}

export function getStyleTemplate(widgetList: DesWidget[]) {
  let styleList = traverseWidget(widgetList);
  return `${styleList.join("\n")}`;
}
