<template>
  <el-form-item label="按钮模式">
    <el-switch v-model="optionsModel.buttonMode" />
  </el-form-item>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
