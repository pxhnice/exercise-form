<template>
  <el-form-item label="按ESC关闭">
    <el-switch v-model="optionsModel.closeOnPressEscape" />
  </el-form-item>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
