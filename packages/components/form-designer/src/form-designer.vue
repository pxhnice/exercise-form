<template>
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
</template>

<script setup lang="ts">
import { ref, watch, provide } from "vue";
import { isArray, isObject } from "@exercise-form/utils";
import { MODEL_LIST, DesFormWidget, useDesigner } from "@exercise-form/core";
import { traverseFieldWidget } from "@exercise-form/core/src/generator/vue3Js";
import ExFormWidget from "./widget/forms.vue";
import ExSettingPanel from "./panel/setting.vue";
import ExToolbarPanel from "./panel/toolbar.vue";
import ExWidgetPanel from "./panel/widget.vue";
import {
  formDesignerEmits,
  formDesignerProps,
  optionsKeys,
  bannedWidgetKeys,
  darkKeys
} from "./form-designer";

defineOptions({ name: "ExFormDesigner" });
const emits = defineEmits(formDesignerEmits);
const props = defineProps(formDesignerProps);

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

const dark = ref(props.dark);
const formData = ref(props.formData);
const formJson = ref(props.formJson);
const optionsData = ref(props.options);
const bannedWidgets = ref(props.bannedWidgets);

optionsData.value = Object.assign(defaultOptions, optionsData.value);

const designer = useDesigner();

designer.initDesigner(optionsData.value.resetFormJson);

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
  return function (widget: DesFormWidget) {
    if (MODEL_LIST.includes(widget.type)) {
      let { modelDefaultValue, name } = widget.options;
      formData.value[name] = modelDefaultValue ?? null;
    }
  };
};

const getFormData = (val: DesFormWidget[]) => {
  //触发响应式清除空
  for (const key in formData.value) {
    delete formData.value[key];
  }
  traverseFieldWidget({
    widgetList: val,
    formConfig: desFormConfig.value,
    cb: (widget) => {
      buildDefaultValueListFn()(widget);
    }
  });
};

initData();

watch(
  designer.widgetList,
  (val) => {
    formJson.value.widgetList = val;
    getFormData(val);
    designer.saveFormContentToStorage();
  },
  { deep: true }
);

watch(desFormConfig.value, (val) => {
  formJson.value.formConfig = val;
  designer.saveFormContentToStorage();
});

provide(optionsKeys, optionsData);
provide(bannedWidgetKeys, bannedWidgets);
provide(darkKeys, dark);

defineExpose({
  widgetList,
  selectWidget,
  formJson
});
</script>
@exercise-form/core/src/generator/vue3Js
