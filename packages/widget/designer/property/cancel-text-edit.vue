<template>
  <el-form-item label="取消按钮文本">
    <el-input v-model="optionsModel.cancelText" />
  </el-form-item>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
