<template>
  <el-form-item
    v-if="!isWidget(widgetData.type)"
    class="ex-widget-form_item"
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
      :teleported="false"
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
import { CUSTOM_LIST } from "@exercise-form/constants";
import { renContainerProps } from "./container";

defineProps(renContainerProps);

const isWidget = (type: string) => {
  return CUSTOM_LIST.includes(type);
};
</script>
