import { getElAttr } from './property';

import type { DesWidget, DesFormConfig } from "@exercise-form/constants";
type DesTemplateMethod = {
  [key: string]: (widget: DesWidget, formConfig: DesFormConfig) => string;
};

const elTemplates: DesTemplateMethod = {
  input: (widget, formConfig) => {
    let {
      modelValue,
      disabled,
      maxLength,
      minLength,
      size,
      readonly,
      placeholder,
      type,
      rows,
      clearable
    } = getElAttr(widget, formConfig);
    return `<el-input ${modelValue} ${type} ${disabled} ${maxLength} 
      ${minLength} ${size} ${rows} ${readonly} ${placeholder} ${clearable}/>`;
  },
  "input-number": (widget, formConfig) => {
    let { modelValue, disabled, size, readonly, placeholder } = getElAttr(
      widget,
      formConfig
    );
    return `<el-input-number ${modelValue} ${disabled} ${size} ${readonly} ${placeholder} />`;
  },
  radio: (widget, formConfig) => {
    let { modelValue, disabled, size, border } = getElAttr(widget, formConfig);
    let childTemplate = buildRadioChildren(widget);
    return `<el-radio-group ${modelValue} ${size} ${disabled} ${border}>${childTemplate}</el-radio-group>`;
  },
  checkbox: (widget, formConfig) => {
    let { modelValue, disabled, size, border } = getElAttr(widget, formConfig);
    let childTemplate = buildCheckboxChildren(widget);
    return `<el-checkbox-group ${modelValue} ${size} ${disabled} ${border}>${childTemplate}</el-checkbox-group>`;
  },
  select: (widget, formConfig) => {
    let { modelValue, disabled, size, multiple, multipleLimit, clearable } =
      getElAttr(widget, formConfig);
    let childTemplate = buildSelectChildren(widget);
    return `<el-select ${modelValue} ${size} ${disabled} ${multiple} ${multipleLimit} ${clearable}>${childTemplate}</el-select>`;
  },
  "date-picker": (widget, formConfig) => {
    let {
      modelValue,
      type,
      disabled,
      size,
      editable,
      format,
      clearable,
      placeholder,
      readonly,
      startPlaceholder,
      endPlaceholder
    } = getElAttr(widget, formConfig);
    return `<el-date-picker ${modelValue} ${type} ${size} ${disabled} ${editable} ${format} 
    ${clearable} ${placeholder} ${readonly} ${startPlaceholder} ${endPlaceholder}/>`;
  },
  "time-picker": (widget, formConfig) => {
    let {
      modelValue,
      type,
      disabled,
      size,
      editable,
      format,
      clearable,
      placeholder,
      readonly,
      startPlaceholder,
      endPlaceholder
    } = getElAttr(widget, formConfig);
    return `<el-time-picker ${modelValue} ${type} ${size} ${disabled} ${editable} ${format} 
      ${clearable} ${placeholder} ${readonly} ${startPlaceholder} ${endPlaceholder} />`;
  },
  switch: (widget, formConfig) => {
    let { modelValue, disabled, size } = getElAttr(widget, formConfig);
    return `<el-switch ${modelValue} ${disabled} ${size} />`;
  },
  cascader: (widget, formConfig) => {
    let { modelValue, disabled, size, clearable, placeholder } = getElAttr(
      widget,
      formConfig
    );
    return `<el-autocomplete ${modelValue} ${disabled} ${size} ${clearable} ${placeholder}/>`;
  },
  rate: (widget, formConfig) => {
    let { modelValue, allowHalf, max, disabled, size, clearable } = getElAttr(
      widget,
      formConfig
    );
    return `<el-rate ${modelValue} ${max} ${disabled} ${size} ${clearable} ${allowHalf} />`;
  },
  button: (widget, formConfig) => {
    let { disabled, size } = getElAttr(widget, formConfig);
    return `<el-button ${disabled} ${size}>${widget.options.label}</el-button>`;
  },
  divider: (widget, formConfig) => {
    let { borderStyle, contentPosition, direction } = getElAttr(
      widget,
      formConfig
    );
    return `<el-divider ${borderStyle} ${contentPosition} ${direction} />`;
  },
  slider: (widget, formConfig) => {
    let { modelValue, disabled, step, showStops } = getElAttr(
      widget,
      formConfig
    );
    return `<el-slider ${modelValue} ${disabled} ${showStops} ${step} />`;
  },
  "color-picker": (widget, formConfig) => {
    let { modelValue, disabled, size } = getElAttr(widget, formConfig);
    return `<el-color-picker ${modelValue} ${disabled} ${size} />`;
  },
  alert: (widget, formConfig) => {
    let { closable, showIcon, title, type } = getElAttr(widget, formConfig);
    return `<el-alert ${type} ${closable} ${showIcon} ${title}  />`;
  },
  text: (widget, formConfig) => {
    let { fontSize, size, tag, truncated, customClass } = getElAttr(
      widget,
      formConfig
    );
    return `<el-text ${fontSize} ${customClass} ${size} ${tag} ${truncated} >${widget.options.content}</el-text>`;
  },
  slot: (widget, formConfig) => {
    let name = widget.options.label ? `name="${widget.options.label}"` : "";
    return `<slot ${name}></slot>`;
  },
  "upload-image": (widget, formConfig) => {
    let { action, accept, headers, data, method } = getElAttr(
      widget,
      formConfig
    );
    return `<el-upload v-model:file-list="fileList" ${action} ${accept} ${headers} ${data} ${method} list-type="picture-card"> <el-icon><Plus /></el-icon></el-upload>`;
  },
  "upload-file": (widget, formConfig) => {
    let { action, accept, headers, data, method } = getElAttr(
      widget,
      formConfig
    );
    return `<el-upload 
    v-model:file-list="fileList" ${action} ${accept} ${headers} ${data} ${method}></el-upload>`;
  },
  "rich-text": (widget, formConfig) => {
    return ``;
  }
};

function buildRadioChildren(widget: DesWidget) {
  let { buttonMode, border, optionsLabel, optionsValue } = widget.options;
  let borderAttr = border && !buttonMode ? `:border` : "";
  let tag = buttonMode ? "el-radio-button" : "el-radio";
  return `<${tag} v-for="item in ${widget.options.name}optionsItem" :key="item.${optionsValue}" :label="item.${optionsValue}" ${borderAttr}>{{item.${optionsLabel}}}</${tag}>`;
}

function buildCheckboxChildren(widget: DesWidget) {
  let { buttonMode, border, optionsLabel, optionsValue } = widget.options;
  let borderAttr = border && !buttonMode ? `:border` : "";
  let tag = buttonMode ? "el-checkbox-button" : "el-checkbox";
  return `<${tag} v-for="item in ${widget.options.name}optionsItem" :key="item.${optionsValue}" :label="item.${optionsValue}" ${borderAttr}>{{item.${optionsLabel}}}</${tag}>`;
}

function buildSelectChildren(widget: DesWidget) {
  let { optionsLabel, optionsValue } = widget.options;
  return `<el-option v-for="item in ${widget.options.name}optionsItem" :key="item.${optionsValue}" :label="item.${optionsLabel}" :value="item.${optionsValue}"/>`;
}

export function buildBasicsTemplate(
  widget: DesWidget,
  formConfig: DesFormConfig
) {
  return elTemplates[widget.type] &&
    elTemplates[widget.type](widget, formConfig)
    ? elTemplates[widget.type](widget, formConfig)
    : "";
}
