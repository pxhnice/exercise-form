<template>
  <el-form-item label="占位文本">
    <el-input v-model="optionsModel.placeholder" />
  </el-form-item>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
