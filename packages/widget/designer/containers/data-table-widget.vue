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
        :style="{ width: widgetData.options.tableWidth }"
        :data="widgetData.options.tableData"
        v-bind="widgetData.options"
        :hidden="false"
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
          <ex-data-table-column
            v-else-if="!cols.type && cols.show"
            :cols="cols"
          >
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
      <el-scrollbar v-if="widgetData.options.showPagination">
        <el-pagination
          :small="widgetData.options.small"
          :class="paginationAlign"
          v-model:page-size="widgetData.options.pagination.pageSize"
          :page-sizes="widgetData.options.pagination.pageSizes"
          layout="total, sizes, prev, pager, next, jumper"
          :total="widgetData.options.pagination.total"
        />
      </el-scrollbar>
    </div>
  </container-wrapper>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { desContainerProps } from "./container";
import ExDataTableColumn from "../../components/data-table-column/index.vue";

const props = defineProps(desContainerProps);

const paginationAlign = computed(() => {
  let align = props.widgetData.options.paginationAlign;
  if (align == "left") return "ex-pagination-left";
  if (align == "right") return "ex-pagination-right";
  return "ex-pagination-center";
});

const changeSelection = () => {};
const onClick = () => {
  props.designer.setSelectWidget(props.widgetData);
};
</script>
