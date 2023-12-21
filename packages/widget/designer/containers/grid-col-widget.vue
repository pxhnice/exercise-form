<template>
  <el-col
    class="ex-widget-grid_col"
    :class="{ 'ex-is-drag': isSelect }"
    v-bind="widgetData.options"
    @click.stop="onClickCol"
  >
    <draggable
      group="componentsGroup"
      ghost-class="ex-ghost"
      handle=".drag-mover"
      class="container-draggable"
      :list="widgetData.children"
      item-key="id"
      :animation="300"
      @add="onDragAdd($event, widgetData)"
    >
      <template #item="{ element, index }">
        <div class="ex-widget-container">
          <template v-if="element.category === 'container'">
            <component
              :is="`${element.type}-widget`"
              :widget-data="element"
              :designer="designer"
              :parent-data="widgetData"
              :parent-list="widgetData.children"
              :widget-sub="index"
              :key="element.id"
            />
          </template>
          <template v-else>
            <form-item-widget
              :designer="designer"
              :widget-data="element"
              :parent-data="widgetData"
              :parent-list="widgetData.children"
              :widget-sub="index"
              :key="element.id"
            />
          </template>
        </div>
      </template>
    </draggable>
    <div v-if="isSelect" class="ex-widget-operation">
      <div class="ex-title">{{ widgetData.name }}</div>
      <div class="ex-operation-row">
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
  </el-col>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { desContainerProps } from "./container";

const props = defineProps(desContainerProps);

const parentList = ref(props.parentList);

const isSelect = computed(
  () => props.designer.selectWidgetId.value == props.widgetData.id
);

const handleParentChecked = () => {
  props.designer.setSelectWidget(props.parentData);
};

const onClickCol = () => {
  props.designer.setSelectWidget(props.widgetData);
};

const onDragAdd = (e: any, parent: any) => {
  let i = e.newIndex;
  if (parent.children) {
    props.designer.setSelectWidget(parent.children[i]);
    props.designer.emitHistoryChange();
  }
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
</script>
