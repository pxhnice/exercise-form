<template>
  <container-wrapper
    :widget-data="widgetData"
    :parent-data="parentData"
    :parent-list="parentList"
    :widget-sub="widgetSub"
    :designer="designer"
  >
    <div style="padding: 2px; box-sizing: border-box" @click="onClick">
      <el-button-group
        :type="widgetData.options.type"
        :size="widgetData.options.size"
      >
        <el-button
          v-for="btn of widgetData.options.buttonGroups"
          :key="btn.name"
          v-bind="btn"
          >{{ btn.label }}
        </el-button>
      </el-button-group>
    </div>
  </container-wrapper>
</template>

<script setup lang="ts">
import { desContainerProps } from "./container";

const props = defineProps(desContainerProps);

const onClick = () => {
  props.designer.setSelectWidget(props.widgetData);
};
</script>
