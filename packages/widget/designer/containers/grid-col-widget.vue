<template>
  <el-col
    class="ex-drag-col"
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
        <div class="ex-drag-container">
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
    <div v-if="isSelect" class="ex-form-operation">
      <div class="title">{{ widgetData.name }}</div>
      <div class="operation-row">
        <div title="选中父组件">
          <ex-svg-icon
            @click.stop="handleParentChecked"
            class="ft"
            name="arrow-left"
          />
        </div>
        <div v-if="widgetSub != 0" title="上移">
          <ex-svg-icon @click.stop="handleMoveUp" class="ft" name="move-up" />
        </div>
        <div v-if="widgetSub < parentList.length - 1" title="下移">
          <ex-svg-icon
            @click.stop="handleMoveDown"
            class="ft"
            name="shift-down"
          />
        </div>
        <div title="复制">
          <ex-svg-icon @click.stop="hanldleCopy" class="ft" name="copy" />
        </div>
        <div title="删除">
          <ex-svg-icon @click.stop="handleDel" class="ft" name="delete" />
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

const hanldleCopy = () => {
  props.designer.copyWidget(props.parentList, props.widgetData);
};

const handleDel = () => {
  props.designer.deleteWidget(props.parentList, props.widgetSub);
};
</script>

<style lang="scss" scoped>
.ex-drag-col {
  display: grid;
  position: relative;
  border: 1px dashed var(--el-color-primary);
  margin: 0px !important;
  min-height: 40px !important;
  padding: 2px 4px !important;
  border-radius: 0px;
  box-sizing: border-box;
}
.ex-container-draggable {
  width: 100%;
  height: 100%;
}
.ex-drag-container {
  margin: 3px 0;
}

.ex-form-operation {
  width: 100%;
  height: 100%;
  .title,
  .operation-row {
    position: absolute;
    padding: 5px;
    color: #fff;
  }
  .title {
    top: 0;
    left: 0;
    z-index: 1;
  }
  .title::before {
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
  .operation-row {
    display: flex;
    right: 0;
    bottom: 0;
    align-items: center;
    background-color: var(--el-color-primary);
  }
  .ft {
    font-size: 16px;
    margin: 0 2px;
  }
}
.ex-is-drag {
  border: 2px solid var(--el-color-primary);
}
</style>
