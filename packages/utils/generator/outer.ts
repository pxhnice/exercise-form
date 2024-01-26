import { buildFieldWidget } from "./field";
import { getElAttr } from "./property";
import { buildContainerWidget } from "./container";

import type { DesWidget, DesFormConfig } from "@exercise-form/constants";

type DesTemplateMethod = {
  [key: string]: (widget: DesWidget, formConfig: DesFormConfig) => string;
};

const outerTemplate: DesTemplateMethod = {
  "side-drawer": (widget, formConfig) => {
    let { name } = widget.options;
    let {
      closeOnClickModal,
      closeOnPressEscape,
      modal,
      showClose,
      title,
      size
    } = getElAttr(widget, formConfig);
    let modelValue = `v-model="${name}"`;
    let footerHtml = footerTemplate(widget);
    return `
    <el-drawer ${title} ${modelValue} ${size} ${showClose} ${modal} ${closeOnClickModal} ${closeOnPressEscape}>
    ${
      widget.children &&
      widget.children
        .map((child) => {
          if (child.category === "container") {
            return buildContainerWidget(child, formConfig);
          } else {
            return buildFieldWidget(child, formConfig);
          }
        })
        .join("\n")
    }
    ${footerHtml}
    </el-drawer>
    `;
  },
  "popup-box": (widget, formConfig) => {
    let { name } = widget.options;
    let {
      closeOnClickModal,
      closeOnPressEscape,
      modal,
      showClose,
      title,
      width
    } = getElAttr(widget, formConfig);
    let modelValue = `v-model="${name}"`;
    let footerHtml = footerTemplate(widget);
    return `
    <el-dialog ${width} ${title} ${modelValue} ${modal} ${showClose} ${closeOnClickModal} ${closeOnPressEscape}>
    ${
      widget.children &&
      widget.children
        .map((child) => {
          if (child.category === "container") {
            return buildContainerWidget(child, formConfig);
          } else {
            return buildFieldWidget(child, formConfig);
          }
        })
        .join("\n")
    }
    ${footerHtml}
    </el-dialog>
    `;
  }
};

function footerTemplate(widget: DesWidget) {
  let { cancelText, confirmText, showConfirmButton, showCancelButton } =
    widget.options;
  let confirmButtonHtml = showConfirmButton
    ? `<el-button type="primary">${confirmText}</el-button>`
    : "";
  let cancelButtonHtml = showCancelButton
    ? `<el-button>${cancelText}</el-button>`
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

function buildOuterWidget(
  widget: DesWidget,
  formConfig: DesFormConfig
): string {
  return outerTemplate[widget.type] &&
    outerTemplate[widget.type](widget, formConfig)
    ? outerTemplate[widget.type](widget, formConfig)
    : "";
}

function traverseOuterWidget(
  widgetList: DesWidget[],
  formConfig: DesFormConfig,
  cd: (wt: DesWidget, formConfig: DesFormConfig) => void
) {
  widgetList.forEach((widget) => {
    cd(widget, formConfig);
  });
}

function buildOuterTemplate(templateList: string[]) {
  return function (widget: DesWidget, formConfig: DesFormConfig) {
    let template = buildOuterWidget(widget, formConfig);
    templateList.push(template);
  };
}

function buildOuterDefaultValue(defaultValueList: string[]) {
  return function (widget: DesWidget) {
    defaultValueList.push(`const ${widget.options.name}=ref(false);`);
  };
}

export function getOuterTemplate(
  widgetList: DesWidget[],
  formConfig: DesFormConfig
) {
  let outerTemplateList: string[] = [];
  let outerDefaultValueList: string[] = [];
  traverseOuterWidget(widgetList, formConfig, (widget) => {
    buildOuterTemplate(outerTemplateList)(widget, formConfig);
    buildOuterDefaultValue(outerDefaultValueList)(widget);
  });
  return { outerTemplateList, outerDefaultValueList };
}
