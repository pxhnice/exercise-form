<template>
  <div class="text">
    <el-text
      v-bind="widgetData.options"
      :style="{ fontSize: widgetData.options.fontSize }"
    >
      {{ widgetData.options.content }}
    </el-text>
  </div>
</template>

<script setup lang="ts">
import { desFieldsProps } from "./fields";

defineProps(desFieldsProps);
</script>

<style lang="scss" scoped>
.text {
  min-height: 30px;
}
</style>
