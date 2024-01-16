<template>
  <div class="ex-slot">
    <slot :name="widgetData.options.label"></slot>
  </div>
</template>

<script setup lang="ts">
import { desFieldsProps } from "./fields";

defineProps(desFieldsProps);
</script>
