<template>
  <div class="ex-form-widget">
    <div class="ex-widget-container">
      <div class="ex-widget-container-box ex-bg">
        <el-scrollbar
          class="ex-widget-box-scrollbar"
          :class="{
            'ex-box-pc': patternType == 'pc',
            'ex-box-pad': patternType == 'pad',
            'ex-box-h5': patternType == 'h5'
          }"
        >
          <el-form style="width: 100%; height: 100%" v-bind="formConfig">
            <draggable
              group="componentsGroup"
              class="container-draggable"
              scroll-fensitivity="20"
              ghost-class="ghost"
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
import { ref } from "vue";
import "../../style/index.scss";
export interface FormWidgetType {
  designer?: any;
}

const props = defineProps<FormWidgetType>();

const patternType = ref("pad");
const widgetList: any = [];
const formConfig: any = {};

const onDragAdd = (e: any, widgetList: Array<any>) => {
  props.designer.setSelectWidget(widgetList[e.newIndex]);
};
</script>
