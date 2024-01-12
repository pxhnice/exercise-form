<template>
  <el-form-item label="禁用">
    <el-switch v-model="optionsModel.disabled" />
  </el-form-item>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
