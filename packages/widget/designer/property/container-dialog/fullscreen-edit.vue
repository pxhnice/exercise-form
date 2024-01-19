<template>
  <el-form-item label="全屏显示">
    <el-switch v-model="optionsModel.fullscreen" />
  </el-form-item>
</template>

<script setup lang="ts">
import { desPropertyProps } from "../property";

defineProps(desPropertyProps);
</script>
