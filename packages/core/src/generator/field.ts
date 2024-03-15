/**
 * @description 构建el-form-item模板
 */

import { DesFormWidgetParams } from "../interface";
import { buildBasicsTemplate } from "./basics";
import { getElAttr } from "./property";
import { SHADOW_LIST } from "../config";

export function buildFieldWidget(params: DesFormWidgetParams) {
  let { widget } = params;
  let { customClass, label, labelWidth, align, required, onValidate } =
    getElAttr(params);
  let template = buildBasicsTemplate(params);
  if (SHADOW_LIST.includes(widget.type)) {
    return template;
  } else {
    let propAttr = required ? `prop= "${widget.id}"` : "";
    return `<el-form-item ${customClass} ${label} ${propAttr} ${required} 
    ${labelWidth} ${align} ${onValidate}>${template}</el-form-item>`;
  }
}
