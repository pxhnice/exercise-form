<template>
  <div class="ex-data-tree">
    <el-input
      v-if="widgetData.options.showFilter"
      v-model="treeValue"
      prefix-icon="Search"
      clearable
    />
    <div>
      <el-checkbox
        v-if="widgetData.options.showExpandOrRetract"
        v-model="checkboxValue"
        @change="handleExpandOrRetract"
        label="展开/折叠"
      />
      <el-checkbox
        v-if="widgetData.options.showCheckAllOrCancelAll"
        v-model="expandAllValue"
        @change="handleSelectAll"
        label="全选/全不选"
      />
      <el-checkbox
        v-if="widgetData.options.showLinkage"
        v-model="checkStrictly"
        label="父子联动"
      />
    </div>
    <el-tree
      ref="treeRef"
      :check-strictly="!checkStrictly"
      :data="treeData"
      v-bind="widgetData.options"
      :filter-node-method="filterNode"
    >
      <template #default="{ node }">
        <div>{{ node.label }}</div>
        <div
          class="ex-tree-buttons"
          v-if="widgetData.options.showOperationButton"
        >
          <el-button type="primary" link>添加</el-button>
          <el-button type="primary" link>删除</el-button>
        </div>
      </template>
    </el-tree>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { renContainerProps } from "./container";
import { useTree } from "@exercise-form/hooks";

const props = defineProps(renContainerProps);

const treeData = props.widgetData.options.treeData;
const treeValue = ref("");
const checkboxValue = ref(true);
const expandAllValue = ref(false);
const checkStrictly = ref(true);

const treeRef = ref();

watch(treeValue, (val) => {
  treeRef.value!.filter(val);
});

const { handleExpandOrRetract, handleSelectAll, filterNode } = useTree(
  treeRef,
  treeData
);
</script>
