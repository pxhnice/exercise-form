<template>
  <container-wrapper
    :widget-data="widgetData"
    :parent-data="parentData"
    :parent-list="parentList"
    :widget-sub="widgetSub"
    :designer="designer"
  >
    <div class="ex-side-drawer" @click.stop="onClick">
      <draggable
        group="componentsGroup"
        ghost-class="ex-ghost"
        handle=".drag-mover"
        class="container-draggable"
        :disabled="isDrag"
        :list="widgetData.children"
        item-key="id"
        :animation="300"
        @add="onDragAdd($event, widgetData)"
      >
        <template #item="{ element, index }">
          <div class="drag-container">
            <template v-if="element.category === 'container'">
              <component
                :is="`${element.type}-widget`"
                :widget-data="element"
                :parent-data="widgetData"
                :designer="designer"
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
    </div>
  </container-wrapper>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { desContainerProps } from "./container";
import { DRAG_DISABLE_LIST, DesFormWidget } from "@exercise-form/core";

const props = defineProps(desContainerProps);

const dragTarget = props.designer.dragTarget;
const isDrag = computed(() =>
  DRAG_DISABLE_LIST.includes(dragTarget.value.type)
);

const onClick = () => {
  props.designer.setSelectWidget(props.widgetData);
};

const onDragAdd = (e: any, parent: DesFormWidget) => {
  let i = e.newIndex;
  if (parent.children) {
    props.designer.setSelectWidget(parent.children[i]);
    props.designer.emitHistoryChange();
  }
};
</script>
