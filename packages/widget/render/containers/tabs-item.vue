<template>
  <el-tabs
    v-model="activate"
    class="ex-widget-tabs"
    v-bind="widgetData.options"
  >
    <el-tab-pane
      class="ex-drag-tab-pane"
      v-for="tab in widgetData.children"
      :key="tab.id"
      v-bind="tab.options"
    >
      <template v-for="item in tab.children" :key="item.id">
        <template v-if="item.category === 'container'">
          <component
            :is="`${item.type}-item`"
            :designer="designer"
            :widget-data="item"
            :form-data="formData"
            :key="item.id"
          />
        </template>
        <template v-else>
          <form-item
            :designer="designer"
            :widget-data="item"
            :form-data="formData"
            :key="item.id"
          />
        </template>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { renContainerProps } from "./container";

defineProps(renContainerProps);

const activate = ref("tab1");
</script>
