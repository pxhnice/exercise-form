export type DesFormSize = "default" | "large" | "small";
export type DesFormLabelPosition = "left" | "top" | "right";
export type DesFormAlign = "left" | "top" | "right";
export type DesFormPageType = "dialog" | "page";
export type DesPatternType = "pc" | "pad" | "h5";

import type { DesWidgetListType } from "./widget";

export type DesFormConfigType = {
  size?: DesFormSize;
  labelPosition?: DesFormLabelPosition;
  align?: DesFormAlign;
  labelWidth?: string | number;
  modelName?: string;
  formName?: string;
  rulesName?: string;
  patternType?: DesPatternType;
  isPageType?: DesFormPageType;
  hideRequiredAsterisk?: boolean;
  cssCode?: string;
  customClass?: [];
  functions?: string;
  onFormCreated?: string;
  onFormMounted?: string;
  onFormDataChange?: string;
  // [key: string]: any;
};

export type DesHistoryType = {
  index: number;
  maxStep: number;
  steps: any[];
};
// 表单JSON数据
export type DesFormJsonType = {
  formConfig?: DesFormConfigType;
  widgetList: DesWidgetListType;
};
// 表单模板数据
export type DesTemplateDataType = {
  name: string;
  img: string;
  widgetList: DesWidgetListType;
};

// 表单配置
export const DES_FORM_CONFIG: DesFormConfigType = {
  size: "default",
  labelPosition: "left",
  align: "left",
  labelWidth: 100,
  modelName: "formData",
  formName: "formRef",
  rulesName: "rules",
  patternType: "pc",
  isPageType: "page",
  hideRequiredAsterisk: false,
  cssCode: "",
  customClass: [],
  functions: "",
  onFormCreated: "",
  onFormMounted: "",
  onFormDataChange: ""
};

// 历史记录
export const DES_HISTORY: DesHistoryType = {
  index: -1,
  maxStep: 10,
  steps: []
};
// 模式
export const PATTERN_TYPE = ["pc", "pad", "h5"] as const;
// 自定义改动表单
export const CUSTOM_DATA = [
  "alert",
  "button",
  "checkbox",
  "divider",
  "radio",
  "richText",
  "select",
  "steps",
  "text",
  "uploadImage",
  "uploadFile"
] as const;

export const SHADOW_LIST = ["always", "never", "hover"];
// 可输入表单
export const MODEL_TYPE_LIST = [
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
