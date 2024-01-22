import type { DesWidgetList } from "./container";

export const advanced: DesWidgetList = [
  {
    name: "级联选择",
    iconName: "cascader",
    type: "cascader",
    options: {
      clearable: true,
      customClass: "",
      modelDefaultValue: null,
      disabled: false,
      label: "级联选择",
      labelWidth: "",
      name: "",
      options: [],
      onChange: "",
      onValidate: "",
      placeholder: "",
      requiredHint: "",
      required: false,
      size: "default",
      validation: "",
      validationHint: ""
    }
  },
  {
    name: "图片",
    iconName: "image",
    type: "uploadImage",
    options: {
      action: "",
      accept: "",
      disabled: false,
      fileMaxSize: 5,
      fileTypes: ["jpg", "jpeg", "png"],
      multiple: "",
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
    type: "richText",
    options: {
      disabled: false,
      label: "富文本内容",
      labelWidth: "",
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
    type: "uploadFile",
    options: {
      action: "",
      accept: "",
      disabled: false,
      fileMaxSize: 5,
      fileTypes: [],
      multiple: "",
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