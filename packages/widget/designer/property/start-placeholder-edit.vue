<template>
  <el-form-item label="开始占位内容">
    <el-input v-model="optionsModel.startPlaceholder" />
  </el-form-item>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
