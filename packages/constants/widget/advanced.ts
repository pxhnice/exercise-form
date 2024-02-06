import type { DesWidgetList } from "./container";

export const advanced: DesWidgetList = [
  {
    name: "级联选择",
    iconName: "cascader",
    type: "cascader",
    options: {
      clearable: true,
      customClass: "",
      dataSourceName: "",
      dataSourceSetName: "",
      modelDefaultValue: null,
      disabled: false,
      label: "级联选择",
      labelWidth: "",
      name: "",
      options: [],

      onChange: "",
      onValidate: "",
      placeholder: "",
      props: {
        children: "children",
        label: "label",
        value: "value"
      },
      requiredHint: "",
      required: false,
      size: "default",
      showDataSource: false,
      validation: "",
      validationHint: ""
    }
  },
  {
    name: "图片",
    iconName: "image",
    type: "upload-image",
    options: {
      action: "#",
      // accept: "",
      data: {},
      disabled: false,
      fileMaxSize: 5,
      fileTypes: ["jpg", "jpeg", "png"],
      headers: {},
      method: "POST",
      multiple: false,
      label: "上传图片",
      labelWidth: "",
      limit: 5,
      requiredHint: "",
      required: false,
      validation: "",
      validationHint: "",
      withCredentials: false
    }
  },
  {
    name: "富文本",
    iconName: "rich-text",
    type: "rich-text",
    options: {
      // onMaxLength: null,
      maxLength: null,
      label: "富文本内容",
      labelWidth: "",
      placeholder: "请输入...",
      readOnly: false,
      requiredHint: "",
      required: false,
      validation: "",
      validationHint: "",
      withCredentials: false
    }
  },
  {
    name: "文件",
    iconName: "file",
    type: "upload-file",
    options: {
      action: "#",
      // accept: "",
      data: {},
      disabled: false,
      fileMaxSize: 5,
      fileTypes: ["doc", "docx", "xlsx", "xls"],
      headers: {},
      method: "POST",
      multiple: false,
      label: "上传文件",
      labelWidth: "",
      limit: 5,
      requiredHint: "",
      required: false,
      validation: "",
      validationHint: "",
      withCredentials: false
    }
  },
  {
    name: "插槽",
    iconName: "slot",
    type: "slot",
    options: {
      // customClass: "",
      name: "",
      label: "slot"
    }
  }
];
