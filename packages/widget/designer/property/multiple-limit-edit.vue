<template>
  <el-form-item label="选择项目数">
    <el-input-number v-model="optionsModel.multipleLimit" />
  </el-form-item>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
