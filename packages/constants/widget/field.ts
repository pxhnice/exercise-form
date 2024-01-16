import type { DesWidgetList } from "./container";

export const baseFields: DesWidgetList = [
  {
    name: "单行输入框",
    iconName: "input",
    type: "input",
    options: {
      clearable: true,
      customClass: "",
      modelDefaultValue: null,
      disabled: false,
      label: "单行输入框",
      labelWidth: "",
      maxLength: null,
      minLength: null,
      name: "",
      onInput: "",
      onChange: "",
      onFocus: "",
      onBlur: "",
      onValidate: "",
      placeholder: "",
      readonly: false,
      required: false,
      requiredHint: "",
      size: "default",
      type: "text",
      validation: "",
      validationHint: ""
    }
  },
  {
    name: "多行输入框",
    iconName: "textarea",
    type: "input",
    options: {
      clearable: true,
      customClass: "",
      modelDefaultValue: null,
      disabled: false,
      label: "多行输入框",
      labelWidth: "",
      maxLength: null,
      minLength: null,
      name: "",
      onInput: "",
      onChange: "",
      onFocus: "",
      onBlur: "",
      onValidate: "",
      placeholder: "",
      required: false,
      requiredHint: "",
      readonly: false,
      rows: 2,
      size: "default",
      type: "textarea",
      validation: "",
      validationHint: ""
    }
  },
  {
    name: "计数器",
    iconName: "input-number",
    type: "input-number",
    options: {
      customClass: "",
      modelDefaultValue: null,
      disabled: false,
      label: "计数器",
      labelWidth: "",
      name: "",
      onChange: "",
      onFocus: "",
      onBlur: "",
      onValidate: "",
      placeholder: "",
      requiredHint: "",
      readonly: false,
      required: false,
      size: "default",
      validation: "",
      validationHint: ""
    }
  },
  {
    name: "单选",
    iconName: "radio",
    type: "radio",
    options: {
      border: false,
      buttonMode: false,
      customClass: "",
      // modelDefaultValue: null,
      disabled: false,
      label: "单选",
      name: "",
      onChange: "",
      onValidate: "",
      optionsItem: [
        {
          value: 1,
          label: "radio1"
        },
        {
          value: 2,
          label: "radio2"
        },
        {
          value: 3,
          label: "radio3"
        }
      ],
      required: false,
      requiredHint: "",
      size: "default",
      validation: "",
      validationHint: ""
    }
  },
  {
    name: "多选",
    iconName: "checkbox",
    type: "checkbox",
    options: {
      border: false,
      buttonMode: false,
      customClass: "",
      // modelDefaultValue: null,
      disabled: false,
      label: "多选",
      name: "",
      onChange: "",
      onValidate: "",
      optionsItem: [
        {
          value: 1,
          label: "checkbox1"
        },
        {
          value: 2,
          label: "checkbox2"
        },
        {
          value: 3,
          label: "checkbox3"
        }
      ],
      required: false,
      requiredHint: "",
      size: "default",
      validation: "",
      validationHint: ""
    }
  },
  {
    name: "下拉选",
    iconName: "select",
    type: "select",
    options: {
      clearable: true,
      customClass: "",
      disabled: false,
      modelDefaultValue: null,
      label: "下拉选",
      multiple: false,
      multipleLimit: 0,
      name: "",
      onChange: "",
      onValidate: "",
      optionsItem: [
        {
          value: 1,
          label: "option1"
        },
        {
          value: 2,
          label: "option2"
        },
        {
          value: 3,
          label: "option3"
        }
      ],
      required: false,
      requiredHint: "",
      size: "default",
      validation: "",
      validationHint: ""
    }
  },
  {
    name: "日期",
    iconName: "date-picker",
    type: "date-picker",
    options: {
      clearable: true,
      customClass: "",
      modelDefaultValue: null,
      disabled: false,
      editable: false,
      format: "YYYY-MM-DD",
      label: "日期",
      labelWidth: "",
      name: "",
      onChange: "",
      onFocus: "",
      onBlur: "",
      onValidate: "",
      placeholder: "",
      readonly: false,
      required: false,
      requiredHint: "",
      size: "default",
      type: "date",
      validation: "",
      validationHint: "",
      valueFormat: "YYYY-MM-DD"
    }
  },
  {
    name: "日期范围",
    iconName: "date-picker-range",
    type: "date-picker",
    options: {
      clearable: true,
      customClass: "",
      modelDefaultValue: null,
      disabled: false,
      editable: false,
      endPlaceholder: "",
      format: "YYYY-MM-DD",
      isRange: true,
      label: "日期范围",
      labelWidth: "",
      name: "",
      onChange: "",
      onFocus: "",
      onBlur: "",
      onValidate: "",
      requiredHint: "",
      readonly: false,
      required: false,
      size: "default",
      startPlaceholder: "",
      type: "daterange",
      validation: "",
      validationHint: "",
      valueFormat: "YYYY-MM-DD"
    }
  },
  {
    name: "时间",
    iconName: "time-picker",
    type: "time-picker",
    options: {
      clearable: true,
      customClass: "",
      modelDefaultValue: null,
      disabled: false,
      editable: false,
      format: "HH:mm:ss",
      label: "时间",
      labelWidth: "",
      name: "",
      onChange: "",
      onFocus: "",
      onBlur: "",
      onValidate: "",
      placeholder: "",
      requiredHint: "",
      readonly: false,
      required: false,
      size: "default",
      validation: "",
      validationHint: ""
    }
  },
  {
    name: "时间范围",
    iconName: "time-picker-range",
    type: "time-picker",
    options: {
      clearable: true,
      customClass: "",
      modelDefaultValue: null,
      disabled: false,
      editable: false,
      format: "HH:mm:ss",
      isRange: true,
      label: "时间范围",
      labelWidth: "",
      name: "",
      onChange: "",
      onFocus: "",
      onBlur: "",
      onValidate: "",
      placeholder: "",
      requiredHint: "",
      readonly: false,
      required: false,
      size: "default",
      validation: "",
      validationHint: ""
    }
  },
  {
    name: "开关",
    iconName: "switch",
    type: "switch",
    options: {
      customClass: "",
      modelDefaultValue: false,
      disabled: false,
      label: "开关",
      labelWidth: "",
      name: "",
      onChange: "",
      onValidate: "",
      requiredHint: "",
      required: false,
      size: "default",
      validation: "",
      validationHint: ""
    }
  },
  {
    name: "评星",
    iconName: "rate",
    type: "rate",
    options: {
      allowHalf: false,
      clearable: true,
      customClass: "",
      modelDefaultValue: null,
      disabled: false,
      label: "评星",
      labelWidth: "",
      max: 5,
      name: "",
      onChange: "",
      onValidate: "",
      requiredHint: "",
      required: false,
      size: "default",
      validation: "",
      validationHint: ""
    }
  },
  {
    name: "按钮",
    iconName: "button",
    type: "button",
    options: {
      customClass: "",
      disabled: false,
      label: "button",
      name: "",
      onClick: "",
      size: "default"
    }
  },
  {
    name: "分割线",
    iconName: "divider",
    type: "divider",
    options: {
      borderStyle: "solid",
      contentPosition: "center",
      customClass: "",
      direction: "horizontal",
      label: "divider",
      name: ""
    }
  },
  {
    name: "滑块",
    iconName: "slider",
    type: "slider",
    options: {
      customClass: "",
      disabled: false,
      label: "滑块",
      labelWidth: "",
      name: "",
      onChange: "",
      onValidate: "",
      requiredHint: "",
      required: false,
      step: 10,
      showStops: true,
      validation: "",
      validationHint: ""
    }
  },
  {
    name: "颜色",
    iconName: "color-picker",
    type: "color-picker",
    options: {
      customClass: "",
      modelDefaultValue: null,
      disabled: false,
      label: "颜色",
      labelWidth: "",
      name: "",
      onChange: "",
      onValidate: "",
      requiredHint: "",
      required: false,
      size: "default",
      validation: "",
      validationHint: ""
    }
  }
];
