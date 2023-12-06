<template>
  <div class="divider">
    <el-divider v-bind="widgetData.options">
      {{ widgetData.options.label }}
    </el-divider>
  </div>
</template>

<script setup lang="ts">
import { desFieldsProps } from "./fields";

defineProps(desFieldsProps);
</script>

<style lang="scss" scoped>
.divider {
  min-height: 30px;
  padding: 1px;
}
</style>
