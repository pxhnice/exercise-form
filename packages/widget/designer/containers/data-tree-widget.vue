<template>
  <container-wrapper
    :widget-data="widgetData"
    :parent-data="parentData"
    :parent-list="parentList"
    :widget-sub="widgetSub"
    :designer="designer"
  >
    <div class="ex-data-tree" @click.stop="onClick">
      <el-input v-model="treeValue" prefix-icon="Search" clearable />
      <el-tree
        ref="treeRef"
        :data="widgetData.options.treeData"
        :props="widgetData.options.props"
        :draggable="widgetData.options.draggable"
        :show-checkbox="widgetData.options.showCheckbox"
        :default-expand-all="widgetData.options.defaultExpandAll"
        :lazy="widgetData.options.lazy"
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
      />
    </div>
  </container-wrapper>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { ElTreeV2 } from "element-plus";
import type { Tree } from "@exercise-form/constants";
import { desContainerProps } from "./container";

const props = defineProps(desContainerProps);

const treeValue = ref("");
const treeRef = ref<InstanceType<typeof ElTreeV2>>();

watch(treeValue, (val) => {
  treeRef.value!.filter(val);
});

const onClick = () => {
  props.designer.setSelectWidget(props.widgetData);
};

const filterNode = (value: string, data: Tree) => {
  if (!value) return true;
  return data.label.includes(value);
};

const handleNodeClick = (data: Tree) => {
  console.log(data);
};
</script>
