<template>
  <el-form-item label="宽度(px)">
    <el-input v-model="optionsModel.width" />
  </el-form-item>
  <el-form-item label="全屏显示">
    <el-switch v-model="optionsModel.fullscreen" />
  </el-form-item>
  <el-form-item label="是否居中排列">
    <el-switch v-model="optionsModel.center" />
  </el-form-item>
</template>

<script setup lang="ts">
import { desPropertyProps } from "../property";

defineProps(desPropertyProps);
</script>
