<template>
  <el-form-item label="必填校验提示">
    <el-input v-model="optionsModel.requiredHint" />
  </el-form-item>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
