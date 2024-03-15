/**
 * @description 构建基础组件模板
 */

import { getElAttr } from "./property";
import {
  DesFormWidget,
  DesFormWidgetMethods,
  DesFormWidgetParams
} from "../interface";

const basicsTemplates = {
  input: (params) => {
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
      clearable,
      onInput,
      onFocus,
      onChange,
      onBlur,
      onClear
    } = getElAttr(params);
    return `<el-input ${modelValue} ${type} ${disabled} ${maxLength} 
      ${minLength} ${size} ${rows} ${readonly} ${placeholder} 
      ${clearable} ${onInput} ${onFocus} ${onBlur} ${onChange} ${onClear}/>`;
  },

  "input-number": (params) => {
    let {
      modelValue,
      disabled,
      size,
      readonly,
      placeholder,
      onFocus,
      onChange,
      onBlur
    } = getElAttr(params);
    return `<el-input-number ${modelValue} ${disabled} ${size} 
    ${readonly} ${placeholder} ${onFocus} ${onBlur} ${onChange} />`;
  },

  radio: (params) => {
    let { widget } = params;
    let { modelValue, disabled, size, border, displayStyle, onChange } =
      getElAttr(params);
    let childTemplate = buildRadioChildren(widget);
    return `<el-radio-group ${displayStyle} ${modelValue} ${size} ${disabled} 
    ${border} ${onChange}>${childTemplate}</el-radio-group>`;
  },

  checkbox: (params) => {
    let { widget } = params;
    let { modelValue, disabled, size, border, onChange } = getElAttr(params);
    let childTemplate = buildCheckboxChildren(widget);
    return `<el-checkbox-group ${modelValue} ${size} ${disabled} 
    ${border} ${onChange}>${childTemplate}</el-checkbox-group>`;
  },

  select: (params) => {
    let { widget } = params;
    let {
      modelValue,
      disabled,
      size,
      multiple,
      multipleLimit,
      clearable,
      onFocus,
      onChange,
      onBlur,
      onClear
    } = getElAttr(params);
    let childTemplate = buildSelectChildren(widget);
    return `<el-select ${modelValue} ${size} ${disabled} ${multiple} ${multipleLimit} 
    ${clearable}  ${onFocus} ${onBlur} ${onChange} ${onClear}>${childTemplate}</el-select>`;
  },

  "date-picker": (params) => {
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
      endPlaceholder,
      onFocus,
      onChange,
      onBlur
    } = getElAttr(params);
    return `<el-date-picker ${modelValue} ${type} ${size} ${disabled} ${editable} 
    ${format} ${clearable} ${placeholder} ${readonly} ${startPlaceholder} 
    ${endPlaceholder} ${onFocus} ${onBlur} ${onChange}/>`;
  },

  "time-picker": (params) => {
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
      endPlaceholder,
      onFocus,
      onChange,
      onBlur
    } = getElAttr(params);
    return `<el-time-picker ${modelValue} ${type} ${size} ${disabled} ${editable} ${format} 
      ${clearable} ${placeholder} ${readonly} ${startPlaceholder} 
      ${endPlaceholder} ${onFocus} ${onBlur} ${onChange}/>`;
  },

  switch: (params) => {
    let { modelValue, disabled, size, onChange } = getElAttr(params);
    return `<el-switch ${modelValue} ${disabled} ${size} ${onChange}/>`;
  },

  cascader: (params) => {
    let {
      modelValue,
      disabled,
      size,
      clearable,
      placeholder,
      onFocus,
      onChange,
      onBlur
    } = getElAttr(params);
    return `<el-autocomplete ${modelValue} ${disabled} ${size} ${clearable} 
    ${placeholder} ${onFocus} ${onBlur} ${onChange}/>`;
  },

  rate: (params) => {
    let { modelValue, allowHalf, max, disabled, size, clearable, onChange } =
      getElAttr(params);
    return `<el-rate ${modelValue} ${max} ${disabled} ${size} ${clearable} ${allowHalf} ${onChange}/>`;
  },

  button: (params) => {
    let { widget } = params;
    let { disabled, size, onClick } = getElAttr(params);
    return `<el-button ${disabled} ${size} ${onClick}>${widget.options.label}</el-button>`;
  },

  divider: (params) => {
    let { borderStyle, contentPosition, direction } = getElAttr(params);
    return `<el-divider ${borderStyle} ${contentPosition} ${direction} />`;
  },

  slider: (params) => {
    let { modelValue, disabled, step, showStops, onInput, onChange } =
      getElAttr(params);
    return `<el-slider ${modelValue} ${disabled} ${showStops} ${step} ${onInput} ${onChange}/>`;
  },

  "color-picker": (params) => {
    let { modelValue, disabled, size, onFocus, onChange, onBlur } =
      getElAttr(params);
    return `<el-color-picker ${modelValue} ${disabled} ${size} ${onFocus} ${onBlur} ${onChange}/>`;
  },

  alert: (params) => {
    let { closable, showIcon, title, type } = getElAttr(params);
    return `<el-alert ${type} ${closable} ${showIcon} ${title}  />`;
  },

  text: (params) => {
    let { widget } = params;
    let { fontSize, size, tag, truncated, customClass } = getElAttr(params);
    return `<el-text ${fontSize} ${customClass} ${size} ${tag} ${truncated} >${widget.options.content}</el-text>`;
  },

  slot: (params) => {
    let { widget } = params;
    let name = widget.options.label ? `name="${widget.options.label}"` : "";
    return `<slot ${name}></slot>`;
  },

  "upload-image": (params) => {
    let { action, accept, headers, data, method } = getElAttr(params);
    return `<el-upload v-model:file-list="fileList" ${action} ${accept} ${headers} 
    ${data} ${method} list-type="picture-card"> <el-icon><Plus /></el-icon></el-upload>`;
  },

  "upload-file": (params) => {
    let { action, accept, headers, data, method } = getElAttr(params);
    return `<el-upload 
    v-model:file-list="fileList" ${action} ${accept} ${headers} ${data} ${method}></el-upload>`;
  },

  "rich-text": (params) => {
    return ``;
  }
} as DesFormWidgetMethods;

