import type { DesWidget, DesFormConfig } from "@exercise-form/constants";
import { buildBasicsTemplate } from "./advanced";
import { getElAttr } from "./property";

// 不需要el-form-item的组件
const staticTypeList = ["text", "alert", "divider", "slot"];

export function buildFieldWidget(widget: DesWidget, formConfig: DesFormConfig) {
  let { customClass, label, labelWidth, align, required } = getElAttr(
    widget,
    formConfig
  );
  let template = buildBasicsTemplate(widget, formConfig);
  if (staticTypeList.includes(widget.type)) {
    return template;
  } else {
    let propAttr = required ? `prop= "${widget.id}"` : "";
    return `<el-form-item ${customClass} ${label} ${propAttr} ${required} ${labelWidth} ${align}>${template}</el-form-item>`;
  }
}
