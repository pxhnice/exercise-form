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
        style="margin-bottom: 40px"
        :data="widgetData.options.tableData"
        v-bind="widgetData.options"
        class="ex-data-table"
        @selection-change="changeSelection"
      >
        <el-table-column
          v-if="widgetData.options.showIndex"
          label="序号"
          width="60"
          align="center"
          type="index"
        />
        <el-table-column
          v-if="widgetData.options.showCheckBox"
          width="60"
          align="center"
          type="selection"
        />
        <template v-for="cols in widgetData.options.tableColumns" :key="cols">
          <el-table-column
            v-if="cols.type === 'expand'"
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
        <el-table-column
          v-if="widgetData.options.showOperation"
          :align="widgetData.options.operationAlign"
          :label="widgetData.options.operationLabel"
          :width="widgetData.options.operationWidth"
          :fixed="
            widgetData.options.operationFixed != ''
              ? widgetData.options.operationFixed
              : undefined
          "
        >
          <template #default>
            <el-button
              v-for="(btn, index) of widgetData.options.operationButtons"
              :key="index"
              v-bind="btn"
            >
              {{ btn.label }}
            </el-button>
          </template>
        </el-table-column>
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
