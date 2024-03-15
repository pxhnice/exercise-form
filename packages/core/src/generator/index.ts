/**
 * @description 导出SFC模板
 */

import { genVue3JS } from "./vue3Js";
import { DesFormParams } from "../interface";
import { buildContainerWidget } from "./container";
import { buildFieldWidget } from "./field";
import { getOuterTemplate } from "./outer";
import { getStyleTemplate } from "./style";

function buildHtmlTemplate(params: DesFormParams) {
  let { widgetList, formConfig } = params;
  let templateList: string[] = [];
  widgetList.forEach((widget) => {
    if (widget.category === "container") {
      let template = buildContainerWidget({ widget, formConfig });
      templateList.push(template);
    } else {
      let template = buildFieldWidget({ widget, formConfig });
      templateList.push(template);
    }
  });
  return templateList;
}

function buildFormTemplate(params: DesFormParams) {
  let { formConfig } = params;
  let { modelName, formName, size, labelPosition, rulesName, labelWidth } =
    formConfig;
  let html = buildHtmlTemplate(params);
  let { outerTemplateList } = getOuterTemplate(params);
  let sizeAttr = size !== "default" ? `size="${size}"` : "";
  let labelPositionAttr =
    labelPosition && labelPosition != "right"
      ? `label-position="${labelPosition}"`
      : "";
  return ` <el-form ref="${formName}" :model="${modelName}" :rules="${rulesName}" ${sizeAttr}
  ${labelPositionAttr} label-width="${labelWidth}">
  ${html.join("\n")} ${outerTemplateList.join("\n")}
  </el-form> `;
}

function buildFieldTemplate(params: DesFormParams) {
  let { formConfig } = params;
  let formTemplate = buildFormTemplate(params);
  if (formConfig.isPageType === "page") {
    return `${formTemplate}`;
  } else {
    return `<el-dialog v-model="dialogVisible" @open="open" @close="close" title="Dialog Title">${formTemplate}
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handleReset">重置表单</el-button>
        <el-button type="primary" @click="handleSubmit" >确认</el-button>
        </span>
      </template>
    </el-dialog>`;
  }
}

export function getSFCGenerator(params: DesFormParams) {
  let { formConfig } = params;
  let html = buildFieldTemplate(params);
  let js = genVue3JS(params);
  let style = getStyleTemplate(params);
  let sfcTemplate = `
  <template>
  ${html}
  </template>

  <script setup>
  ${js}
  </script>

  <style>
  ${formConfig.cssCode}
  </style> 

  <style lang="scss" scoped>
  ${style}
  </style>`;
  return sfcTemplate;
}
