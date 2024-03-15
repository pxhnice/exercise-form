<template>
  <el-form-item label="显示样式">
    <el-radio-group v-model="optionsModel.displayStyle">
      <el-radio label="">行内</el-radio>
      <el-radio label="block">块</el-radio>
    </el-radio-group>
  </el-form-item>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
