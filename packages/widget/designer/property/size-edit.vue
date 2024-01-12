<template>
  <el-form-item label="组件大小">
    <el-select v-model="optionsModel.size" :teleported="false">
      <el-option value="large" label="large" />
      <el-option value="default" label="default" />
      <el-option value="small" label="small" />
    </el-select>
  </el-form-item>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
