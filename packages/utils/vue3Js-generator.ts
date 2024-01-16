import { getRegExp, MODEL_LIST } from "@exercise-form/constants";

import type {
  DesWidget,
  DesWidgetList,
  DesFormConfig
} from "@exercise-form/constants";

export function traverseFieldWidget(
  widgetList: DesWidgetList,
  cd: (wt: DesWidget) => void
) {
  widgetList.forEach((widget: DesWidget) => {
    if (widget.category === "container") {
      traverseFieldWidget(widget?.children || [], cd);
    } else {
      cd(widget);
    }
  });
}

export function buildDefaultValueListFn(defaultValueList: string[]) {
  return function (widget: DesWidget) {
    if (MODEL_LIST.includes(widget.type)) {
      let modelDefaultValue = widget.options.modelDefaultValue;
      defaultValueList.push(
        `${widget.id}:${modelDefaultValue ? `"${modelDefaultValue}"` : "null"},`
      );
    }
  };
}

function buildRulesListFn(rulesList: string[]) {
  return function (widget: DesWidget) {
    let { required, validation, validationHint } = widget.options;
    if (required || validation) {
      let requiredText = required
        ? `{required:true,
          message:"字段值不可为空"},`
        : "";
      let validationText = validation
        ? `{
            pattern:${getRegExp(validation)}, 
            trigger: ['blur', 'change'],
            message:"${validationHint}"
          }`
        : "";
      let rulesText = `${widget.id}:[${requiredText}${validationText}],`;
      rulesList.push(rulesText);
    }
  };
}

function buildOptionsItemListFn(optionsValueList: string[]) {
  return function (widget: DesWidget) {
    let { optionsItem } = widget.options;
    if (optionsItem) {
      optionsValueList.push(
        `const ${widget.id}Options=${JSON.stringify(optionsItem)}`
      );
    }
  };
}

export function genVue3JS(
  formConfig: DesFormConfig,
  widgetList: DesWidgetList
) {
  let defaultValueList: string[] = [];
  let rulesList: string[] = [];
  let optionsList: string[] = [];
  let { formName, modelName, rulesName } = formConfig;
  traverseFieldWidget(widgetList, (widget) => {
    buildDefaultValueListFn(defaultValueList)(widget);
    buildRulesListFn(rulesList)(widget);
    buildOptionsItemListFn(optionsList)(widget);
  });
  let vue3JSTemplate = `import { ref , reactive  } from "vue"
  const ${formName}=ref();${
    formConfig.isPageType === "dialog" ? "const dialogVisible=ref(false);" : ""
  }
  const state = reactive({
    ${modelName}:{
      ${defaultValueList.join("\n")}
    },
    ${rulesName}:{
      ${rulesList.join("\n")}
    }
  });${optionsList.join("\n")}
  const { ${modelName}, ${rulesName} } = state;${
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
