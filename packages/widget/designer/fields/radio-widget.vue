<template>
  <el-form-item
    :label="widgetData.options.label"
    :required="widgetData.options.required"
    :label-width="widgetData.options.labelWidth"
  >
    <el-radio-group @click.stop v-model="fieldValue">
      <template v-if="widgetData.options.buttonMode">
        <el-radio-button
          v-for="item in widgetData.options.optionsItem"
          :key="item.value"
          :label="item.value"
        >
          {{ item.label }}
        </el-radio-button>
      </template>
      <template v-else>
        <el-radio
          :border="widgetData.options.border"
          :disabled="widgetData.options.disabled"
          v-for="item in widgetData.options.optionsItem"
          :key="item.value"
          :label="item.value"
        >
          {{ item.label }}
        </el-radio>
      </template>
    </el-radio-group>
  </el-form-item>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { desFieldsProps } from "./fields";

const props = defineProps(desFieldsProps);

const fieldValue = ref(props.widgetData.options.modelDefaultValue);

watch(
  () => props.widgetData.options.modelDefaultValue,
  (val) => {
    fieldValue.value = val;
  }
);
</script>
