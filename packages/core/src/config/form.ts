export const formConfig = {
  desFormConfig: {
    size: "default",
    labelPosition: "left",
    align: "left",
    labelWidth: 100,
    dataSources: [],
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
  }
};

export const toolbarOptions = {
  templateButton: true, //是否显示模版栏
  treeFormButton: true, //是否显示预览表单按钮
  previewFormButton: true, //是否显示预览表单按钮
  exportJsonButton: true, //是否显示导出JSON器按钮
  exportCodeButton: true, //是否显示导出代码按钮
  generateSFCButton: true, //是否显示生成SFC按钮
  pageTypeButton: true, //是否显示导出页面类型按钮
  copyDataButton: true, //是否显示复制按钮
  saveFileButton: true, //是否显示导出文件按钮
  resetFormJson: false //是否初始化重置表单为空
};
