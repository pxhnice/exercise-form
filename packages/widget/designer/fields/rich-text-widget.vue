<template>
  <el-form-item
    :label="widgetData.options.label"
    :required="widgetData.options.required"
    :label-width="widgetData.options.labelWidth"
  >
    <ex-editor
      :key="editorKey"
      :placeholder="widgetData.options.placeholder"
      :read-only="widgetData.options.readOnly"
    />
  </el-form-item>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import ExEditor from "../../components/editor/index.vue";
import { desFieldsProps } from "./fields";
import { getRandomNumber } from "@exercise-form/utils";

const props = defineProps(desFieldsProps);

const editorKey = ref("edit");

watch(
  () => props.widgetData.options,
  () => {
    editorKey.value = editorKey.value + getRandomNumber();
  },
  { deep: true }
);
</script>
