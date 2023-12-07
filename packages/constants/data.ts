// 表单配置
export const DES_FORM_CONFIG = {
  size: "default",
  labelPosition: "left",
  align: "left",
  labelWidth: 100,
  modelName: "formData",
  formName: "formRef",
  rulesName: "rules",
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
export const DES_HISTORY = {
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
] as const;
