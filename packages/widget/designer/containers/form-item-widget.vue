<template>
  <container-wrapper
    :widget-data="widgetData"
    :parent-data="parentData"
    :parent-list="parentList"
    :widget-sub="widgetSub"
    :designer="designer"
  >
    <el-form-item
      v-if="!isWidget(widgetData.type)"
      class="ex-item"
      :label="widgetData.options.label"
      :required="widgetData.options.required"
      :label-width="widgetData.options.labelWidth"
      @click.stop="onClickItem"
    >
      <component
        v-if="widgetData.type"
        @click.stop
        :is="`el-${widgetData.type}`"
        v-model="fieldValue"
        v-bind="widgetData.options"
      />
      <slot v-else></slot>
    </el-form-item>
    <component
      v-else
      :is="`${widgetData.type}-widget`"
      :widget-data="widgetData"
      @click.stop="onClickItem"
    />
  </container-wrapper>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { CUSTOM_DATA } from "@exercise-form/constants";
import { desContainerProps } from "./container";

const props = defineProps(desContainerProps);

const fieldValue: any = ref(null);

watch(
  () => props.widgetData.options?.modelFefaultValue,
  (val) => {
    fieldValue.value = val;
  },
  { immediate: true }
);

const isWidget = (type: any) => {
  return CUSTOM_DATA.includes(type);
};

const onClickItem = () => {
  props.designer.setSelectWidget(props.widgetData);
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
