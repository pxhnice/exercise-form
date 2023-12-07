import { getRegExp, MODEL_TYPE_LIST } from "@exercise-form/constants";

type WidgetConfigType = {
  name: string;
  iconName?: string;
  category?: string;
  type: string;
  // children?: Array<WidgetConfigType>;
  options: { [key: string]: any };
  [key: string]: any;
};

interface DesignerFormConfigType {
  cssCode: string;
  [key: string]: any;
}

export function traverseFieldWidget(
  widgetList: WidgetConfigType[],
  cd: (wt: WidgetConfigType) => void
) {
  widgetList.forEach((widget: WidgetConfigType) => {
    if (widget.category === "container") {
      traverseFieldWidget(widget.children, cd);
    } else {
      cd(widget);
    }
  });
}

export function buildDefalutValueListFn(defaultValueList: [string]) {
  return function (widget: WidgetConfigType) {
    if (MODEL_TYPE_LIST.includes(widget.type)) {
      let modelFefaultValue = widget.options.modelFefaultValue;
      defaultValueList.push(
        `${widget.id}:${modelFefaultValue ? `"${modelFefaultValue}"` : "null"},`
      );
    }
  };
}

function buildRulesListFn(rulesList: [string]) {
  return function (widget: WidgetConfigType) {
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

function buildOptionsItemListFn(optionsValueList: [string]) {
  return function (widget: WidgetConfigType) {
    let { optionsItem } = widget.options;
    if (optionsItem) {
      optionsValueList.push(
        `const ${widget.id}Options=${JSON.stringify(optionsItem)}`
      );
    }
  };
}

export function genVue3JS(
  formConfig: DesignerFormConfigType,
  widgetList: WidgetConfigType[]
) {
  let defaultValueList: any = [];
  let rulesList: any = [];
  let optionsList: any = [];
  let { formName, modelName, rulesName } = formConfig;
  traverseFieldWidget(widgetList, (widget: WidgetConfigType) => {
    buildDefalutValueListFn(defaultValueList)(widget);
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
      ? "const open = (params) => {dialogVisible.value=true};const close=()=>{dialogVisible.value=false}"
      : ""
  }
  const handleSubmit = () => {
    if (!${formName}.value) return;
    ${formName}.value.validate((valid) => {
      //提交表单
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
  ${
    formConfig.isPageType === "dialog"
      ? "// 暴露方法\n defineExpose({ open });"
      : ""
  }
  `;
  return vue3JSTemplate;
}
