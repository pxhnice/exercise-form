<template>
  <div>
    <el-table
      :style="{ width: widgetData.options.tableWidth }"
      :data="widgetData.options.tableData"
      v-bind="widgetData.options"
      class="ex-data-table"
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
        <ex-data-table-column v-else-if="!cols.type && cols.show" :cols="cols">
          <template v-for="slot in Object.keys($slots)" #[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
          </template>
        </ex-data-table-column>
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
    <el-pagination
      v-if="widgetData.options.showPagination"
      :small="widgetData.options.small"
      :class="paginationAlign"
      :page-sizes="[100, 200, 300, 400]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { renContainerProps } from "./container";
import ExDataTableColumn from "../../components/data-table-column/index.vue";

const props = defineProps(renContainerProps);

const paginationAlign = computed(() => {
  let align = props.widgetData.options.paginationAlign;
  if (align == "left") return "ex-pagination-left";
  if (align == "right") return "ex-pagination-right";
  return "ex-pagination-center";
});
</script>
