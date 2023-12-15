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
        <div title="选中父组件">
          <ex-svg-icon
            @click.stop="handleParentChecked"
            style="font-size: 14px"
            class="ex-mgr-10"
            name="arrow-left"
          />
        </div>
        <div v-if="widgetSub != 0" title="上移">
          <ex-svg-icon
            @click.stop="handleMoveUp"
            class="ex-icon-ft-16 ex-mgr-10"
            name="move-up"
          />
        </div>
        <div v-if="widgetSub < parentList.length - 1" title="下移">
          <ex-svg-icon
            @click.stop="handleMoveDown"
            class="ex-icon-ft-16 ex-mgr-10"
            name="shift-down"
          />
        </div>
        <div title="复制">
          <ex-svg-icon
            @click.stop="handleCopy"
            class="ex-icon-ft-16 ex-mgr-10"
            name="copy"
          />
        </div>
        <div title="删除">
          <ex-svg-icon
            @click.stop="handleDel"
            class="ex-icon-ft-16"
            name="delete"
          />
        </div>
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
