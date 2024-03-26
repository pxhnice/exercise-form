import { DesFormWidget, DesFormParams } from "../interface";
import { getOuterTemplate } from "./outer";
import { globalWidgetEvent } from "./event";
import { isArray, isObject, isNumber } from "@exercise-form/utils";
import { getRegExp } from "@exercise-form/constants";
import { MODEL_LIST, HAVE_DATA_KEYS } from "../config";

interface traverseWidgetParams extends DesFormParams {
  cb: (wt: DesFormWidget) => void;
}

export function traverseFieldWidget(params: traverseWidgetParams) {
  let { widgetList, formConfig, cb } = params;
  widgetList.forEach((widget) => {
    cb(widget);
    if (widget.category === "container") {
      traverseFieldWidget({
        widgetList: widget?.children || [],
        formConfig,
        cb
      });
    }
  });
}

export function buildDefaultValueListFn(defaultValueList: string[]) {
  return function (widget: DesFormWidget) {
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
  return function (widget: DesFormWidget) {
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

function buildWidgetDataFn(dataParamsList: string[]) {
  return function (widget: DesFormWidget) {
    let options = widget.options;
    for (const key in options) {
      if (HAVE_DATA_KEYS.includes(key)) {
        dataParamsList.push(
          `const ${options.name}${key}=${JSON.stringify(options[key])}`
        );
      }
    }
  };
}

function buildWidgetEventFn(eventFnList: string[], lifeCycleList: string[]) {
  return function (widget: DesFormWidget) {
    let options = widget.options;
    let { operationButtons, buttonGroups } = options;
    for (const key in options) {
      if (
        options[key] &&
        Object.prototype.hasOwnProperty.call(globalWidgetEvent, key)
      ) {
        let eventFn = globalWidgetEvent[key](widget);
        eventFnList.push(eventFn);
      }
    }
    // TODO:待优化
    if (widget.type === "data-table") {
      if (isArray(operationButtons)) {
        operationButtons.forEach((button) => {
          let { name, onTableColumnClick } = button;
          if (onTableColumnClick) {
            eventFnList.push(
              `const ${name}TableColumnClick=(row)=>{${onTableColumnClick}}`
            );
          }
        });
      }
    }
    if (widget.type === "button-group") {
      if (isArray(buttonGroups)) {
        buttonGroups.forEach((button) => {
          let { name, onClick } = button;
          if (onClick) {
            eventFnList.push(`const ${name}Click=(e)=>{${onClick}}`);
          }
        });
      }
    }
  };
}

export function genVue3JS(params: DesFormParams) {
  let { widgetList, formConfig } = params;
  let defaultValueList: string[] = [];
  let rulesList: string[] = [];
  let dataParamsList: string[] = [];
  let eventFnList: string[] = [];
  let lifeCycleList: string[] = [];
  let { formName, modelName, rulesName } = formConfig;
  traverseFieldWidget({
    widgetList,
    formConfig,
    cb: (widget) => {
      buildDefaultValueListFn(defaultValueList)(widget);
      buildRulesListFn(rulesList)(widget);
      buildWidgetDataFn(dataParamsList)(widget);
      buildWidgetEventFn(eventFnList, lifeCycleList)(widget);
    }
  });
  let { outerDefaultValueList } = getOuterTemplate({ widgetList, formConfig });
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
  ${eventFnList.join("\n")}
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
