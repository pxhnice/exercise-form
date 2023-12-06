<template>
  <div>
    <el-button @click.stop v-bind="widgetData.options">
      {{ widgetData.options.label }}
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { desFieldsProps } from "./fields";

defineProps(desFieldsProps);
</script>
