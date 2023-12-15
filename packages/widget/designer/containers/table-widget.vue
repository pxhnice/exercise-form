<template>
  <container-wrapper
    :widget-data="widgetData"
    :parent-data="parentData"
    :parent-list="parentList"
    :widget-sub="widgetSub"
    :designer="designer"
  >
    <table
      class="ex-widget-table"
      v-bind="widgetData.options"
      @click.stop="onClickRow"
    >
      <tbody>
        <tr v-for="(row, rowIndex) in widgetData.children" :key="row.id">
          <template v-for="(cell, index) in row.children" :key="cell.id">
            <table-td-widget
              v-if="cell.merged"
              :widget-data="cell"
              :parent-data="widgetData"
              :parent-list="widgetData.children"
              :widget-row="rowIndex"
              :widget-sub="index"
              :row-length="widgetData.children?.length"
              :col-length="row.children?.length"
              :col-list="row.children"
              :designer="designer"
            />
          </template>
        </tr>
      </tbody>
    </table>
  </container-wrapper>
</template>

<script setup lang="ts">
import { desContainerProps } from "./container";

const props = defineProps(desContainerProps);

const onClickRow = () => {
  props.designer.setSelectWidget(props.widgetData);
};
</script>
