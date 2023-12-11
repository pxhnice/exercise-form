<template>
  <!-- <div>启动测试</div> -->
  <!-- <ex-svg-icon name="copy"></ex-svg-icon> -->
  <ex-form-designer
    :form-data="formData"
    :form-json="formJson"
  ></ex-form-designer>
  <!-- <ex-code-editor :height="500" lang="html"></ex-code-editor> -->
</template>
<script lang="ts" setup>
import { reactive } from "vue";
// import { ExFormDesigner } from "../../packages";
const formData = reactive({});
const formJson = reactive({});
</script>
<style>
body {
  height: 100%;
  margin: 0;
}
</style>
