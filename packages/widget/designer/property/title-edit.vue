<template>
  <el-form-item label="标题">
    <el-input v-model="optionsModel.title" />
  </el-form-item>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
