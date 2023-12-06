<template>
  <el-form-item
    v-if="!isWidget(widgetData.type)"
    class="ex-item"
    :label="widgetData.options.label"
    :required="widgetData.options.required"
    :label-width="widgetData.options.labelWidth"
    @click.prevent
  >
    <component
      v-if="widgetData.type"
      @click.stop
      :is="`el-${widgetData.type}`"
      v-model="formData[widgetData.id]"
      v-bind="widgetData.options"
    />
    <slot v-else></slot>
  </el-form-item>
  <component
    v-else
    :is="`${widgetData.type}-widget`"
    :widget-data="widgetData"
    @click.stop
  />
</template>

<script setup lang="ts">
import { CUSTOM_DATA } from "@exercise-form/constants";
import { renContainerProps } from "./container";

defineProps(renContainerProps);

const isWidget = (type: any) => {
  return CUSTOM_DATA.includes(type);
};
</script>

<style lang="scss" scoped>
.ex-item {
  padding: 1px;
}
:deep(.el-form-item__content) {
  padding: 2px;
}
</style>
