<template>
  <div style="position: relative" class="ex-widget-operation">
    <div v-if="isSelect" title="手动拖拽" class="ex-title drag-mover">
      <ex-svg-icon
        style="font-size: 14px"
        class="ex-mgr-10"
        name="widget-drag"
      />
      <span class="ex-title-name">{{ widgetData.name }}</span>
    </div>
    <div :class="{ 'ex-is-container-drag': isSelect }">
      <slot></slot>
    </div>
    <div v-if="isSelect" class="ex-operation-row">
      <div title="选中父组件">
        <ex-svg-icon
          @click.stop="handleParentChecked"
          class="ex-icon-ft-16 ex-mgr-10"
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
      <div v-if="widgetData.type === 'table'" title="插入新行">
        <ex-svg-icon
          @click.stop="insertNewRow"
          class="ex-icon-ft-16 ex-mgr-10"
          name="insert-rows"
        />
      </div>
      <div v-if="widgetData.type === 'table'" title="插入新列">
        <ex-svg-icon
          @click.stop="insertNewCol"
          class="ex-icon-ft-16 ex-mgr-10"
          name="insert-column"
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
  let parentList = props.widgetData.children;
  let row = parentList?.length || 1;
  props.designer.insertRow(parentList, row - 1, "down");
};
</script>
