<template>
  <el-form-item label="点击遮罩层关闭">
    <el-switch v-model="optionsModel.closeOnClickModal" />
  </el-form-item>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
