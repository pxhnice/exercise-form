export type DesFormSize = "default" | "large" | "small";
export type DesFormLabelPosition = "left" | "top" | "right";
export type DesFormAlign = "left" | "top" | "right";
export type DesFormPage = "dialog" | "page";
export type DesFormPattern = "pc" | "pad" | "h5";

type Keys = { [key: string]: any };

type DesMultiData = {
  name: string;
  remark: string;
};

// 数据源
export interface DesFormSource {
  sourceId: number;
  name: string;
  describe: string;
  requestUrl: string;
  method: string;
  headers: Keys;
  params: Keys;
  data: Keys;
  configHandlerCode: string;
  dataHandlerCode: string;
  errorHandlerCode: string;
  showMultiData: boolean;
  multiData: DesMultiData[];
}

// 组件数据
export interface DesFormWidget {
  name: string;
  iconName?: string;
  category?: string;
  type: string;
  children?: DesFormWidget[];
  options: Keys;
  [key: string]: any;
}

// 表单配置
export interface DesFormConfig {
  size: string;
  labelPosition: DesFormLabelPosition;
  align: DesFormAlign;
  labelWidth: number | string;
  dataSources: DesFormSource[];
  modelName: string;
  formName: string;
  rulesName: string;
  patternType: DesFormPattern;
  isPageType: DesFormPage;
  hideRequiredAsterisk: boolean;
  cssCode: string;
  customClass: string[];
  functions: string;
  onFormCreated: string;
  onFormMounted: string;
  onFormDataChange: string;
  [key: string]: any;
}

export interface DesFormParams {
  formConfig: DesFormConfig;
  widgetList: DesFormWidget[];
}

export interface DesFormWidgetParams {
  formConfig: DesFormConfig;
  widget: DesFormWidget;
}

// 表单历史记录
export interface DesFormHistory {
  index: number;
  maxStep: number;
  steps: DesFormParams[];
}

// 表单模板数据
export interface DesFormTemplateData {
  name: string;
  img: string;
  widgetList: DesFormWidget[];
}

//组件构建方法
export interface DesFormWidgetMethods {
  [key: string]: (params: DesFormWidgetParams) => string;
}

//事件构建方法
export interface DesFormWidgetEventMethods {
  [key: string]: (widget: DesFormWidget) => string;
}

//样式构建方法
export interface DesFormWidgetStyleMethods {
  [key: string]: () => string;
}

// 表格数据
export interface ProColumns<T = any> {
  type?: "index" | "selection" | "expand";
  prop: string;
  label?: string;
  children?: ProColumns[];
  render?: (scope: { row: T }) => any;
  [key: string]: any;
}

// 工具栏按钮
export interface DesFormToolbarOptions {
  templateButton: boolean;
  previewFormButton: boolean;
  treeFormButton: boolean;
  exportJsonButton: boolean;
  exportCodeButton: boolean;
  generateSFCButton: boolean;
  pageTypeButton: boolean;
  copyDataButton: boolean;
  saveFileButton: boolean;
  resetFormJson: boolean;
}
