<template>
  <container-wrapper
    :widget-data="widgetData"
    :parent-data="parentData"
    :parent-list="parentList"
    :widget-sub="widgetSub"
    :designer="designer"
  >
    <div style="padding: 2px" @click.stop="onClick">
      <el-table
        :data="widgetData.options.tableData"
        class="ex-data-table"
        @selection-change="changeSelection"
      >
        <template v-for="cols in widgetData.options.tableColumns" :key="cols">
          <el-table-column
            v-if="cols.type === 'index' || cols.type === 'selection'"
            :type="cols.type"
            :align="cols.align ?? 'center'"
            v-bind="cols"
          />
          <el-table-column
            v-if="cols.type === 'expand'"
            :align="cols.align ?? 'center'"
            :type="cols.type"
            v-bind="cols"
            v-slot="scope"
          >
            <component
              v-if="cols.render"
              :is="cols.render"
              :row="scope.row"
              :index="scope.$index"
            />
            <slot
              v-else
              :row="scope.row"
              name="expand"
              :index="scope.$index"
            ></slot>
          </el-table-column>
          <data-table-column-widget
            v-else-if="!cols.type && cols.show"
            :cols="cols"
          >
            <template v-for="slot in Object.keys($slots)" #[slot]="scope">
              <slot :name="slot" v-bind="scope"></slot>
            </template>
          </data-table-column-widget>
        </template>
      </el-table>
    </div>
  </container-wrapper>
</template>

<script setup lang="ts">
import { desContainerProps } from "./container";

const props = defineProps(desContainerProps);

const changeSelection = () => {};
const onClick = () => {
  props.designer.setSelectWidget(props.widgetData);
};
</script>
