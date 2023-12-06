<template>
  <div>
    <el-form-item label="显示间断点">
      <el-switch v-model="optionsModel.showStops" />
    </el-form-item>
    <el-form-item label="步长">
      <el-input-number v-model="optionsModel.step" />
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
