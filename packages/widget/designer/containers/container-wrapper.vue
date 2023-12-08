<template>
  <div class="ex-form-operation">
    <div v-if="isSelect" title="手动拖拽" class="ex-title drag-mover">
      <ex-svg-icon class="ex-ft" name="widget-drag" />
      <span class="ex-title-name">{{ widgetData.name }}</span>
    </div>
    <div :class="{ 'ex-is-container-drag': isSelect }">
      <slot></slot>
    </div>
    <div v-if="isSelect" class="ex-operation-row">
      <div title="选中父组件">
        <ex-svg-icon
          @click.stop="handleParentChecked"
          class="ex-ft"
          name="arrow-left"
        />
      </div>
      <div v-if="widgetSub != 0" title="上移">
        <ex-svg-icon @click.stop="handleMoveUp" class="ex-ft" name="move-up" />
      </div>
      <div v-if="widgetSub < parentList.length - 1" title="下移">
        <ex-svg-icon
          @click.stop="handleMoveDown"
          class="ex-ft"
          name="shift-down"
        />
      </div>
      <div v-if="widgetData.type === 'table'" title="插入新行">
        <ex-svg-icon
          @click.stop="insertNewRow"
          class="ex-ft"
          name="insert-rows"
        />
      </div>
      <div v-if="widgetData.type === 'table'" title="插入新列">
        <ex-svg-icon
          @click.stop="insertNewCol"
          class="ex-ft"
          name="insert-column"
        />
      </div>
      <div title="复制">
        <ex-svg-icon @click.stop="hanldleCopy" class="ex-ft" name="copy" />
      </div>
      <div title="删除">
        <ex-svg-icon @click.stop="handleDel" class="ex-ft" name="delete" />
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

const hanldleCopy = () => {
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

<style lang="scss" scoped>
.ex-form-operation {
  width: 100%;
  height: 100%;
  position: relative;
  .ex-title,
  .ex-operation-row {
    position: absolute;
    padding: 2px 5px;
    color: #fff;
  }
  .ex-title {
    top: 0;
    left: 0;
    cursor: move;
    z-index: 11;
  }
  .ex-title::before {
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: var(--el-color-primary);
    opacity: 0.8;
    z-index: -1;
  }
  .ex-operation-row {
    display: flex;
    right: 0;
    bottom: 0;
    align-items: center;
    background-color: var(--el-color-primary);
  }
  .ex-ft {
    font-size: 16px;
    margin: 0 5px;
  }
  .ex-title-name {
    font-size: 14px;
  }
}
.ex-is-container-drag {
  position: relative;
}
.ex-is-container-drag::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  width: 100%;
  height: 100%;
  border: 2px solid var(--el-color-primary) !important;
}
</style>
