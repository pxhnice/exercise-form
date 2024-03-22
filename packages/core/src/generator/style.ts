/**
 * @description 存放默认导出的样式
 */

import {
  DesFormWidget,
  DesFormParams,
  DesFormWidgetStyleMethods
} from "../interface";
import { traverseFieldWidget } from "./vue3Js";

const globalWidgetStyle = {
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
} as DesFormWidgetStyleMethods;

function buildStyleTemplate(type: string) {
  return globalWidgetStyle[type] && globalWidgetStyle[type]()
    ? globalWidgetStyle[type]()
    : "";
}

function buildStyleTemplateFn(
  styleList: string[],
  types: Set<string> = new Set([])
) {
  return function (widget: DesFormWidget) {
    if (!types.has(widget.type)) {
      let style = buildStyleTemplate(widget.type);
      styleList.push(style);
      types.add(widget.type);
    }
  };
}

export function getStyleTemplate(params: DesFormParams) {
  let { widgetList, formConfig } = params;
  let styleList: string[] = [];
  traverseFieldWidget({
    widgetList,
    formConfig,
    cb: (widget) => {
      buildStyleTemplateFn(styleList)(widget);
    }
  });
  return `${styleList.join("\n")}`;
}
