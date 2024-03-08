<template>
  <el-form-item v-if="isShow(settingData)" label="默认值">
    <component
      :is="`el-${settingData.type}`"
      v-model="optionsModel.modelDefaultValue"
      :type="optionsModel.type"
      :multiple="optionsModel.multiple"
      :format="optionsModel.format"
      :value-format="optionsModel.valueFormat"
      :is-range="optionsModel.isRange"
      placement="left"
      clearable
    />
  </el-form-item>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";
import type { DesWidget } from "@exercise-form/constants";

defineProps(desPropertyProps);

const isShow = (widget: DesWidget) => {
  if (["radio", "checkbox", "select", "tabs"].includes(widget.type))
    return false;
  return true;
};
</script>
