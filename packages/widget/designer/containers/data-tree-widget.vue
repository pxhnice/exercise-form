<template>
  <container-wrapper
    :widget-data="widgetData"
    :parent-data="parentData"
    :parent-list="parentList"
    :widget-sub="widgetSub"
    :designer="designer"
  >
    <div class="ex-data-tree" @click.stop="onClick">
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
  </container-wrapper>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { desContainerProps } from "./container";

interface TreeData {
  id: number;
  label: string;
  children?: TreeData[];
}

const props = defineProps(desContainerProps);

const treeData = props.widgetData.options.treeData as TreeData[];
const treeValue = ref("");
const checkboxValue = ref(true);
const expandAllValue = ref(false);
const checkStrictly = ref(true);

const treeRef = ref();

watch(treeValue, (val) => {
  treeRef.value!.filter(val);
});

const flatColumn = (columns: TreeData[], flatArr: Array<number> = []) => {
  columns.forEach((col) => {
    flatArr.push(col.id);
    if (col.children?.length) {
      flatArr.push(...flatColumn(col.children));
    }
  });
  return flatArr;
};

const onClick = () => {
  props.designer.setSelectWidget(props.widgetData);
};

const handleExpandOrRetract = (value: boolean) => {
  let nodesMap = treeRef.value!.store.nodesMap;
  for (let key in nodesMap) {
    nodesMap[key].expanded = value;
  }
};

const handleSelectAll = (value: boolean) => {
  if (value) {
    let ids = flatColumn(treeData);
    treeRef.value!.setCheckedKeys(ids);
  } else {
    treeRef.value!.setCheckedNodes([]);
  }
};

const filterNode = (value: string, data: TreeData) => {
  if (!value) return true;
  return data.label.includes(value);
};
</script>
