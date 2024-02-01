export type DesFormSize = "default" | "large" | "small";
export type DesFormLabelPosition = "left" | "top" | "right";
export type DesFormAlign = "left" | "top" | "right";
export type DesFormPage = "dialog" | "page";
export type DesPattern = "pc" | "pad" | "h5";

import type { DesWidgetList } from "./widget";

export type DesFormConfig = { [key: string]: any };

// 表单JSON数据
export type DesFormJson = {
  formConfig: { [key: string]: any };
  widgetList: DesWidgetList;
};

// 表单模板数据
export type DesTemplateData = {
  name: string;
  img: string;
  widgetList: DesWidgetList;
};

export interface ProColumns<T = any> {
  type?: "index" | "selection" | "expand";
  prop: string;
  label?: string;
  children?: ProColumns[];
  render?: (scope: { row: T }) => any;
  [key: string]: any;
}

// 模式
export const PATTERN_TYPE = ["pc", "pad", "h5"] as const;

// 禁止拖入容器
export const DRAG_DISABLE_LIST = ["popup-box", "side-drawer"];

// 自定义改动表单
export const CUSTOM_LIST = [
  "alert",
  "button",
  "checkbox",
  "divider",
  "radio",
  "richText",
  "select",
  "steps",
  "text",
  "slot",
  "upload-image",
  "upload-file"
];

export const SHADOW_LIST = ["always", "never", "hover"];
// 可输入表单
export const MODEL_LIST = [
  "input",
  "input-number",
  "radio",
  "checkbox",
  "select",
  "date-picker",
  "time-picker",
  "switch",
  "cascader",
  "rate",
  "slider",
  "color-picker"
];
// 请求方式
export const METHOD_LIST = ["GET", "POST", "PUT", "DELETE"];
