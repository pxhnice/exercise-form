<template>
  <div class="alert">
    <el-alert v-bind="widgetData.options" />
  </div>
</template>

<script setup lang="ts">
import { desFieldsProps } from "./fields";

defineProps(desFieldsProps);
</script>

<style lang="scss" scoped>
.alert {
  padding: 2px;
}
</style>
