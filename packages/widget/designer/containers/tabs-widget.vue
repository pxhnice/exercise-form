<template>
  <container-wrapper
    :widget-data="widgetData"
    :parent-data="parentData"
    :parent-list="parentList"
    :widget-sub="widgetSub"
    :designer="designer"
  >
    <el-tabs
      v-model="selectValue"
      class="ex-widget-tabs"
      v-bind="widgetData.options"
      :hidden="false"
      @click.stop="onClickTabs"
    >
      <div style="display: flex" :key="componentKey">
        <el-tab-pane
          class="ex-drag-tab-pane"
          v-for="tab in widgetData.children"
          :key="tab.id"
          v-bind="tab.options"
        >
          <draggable
            group="componentsGroup"
            ghost-class="ex-ghost"
            handle=".drag-mover"
            class="container-draggable"
            :disabled="isDrag"
            :list="tab.children"
            item-key="id"
            :animation="300"
            @add="onDragAdd($event, tab)"
          >
            <template #item="{ element, index }">
              <div class="ex-widget-container">
                <template v-if="element.category === 'container'">
                  <component
                    :is="`${element.type}-widget`"
                    :designer="designer"
                    :widget-data="element"
                    :parent-data="widgetData"
                    :parent-list="tab.children"
                    :widget-sub="index"
                    :key="element.id"
                  />
                </template>
                <template v-else>
                  <form-item-widget
                    :designer="designer"
                    :widget-data="element"
                    :parent-data="widgetData"
                    :parent-list="tab.children"
                    :widget-sub="index"
                    :key="element.id"
                  />
                </template>
              </div>
            </template>
          </draggable>
        </el-tab-pane>
      </div>
    </el-tabs>
  </container-wrapper>
</template>

<script setup lang="ts">
import { ref, watch, computed, nextTick } from "vue";
import { desContainerProps } from "./container";
import { DRAG_DISABLE_LIST, DesFormWidget } from "@exercise-form/core";

const props = defineProps(desContainerProps);

const selectValue = ref("tab1");
const componentKey = ref(0);
const dragTarget = props.designer.dragTarget;
const isDrag = computed(() =>
  DRAG_DISABLE_LIST.includes(dragTarget.value.type)
);

watch(
  () => props.widgetData.options.modelDefaultValue,
  (val) => {
    if (val) {
      selectValue.value = val;
    } else {
      getActivateName();
    }
  }
);

watch(
  () => props.widgetData?.children,
  () => {
    nextTick(() => {
      componentKey.value += 1;
    });
  },
  { deep: true }
);

const getActivateName = () => {
  let { children } = props.widgetData;
  if (children && children[0]) {
    let { name } = children[0].options;
    selectValue.value = name;
  }
};

const onClickTabs = () => {
  props.designer.setSelectWidget(props.widgetData);
};

const onDragAdd = (e: any, parent: DesFormWidget) => {
  let i = e.newIndex;
  if (parent.children) {
    props.designer.setSelectWidget(parent.children[i]);
    props.designer.emitHistoryChange();
  }
};

getActivateName();
</script>
