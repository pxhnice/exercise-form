<template>
  <div class="ex-fields_divider">
    <el-divider v-bind="widgetData.options">
      {{ widgetData.options.label }}
    </el-divider>
  </div>
</template>

<script setup lang="ts">
import { desFieldsProps } from "./fields";

defineProps(desFieldsProps);
</script>
