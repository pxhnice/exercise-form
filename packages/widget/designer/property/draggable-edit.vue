<template>
  <el-form-item label="是否开启拖拽">
    <el-switch v-model="optionsModel.draggable" />
  </el-form-item>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