function buildRadioChildren(widget: DesFormWidget) {
  let { buttonMode, border, optionsLabel, optionsValue, displayStyle } =
    widget.options;
  let borderAttr = border && !buttonMode ? `:border` : "";
  let tag = buttonMode ? "el-radio-button" : "el-radio";
  let displayStyleAttr = displayStyle ? `style="display:${displayStyle};"` : "";
  return `<${tag} ${displayStyleAttr} v-for="item in ${widget.options.name}optionsItem" 
  :key="item.${optionsValue}" :label="item.${optionsValue}" ${borderAttr}>{{item.${optionsLabel}}}</${tag}>`;
}

function buildCheckboxChildren(widget: DesFormWidget) {
  let { buttonMode, border, optionsLabel, optionsValue, displayStyle } =
    widget.options;
  let displayStyleAttr = displayStyle ? `style="display:${displayStyle};"` : "";
  let borderAttr = border && !buttonMode ? `:border` : "";
  let tag = buttonMode ? "el-checkbox-button" : "el-checkbox";
  return `<${tag} ${displayStyleAttr} v-for="item in ${widget.options.name}optionsItem" 
  :key="item.${optionsValue}" :label="item.${optionsValue}" ${borderAttr}>{{item.${optionsLabel}}}</${tag}>`;
}

function buildSelectChildren(widget: DesFormWidget) {
  let { optionsLabel, optionsValue } = widget.options;
  return `<el-option v-for="item in ${widget.options.name}optionsItem" 
  :key="item.${optionsValue}" :label="item.${optionsLabel}" :value="item.${optionsValue}"/>`;
}

export function buildBasicsTemplate(params: DesFormWidgetParams) {
  let { widget } = params;
  return basicsTemplates[widget.type] && basicsTemplates[widget.type](params)
    ? basicsTemplates[widget.type](params)
    : "";
}
