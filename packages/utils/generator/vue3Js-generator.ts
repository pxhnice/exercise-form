import { getRegExp, MODEL_LIST } from "@exercise-form/constants";
import type { DesWidget, DesFormConfig } from "@exercise-form/constants";
import { getOuterTemplate } from "./outer";
import { isArray, isObject, isNumber } from "../types";

// 数据参数属性
const paramsKeys = [
  "data",
  "headers",
  "tableData",
  "treeData",
  "optionsItem",
  "options"
];

export function traverseFieldWidget(
  widgetList: DesWidget[],
  cd: (wt: DesWidget) => void
) {
  widgetList.forEach((widget: DesWidget) => {
    cd(widget);
    if (widget.category === "container") {
      traverseFieldWidget(widget?.children || [], cd);
    }
  });
}

export function buildDefaultValueListFn(defaultValueList: string[]) {
  return function (widget: DesWidget) {
    if (MODEL_LIST.includes(widget.type)) {
      let modelDefaultValue = widget.options.modelDefaultValue;
      let value;
      if (
        isArray(modelDefaultValue) ||
        isObject(modelDefaultValue) ||
        isNumber(modelDefaultValue)
      ) {
        value = JSON.stringify(modelDefaultValue);
      } else {
        value = modelDefaultValue ? `"${modelDefaultValue}"` : "null";
      }
      defaultValueList.push(`${widget.options.name}:${value},`);
    }
  };
}

function buildRulesListFn(rulesList: string[]) {
  return function (widget: DesWidget) {
    if (widget.category != "container") {
      let { required, validation, validationHint } = widget.options;
      if (required || validation) {
        let message = validationHint ? validationHint : "字段值不可为空";
        let requiredText = required
          ? `{required:true,
          message:"${message}"},`
          : "";
        let validationText = validation
          ? `{
            pattern:${getRegExp(validation)}, 
            trigger: ['blur', 'change'],
            message:"${message}"
          }`
          : "";
        let rulesText = `${widget.id}:[${requiredText}${validationText}],`;
        rulesList.push(rulesText);
      }
    }
  };
}

function buildDataParams(dataParamsList: string[]) {
  return function (widget: DesWidget) {
    let options = widget.options;
    for (const key in options) {
      if (paramsKeys.includes(key)) {
        dataParamsList.push(
          `const ${options.name}${key}=${JSON.stringify(options[key])}`
        );
      }
    }
  };
}

export function genVue3JS(formConfig: DesFormConfig, widgetList: DesWidget[]) {
  let defaultValueList: string[] = [];
  let rulesList: string[] = [];
  let dataParamsList: string[] = [];
  let { formName, modelName, rulesName } = formConfig;
  traverseFieldWidget(widgetList, (widget) => {
    buildDefaultValueListFn(defaultValueList)(widget);
    buildRulesListFn(rulesList)(widget);
    buildDataParams(dataParamsList)(widget);
  });
  let { outerDefaultValueList } = getOuterTemplate(widgetList, formConfig);
  let vue3JSTemplate = `import { ref, reactive } from 'vue';
  const ${formName}=ref();${
    formConfig.isPageType === "dialog" ? "const dialogVisible=ref(false);" : ""
  }
  ${outerDefaultValueList.join("\n")};
  const state = reactive({
    ${modelName}:{
      ${defaultValueList.join("\n")}
    },
    ${rulesName}:{
      ${rulesList.join("\n")}
    }
  });
  const { ${modelName}, ${rulesName} } = state;
  ${dataParamsList.join("\n")}
  ${
    formConfig.isPageType === "dialog"
      ? "const open = (params) => {dialogVisible.value=true};const close=()=>{dialogVisible.value=false};"
      : ""
  }
  const handleSubmit = () => {
    if (!${formName}.value) return;
    ${formName}.value.validate((valid) => {
      if (valid) {
        console.log("submit!");
      } else {
        console.log("error submit!");
      }
    });
  };
  const handleReset = () => {
    if (!${formName}.value) return;
    ${formName}.value.resetFields();
  }
  ${formConfig.isPageType === "dialog" ? "defineExpose({ open });" : ""}
  `;
  return vue3JSTemplate;
}
