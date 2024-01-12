<template>
  <el-form-item label="标签">
    <el-input v-model="optionsModel.label" />
  </el-form-item>
</template>

<script setup lang="ts">
import { desPropertyProps } from "../property";

defineProps(desPropertyProps);
</script>
