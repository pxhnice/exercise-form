<template>
  <div class="ex-forms-widget">
    <div class="ex-forms-container">
      <div class="ex-forms-container-box ex-bg">
        <el-scrollbar
          class="ex-forms-box-scrollbar"
          :class="{
            'ex-box-pc': formConfig.patternType == 'pc',
            'ex-box-pad': formConfig.patternType == 'pad',
            'ex-box-h5': formConfig.patternType == 'h5'
          }"
        >
          <el-form class="ex-designer-forms" v-bind="formConfig">
            <draggable
              group="componentsGroup"
              class="container-draggable"
              scroll-fensitivity="20"
              ghost-class="ex-ghost"
              handle=".drag-mover"
              :list="widgetList"
              @add="onDragAdd($event, widgetList)"
              item-key="id"
              :animation="300"
            >
              <template #item="{ element, index }">
                <div :id="element.id">
                  <template v-if="element.category === 'container'">
                    <component
                      :is="`${element.type}-widget`"
                      :widget-data="element"
                      :designer="designer"
                      :parent-list="widgetList"
                      :widget-sub="index"
                      :key="element.id"
                    />
                  </template>
                  <template v-else>
                    <form-item-widget
                      :widget-data="element"
                      :designer="designer"
                      :parent-list="widgetList"
                      :widget-sub="index"
                      :key="element.id"
                    />
                  </template>
                </div>
              </template>
            </draggable>
            <div v-if="widgetList.length == 0" class="ex-tips">
              请从左侧列表中选择一个组件, 然后用鼠标拖动组件放置于此处
            </div>
          </el-form>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { desFormsProps } from "./forms";
import { DesFormWidget } from "@exercise-form/core";
const props = defineProps(desFormsProps);

const onDragAdd = (e: any, widgetList: DesFormWidget[]) => {
  props.designer.setSelectWidget(widgetList[e.newIndex]);
  props.designer.emitHistoryChange();
};
</script>
