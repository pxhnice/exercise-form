<template>
  <el-form-item
    :label="widgetData.options.label"
    :required="widgetData.options.required"
    :label-width="widgetData.options.labelWidth"
  >
    <el-checkbox-group @click.stop v-model="fieldValue">
      <template v-if="widgetData.options.buttonMode">
        <el-checkbox-button
          v-for="item in optionsItem"
          :key="item.value"
          :label="item.value"
        >
          {{ item.label }}
        </el-checkbox-button>
      </template>
      <template v-else>
        <el-checkbox
          :border="widgetData.options.border"
          :disabled="widgetData.options.disabled"
          v-for="item in optionsItem"
          :key="item.value"
          :label="item.value"
        >
          {{ item.label }}
        </el-checkbox>
      </template>
    </el-checkbox-group>
  </el-form-item>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { desFieldsProps } from "./fields";

const props = defineProps(desFieldsProps);
const fieldValue = ref(props.widgetData.options.modelDefaultValue);
const optionsItem = ref(props.widgetData.options.optionsItem);

watch(
  () => props.widgetData.options.modelDefaultValue,
  (val) => {
    fieldValue.value = val;
  }
);
</script>
