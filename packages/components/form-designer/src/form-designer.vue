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
import {
  createDesigner,
  traverseFieldWidget,
  isArray,
  isObject
} from "@exercise-form/utils";
import {
  MODEL_TYPE_LIST,
  DesWidgetConfigType,
  DesWidgetListType
} from "@exercise-form/constants";
import ExFormWidget from "./widget/forms.vue";
import ExSettingPanel from "./panel/setting.vue";
import ExToolbarPanel from "./panel/toolbar.vue";
import ExWidgetPanel from "./panel/widget.vue";
import {
  formDesignerEmits,
  formDesignerProps,
  optionsKeys,
  bannedWidgetKeys
} from "./form-designer";

defineOptions({ name: "ex-form-designer" });
const emits = defineEmits(formDesignerEmits);
const props = defineProps(formDesignerProps);

const formData = ref(props.formData);
const formJson = ref(props.formJson);
const optionsData = ref(props.optionsData);
const bannedWidgets = ref(props.bannedWidgets);
const designer = createDesigner();
designer.initDesigner();
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
  if (isArray(props.formJson.widgetList)) {
    widgetList.value = props.formJson.widgetList;
  }
};

const buildDefaultValueListFn = () => {
  return function (widget: DesWidgetConfigType) {
    if (MODEL_TYPE_LIST.includes(widget.type)) {
      let { modelDefaultValue, name } = widget.options;
      formData.value[name] = modelDefaultValue ?? null;
    }
  };
};

const getFormData = (val: DesWidgetListType) => {
  //触发响应式清除空
  for (const key in formData.value) {
    delete formData.value[key];
  }
  traverseFieldWidget(val, (widget) => {
    buildDefaultValueListFn()(widget);
  });
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

provide(optionsKeys, optionsData);
provide(bannedWidgetKeys, bannedWidgets);

defineExpose({
  widgetList,
  selectWidget,
  formJson
});
</script>
