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
  "rich-text",
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

// 不需要el-form-item的组件
export const STATIC_LIST = ["text", "alert", "divider", "slot"];

// 具有数据的属性
export const HAVE_DATA_KEYS = [
  "data",
  "headers",
  "tableData",
  "treeData",
  "optionsItem",
  "options"
];

// 外部组件
export const OUTER_WIDGET = ["popup-box", "side-drawer"];
