<template>
  <el-button-group
    :type="widgetData.options.type"
    :size="widgetData.options.size"
  >
    <el-button
      v-for="btn of widgetData.options.buttonGroups"
      :key="btn.name"
      v-bind="btn"
      >{{ btn.label }}
    </el-button>
  </el-button-group>
</template>

<script setup lang="ts">
import { renContainerProps } from "./container";

defineProps(renContainerProps);
</script>
