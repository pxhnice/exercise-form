<template>
  <div class="ex-fields_alert">
    <el-alert v-bind="widgetData.options" />
  </div>
</template>

<script setup lang="ts">
import { desFieldsProps } from "./fields";

defineProps(desFieldsProps);
</script>
