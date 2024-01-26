import { genVue3JS } from "./vue3Js-generator";
import type { DesWidgetList, DesFormConfig } from "@exercise-form/constants";
import { buildContainerWidget } from "./container";
import { buildFieldWidget } from "./field";
import { getOuterTemplate } from "./outer";

function buildHtmlTemplate(
  widgetList: DesWidgetList,
  formConfig: DesFormConfig,
  templateList: string[] = []
) {
  widgetList.forEach((widget) => {
    if (widget.category === "container") {
      let template = buildContainerWidget(widget, formConfig);
      templateList.push(template);
    } else {
      let template = buildFieldWidget(widget, formConfig);
      templateList.push(template);
    }
  });
  return templateList;
}

function buildFormTemplate(
  widgetList: DesWidgetList,
  formConfig: DesFormConfig
) {
  let { modelName, formName, size, labelPosition, rulesName, labelWidth } =
    formConfig;
  let html = buildHtmlTemplate(widgetList, formConfig);
  let { outerTemplateList } = getOuterTemplate(widgetList, formConfig);
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

function buildFieldTemplate(
  widgetList: DesWidgetList,
  formConfig: DesFormConfig
) {
  let formTemplate = buildFormTemplate(widgetList, formConfig);
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

export function getSFCGenerator(
  formConfig: DesFormConfig,
  widgetList: DesWidgetList
) {
  let html = buildFieldTemplate(widgetList, formConfig);
  let js = genVue3JS(formConfig, widgetList);

  let localStyle = "";
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
  ${localStyle}
  </style>`;
  return sfcTemplate;
}
