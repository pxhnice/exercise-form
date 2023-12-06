<template>
  <div class="ex-form-layout">
    <el-container class="ex-layout-container">
      <el-aside class="ex-layout-aside_left">
        <ex-widget-panel class="ex-layout-child" />
      </el-aside>
      <el-container>
        <el-header class="ex-layout-header">
          <ex-toolbar-panel class="ex-layout-child" />
        </el-header>
        <el-main class="ex-layout-main">
          <ex-form-widget class="ex-layout-child" />
        </el-main>
      </el-container>
      <el-aside class="ex-layout-aside_right">
        <ex-setting-panel class="ex-layout-child" />
      </el-aside>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import ExFormWidget from "./widget/forms.vue";
import ExSettingPanel from "./panel/setting.vue";
import ExToolbarPanel from "./panel/toolbar.vue";
import ExWidgetPanel from "./panel/widget.vue";
import { formDesignerEmits, formDesignerProps } from "./form-designer";
import "../style/index.scss";

defineOptions({ name: "ex-form-designer" });
const emist = defineEmits(formDesignerEmits);
const props = defineProps(formDesignerProps);

console.log(props);
</script>
