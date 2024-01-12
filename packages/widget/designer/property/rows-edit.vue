<template>
  <el-form-item label="行数">
    <el-input-number v-model="optionsModel.rows" :min="0" />
  </el-form-item>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
