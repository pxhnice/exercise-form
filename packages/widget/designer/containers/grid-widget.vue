<template>
  <container-wrapper
    :widget-data="widgetData"
    :parent-data="parentData"
    :parent-list="parentList"
    :widget-sub="widgetSub"
    :designer="designer"
  >
    <el-row
      class="ex-widget-grid_row"
      v-bind="widgetData.options"
      @click.stop="onClickRow"
    >
      <template v-for="(col, index) in widgetData.children" :key="col.id">
        <grid-col-widget
          :widget-data="col"
          :parent-data="widgetData"
          :parent-list="widgetData.children"
          :widget-sub="index"
          :designer="designer"
        />
      </template>
    </el-row>
  </container-wrapper>
</template>

<script setup lang="ts">
import { desContainerProps } from "./container";

const props = defineProps(desContainerProps);

const onClickRow = () => {
  props.designer.setSelectWidget(props.widgetData);
};
</script>
