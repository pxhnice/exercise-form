/**
 * @description 构建弹窗抽屉模板
 */

import {
  DesFormWidget,
  DesFormParams,
  DesFormWidgetParams,
  DesFormWidgetMethods
} from "../interface";
import { buildFieldWidget } from "./field";
import { getElAttr } from "./property";
import { buildContainerWidget } from "./container";
import { OUTER_WIDGET } from "../config";

const outerTemplate = {
  "side-drawer": (params) => {
    let { widget, formConfig } = params;
    let { name, onDrawerClose, onDrawerOpened } = widget.options;

    let onDrawerCloseEvent = onDrawerClose ? `@click="${name}DrawerClose` : "";
    let onDrawerOpenedEvent = onDrawerOpened
      ? `@click="${name}DrawerOpened`
      : "";

    let {
      closeOnClickModal,
      closeOnPressEscape,
      modal,
      showClose,
      title,
      size
    } = getElAttr(params);
    let modelValue = `v-model="${name}"`;
    let footerHtml = footerTemplate(widget);
    return `
    <el-drawer ${title} ${modelValue} ${size} ${showClose} ${modal} ${closeOnClickModal} 
    ${closeOnPressEscape} ${onDrawerOpenedEvent} ${onDrawerCloseEvent}>
    ${
      widget.children &&
      widget.children
        .map((child) => {
          if (child.category === "container") {
            return buildContainerWidget({ widget: child, formConfig });
          } else {
            return buildFieldWidget({ widget: child, formConfig });
          }
        })
        .join("\n")
    }
    ${footerHtml}
    </el-drawer>
    `;
  },

  "popup-box": (params) => {
    let { widget, formConfig } = params;
    let { name } = widget.options;
    let {
      closeOnClickModal,
      closeOnPressEscape,
      modal,
      showClose,
      title,
      width
    } = getElAttr(params);
    let modelValue = `v-model="${name}"`;
    let footerHtml = footerTemplate(widget);
    return `
    <el-dialog ${width} ${title} ${modelValue} ${modal} ${showClose} ${closeOnClickModal} ${closeOnPressEscape}>
    ${
      widget.children &&
      widget.children
        .map((child) => {
          if (child.category === "container") {
            return buildContainerWidget({ widget: child, formConfig });
          } else {
            return buildFieldWidget({ widget: child, formConfig });
          }
        })
        .join("\n")
    }
    ${footerHtml}
    </el-dialog>
    `;
  }
} as DesFormWidgetMethods;

function footerTemplate(widget: DesFormWidget) {
  let {
    name,
    cancelText,
    confirmText,
    showConfirmButton,
    showCancelButton,
    onConfirmButtonClick,
    onCancelButtonClick
  } = widget.options;
  let onConfirmButtonClickEvent = onConfirmButtonClick
    ? `@click="${name}ConfirmButtonClick`
    : "";
  let onCancelButtonClickEvent = onCancelButtonClick
    ? `@click="${name}CancelButtonClick`
    : "";
  let confirmButtonHtml = showConfirmButton
    ? `<el-button type="primary" ${onConfirmButtonClickEvent}>${confirmText}</el-button>`
    : "";
  let cancelButtonHtml = showCancelButton
    ? `<el-button ${onCancelButtonClickEvent}>${cancelText}</el-button>`
    : "";
  let footerHtml =
    showConfirmButton || showCancelButton
      ? `<template #footer>
        <div>
        ${cancelButtonHtml}
        ${confirmButtonHtml}
        </div>
        </template>`
      : "";
  return footerHtml;
}

export function buildOuterWidget(params: DesFormWidgetParams): string {
  let { widget } = params;
  return outerTemplate[widget.type] && outerTemplate[widget.type](params)
    ? outerTemplate[widget.type](params)
    : "";
}

export function getOuterTemplate(params: DesFormParams) {
  let { widgetList, formConfig } = params;
  let outerTemplateList: string[] = [];
  let outerDefaultValueList: string[] = [];
  widgetList.forEach((widget) => {
    if (OUTER_WIDGET.includes(widget.type)) {
      let template = buildOuterWidget({ widget, formConfig });
      outerTemplateList.push(template);
      outerDefaultValueList.push(`const ${widget.options.name}=ref(false);`);
    }
  });
  return { outerTemplateList, outerDefaultValueList };
}
