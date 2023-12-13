<template>
  <div class="ex-form-layout">
    <el-container class="ex-layout-container">
      <el-aside class="ex-layout-aside_left">
        <ex-widget-panel
          class="ex-layout-child"
          :designer="designer"
          :widget-list="widgetList"
          :form-config="formConfig"
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
            :form-config="formConfig"
            :select-widget="selectWidget"
            :select-widget-id="selectWidgetId"
          />
        </el-header>
        <el-main class="ex-layout-main">
          <ex-form-widget
            class="ex-layout-child"
            :designer="designer"
            :widget-list="widgetList"
            :form-config="formConfig"
          />
        </el-main>
      </el-container>
      <el-aside class="ex-layout-aside_right">
        <ex-setting-panel
          class="ex-layout-child"
          :designer="designer"
          :widget-list="widgetList"
          :form-config="formConfig"
          :select-widget="selectWidget"
          :select-widget-id="selectWidgetId"
        />
      </el-aside>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from "vue";
import { createDesigner } from "@exercise-form/utils";
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
import "../style/index.scss";

defineOptions({ name: "ex-form-designer" });
const emist = defineEmits(formDesignerEmits);
const props = defineProps(formDesignerProps);

const optionsData = ref(props.optionsData);
const bannedWidgets = ref(props.bannedWidgets);
provide(optionsKeys, optionsData);
provide(bannedWidgetKeys, bannedWidgets);

const designer = createDesigner();
designer.initDesigner();
const widgetList = designer.widgetList;
const selectWidget = designer.selectWidget;
const selectWidgetId = designer.selectWidgetId;
const formConfig = designer.desFormConfig;
// const patternType = designer.patternType;
console.log(props);

defineExpose({
  widgetList,
  selectWidget,
  formConfig
});
</script>
