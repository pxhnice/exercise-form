<template>
  <el-form-item label="显示边框">
    <el-switch v-model="optionsModel.border" />
  </el-form-item>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
