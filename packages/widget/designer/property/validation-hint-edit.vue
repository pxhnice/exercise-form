<template>
  <el-form-item label="校验失败提示">
    <el-input v-model="optionsModel.validationHint" />
  </el-form-item>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
