<template>
  <div style="position: relative" class="ex-widget-operation">
    <div v-if="isSelect" title="手动拖拽" class="ex-title drag-mover">
      <el-icon class="ex-mgr-10" :size="14">
        <ex-icon-widget-drag />
      </el-icon>
      <span class="ex-title-name">{{ widgetData.name }}</span>
      <el-icon class="ex-mgl-10" v-if="widgetData.options?.hidden">
        <Hide />
      </el-icon>
    </div>
    <div :class="{ 'ex-is-container-drag': isSelect }">
      <slot></slot>
    </div>
    <div v-if="isSelect" class="ex-operation-row">
      <el-icon
        title="选中父组件"
        class="ex-mgr-10"
        @click.stop="handleParentChecked"
        :size="16"
      >
        <ex-icon-arrow-left />
      </el-icon>
      <el-icon
        v-if="widgetSub != 0"
        title="上移"
        class="ex-mgr-10"
        @click.stop="handleMoveUp"
        :size="16"
      >
        <ex-icon-move-up />
      </el-icon>
      <el-icon
        v-if="widgetSub < parentList.length - 1"
        title="下移"
        class="ex-mgr-10"
        @click.stop="handleMoveDown"
        :size="16"
      >
        <ex-icon-shift-down />
      </el-icon>
      <el-icon
        v-if="widgetData.type === 'table'"
        title="插入新行"
        class="ex-mgr-10"
        @click.stop="insertNewRow"
        :size="16"
      >
        <ex-icon-insert-rows />
      </el-icon>
      <el-icon
        v-if="widgetData.type === 'table'"
        title="插入新列"
        class="ex-mgr-10"
        @click.stop="insertNewCol"
        :size="16"
      >
        <ex-icon-insert-column />
      </el-icon>
      <el-icon
        title="复制"
        class="ex-mgr-10"
        @click.stop="handleCopy"
        :size="16"
      >
        <ex-icon-copy />
      </el-icon>
      <el-icon
        title="删除"
        class="ex-mgr-10"
        @click.stop="handleDel"
        :size="18"
      >
        <ex-icon-delete />
      </el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { desContainerProps } from "./container";

const props = defineProps(desContainerProps);

const isSelect = computed(
  () => props.designer.selectWidgetId.value == props.widgetData.id
);

const handleParentChecked = () => {
  props.designer.setSelectWidget(props.parentData);
};

const handleMoveUp = () => {
  props.designer.moveUpWidget(props.parentList, props.widgetSub);
};

const handleMoveDown = () => {
  props.designer.moveDownWidget(props.parentList, props.widgetSub);
};

const handleCopy = () => {
  props.designer.copyWidget(props.parentList, props.widgetData);
};

const handleDel = () => {
  props.designer.deleteWidget(props.parentList, props.widgetSub);
};

const insertNewCol = () => {
  let parentList = props.widgetData.children || [];
  let cell = parentList[0].children?.length || 1;
  props.designer.insertCell(parentList, cell - 1, "right");
};

const insertNewRow = () => {
  let parentList = props.widgetData.children ?? [];
  let row = parentList?.length || 1;
  props.designer.insertRow(parentList, row - 1, "down");
};
</script>
