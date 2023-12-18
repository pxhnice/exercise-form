<template>
  <ex-form-designer
    dark
    theme-color="#0D4E8D"
    :form-data="formData"
    :form-json="formJson"
  />
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
const formData = ref({ aaa: 1111 });
const formJson = reactive({
  formConfig: {
    size: "default",
    labelPosition: "left",
    align: "left",
    labelWidth: 90,
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
