<template>
  <!-- <div>启动测试</div> -->
  <!-- <ex-svg-icon name="copy"></ex-svg-icon> -->
  <div>{{ formData }}</div>
  <div>{{ formJson }}</div>
  <ex-form-designer
    style="width: 100%; height: 800px"
    :form-data="formData"
    :form-json="formJson"
  ></ex-form-designer>
  <!-- <ex-code-editor :height="500" lang="html"></ex-code-editor> -->
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
// import { ExFormDesigner } from "../../packages";
const formData = ref({ aaa: 1111 });
const formJson = reactive({
  formConfig: {
    size: "default",
    labelPosition: "left",
    align: "left",
    labelWidth: 120,
    modelName: "formData",
    formName: "formRef",
    rulesName: "rules",
    patternType: "pc",
    isPageType: "page",
    hideRequiredAsterisk: false,
    cssCode: "",
    customClass: []
  },
  widgetList: [
    {
      name: "栅格",
      iconName: "grid",
      category: "container",
      type: "grid",
      children: [
        {
          name: "栅格列",
          iconName: "",
          type: "grid-col",
          category: "container",
          children: [],
          options: {
            customClass: "",
            hidden: false,
            name: "grid-col_bnny8",
            span: 12,
            offset: 0,
            push: 0,
            pull: 0
          },
          id: "grid-col_bnny8"
        },
        {
          name: "栅格列",
          iconName: "",
          type: "grid-col",
          category: "container",
          children: [],
          options: {
            customClass: "",
            hidden: false,
            name: "grid-col_uj6t7",
            span: 12,
            offset: 0,
            push: 0,
            pull: 0
          },
          id: "grid-col_uj6t7"
        }
      ],
      options: {
        colHeight: "",
        customClass: "",
        gutter: 10,
        hidden: false,
        name: "gridxa6vh",
        style: {
          minHeight: "40px"
        }
      },
      id: "gridxa6vh"
    }
  ]
});
</script>
<style>
body {
  height: 100%;
  margin: 0;
}
</style>
