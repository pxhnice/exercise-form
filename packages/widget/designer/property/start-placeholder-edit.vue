<template>
  <div>
    <el-form-item label="开始占位内容">
      <el-input v-model="optionsModel.startPlaceholder" />
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
