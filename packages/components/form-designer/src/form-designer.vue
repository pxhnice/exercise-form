<template>
  <form-shell :call-back-fn="desCallBackFn">
    <div class="ex-form-layout">
      <el-container class="ex-layout-container">
        <el-aside class="ex-layout-aside_left">
          <ex-widget-panel
            class="ex-layout-child"
            :designer="designer"
            :widget-list="widgetList"
            :form-config="desFormConfig"
            :select-widget="selectWidget"
            :select-widget-id="selectWidgetId"
            :template-list="templateList"
          />
        </el-aside>
        <el-container>
          <el-header class="ex-layout-header">
            <ex-toolbar-panel
              class="ex-layout-child"
              :designer="designer"
              :widget-list="widgetList"
              :form-config="desFormConfig"
              :select-widget="selectWidget"
              :select-widget-id="selectWidgetId"
            />
          </el-header>
          <el-main class="ex-layout-main">
            <ex-form-widget
              class="ex-layout-child"
              :designer="designer"
              :widget-list="widgetList"
              :form-config="desFormConfig"
            />
          </el-main>
        </el-container>
        <el-aside class="ex-layout-aside_right">
          <ex-setting-panel
            class="ex-layout-child"
            :designer="designer"
            :widget-list="widgetList"
            :form-config="desFormConfig"
            :select-widget="selectWidget"
            :select-widget-id="selectWidgetId"
          />
        </el-aside>
      </el-container>
    </div>
  </form-shell>
</template>

<script setup lang="ts">
import { ref, watch, provide } from "vue";
import {
  themeSwitcher,
  traverseFieldWidget,
  isArray,
  isObject,
  cutNight
} from "@exercise-form/utils";
import { MODEL_LIST, DesWidget, DesWidgetList } from "@exercise-form/constants";
import ExFormWidget from "./widget/forms.vue";
import ExSettingPanel from "./panel/setting.vue";
import ExToolbarPanel from "./panel/toolbar.vue";
import ExWidgetPanel from "./panel/widget.vue";
import FormShell from "./form-shell.vue";
import {
  formDesignerEmits,
  formDesignerProps,
  optionsKeys,
  bannedWidgetKeys,
  darkKeys
} from "./form-designer";
import useDesigner from "./designer";

defineOptions({ name: "ExFormDesigner" });
const emits = defineEmits(formDesignerEmits);
const props = defineProps(formDesignerProps);

const colorEeg = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
const defaultOptions = {
  templateButton: true, //是否显示模版栏
  treeFormButton: true, //是否显示预览表单按钮
  previewFormButton: true, //是否显示预览表单按钮
  exportJsonButton: true, //是否显示导出JSON器按钮
  exportCodeButton: true, //是否显示导出代码按钮
  generateSFCButton: true, //是否显示生成SFC按钮
  pageTypeButton: true, //是否显示导出页面类型按钮
  copyDataButton: true, //是否显示复制按钮
  saveFileButton: true, //是否显示导出文件按钮
  resetFormJson: false //是否初始化重置表单为空
};
const formData = ref(props.formData);
const formJson = ref(props.formJson);
const optionsData = ref(props.options);
optionsData.value = Object.assign(defaultOptions, optionsData.value);
console.log(optionsData.value);
const bannedWidgets = ref(props.bannedWidgets);
const dark = ref(props.dark);
const designer = useDesigner();
designer.initDesigner(optionsData);
const widgetList = designer.widgetList;
const selectWidget = designer.selectWidget;
const selectWidgetId = designer.selectWidgetId;
const desFormConfig = designer.desFormConfig;

const initData = () => {
  if (isObject(props.formJson.formConfig)) {
    desFormConfig.value = Object.assign(
      desFormConfig.value,
      props.formJson.formConfig
    );
  }
  if (isArray(props.formJson.widgetList) && optionsData.value.resetFormJson) {
    widgetList.value = props.formJson.widgetList;
  }
};

const buildDefaultValueListFn = () => {
  return function (widget: DesWidget) {
    if (MODEL_LIST.includes(widget.type)) {
      let { modelDefaultValue, name } = widget.options;
      formData.value[name] = modelDefaultValue ?? null;
    }
  };
};

const getFormData = (val: DesWidgetList) => {
  //触发响应式清除空
  for (const key in formData.value) {
    delete formData.value[key];
  }
  traverseFieldWidget(val, (widget) => {
    buildDefaultValueListFn()(widget);
  });
};

const desCallBackFn = () => {
  let { themeColor, dark } = props;
  if (themeColor && colorEeg.test(themeColor)) {
    themeSwitcher(themeColor);
  }
  if (dark) {
    cutNight(dark);
  }
};

initData();

watch(
  designer.widgetList,
  (val) => {
    formJson.value.widgetList = val;
    getFormData(val);
  },
  { deep: true }
);

watch(desFormConfig.value, (val) => {
  formJson.value.formConfig = val;
});

watch(
  () => props.dark,
  (val) => {
    dark.value = val;
    cutNight(val);
  }
);

watch(
  () => props.themeColor,
  (val) => {
    let color = val && colorEeg.test(val) ? val : "#409EFF";
    themeSwitcher(color);
  }
);

provide(optionsKeys, optionsData);
provide(bannedWidgetKeys, bannedWidgets);
provide(darkKeys, dark);

defineExpose({
  widgetList,
  selectWidget,
  formJson
});
</script>
