<template>
  <el-row v-bind="widgetData.options">
    <el-col
      v-for="col in widgetData.children"
      :key="col.id"
      v-bind="col.options"
    >
      <template v-for="item in col.children" :key="item.id">
        <template v-if="item.category === 'container'">
          <component
            :is="`${item.type}-item`"
            :widget-data="item"
            :designer="designer"
            :form-data="formData"
            :key="col.id"
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
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { renContainerProps } from "./container";

defineProps(renContainerProps);
</script>
