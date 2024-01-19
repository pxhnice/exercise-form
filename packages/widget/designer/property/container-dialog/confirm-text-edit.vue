<template>
  <el-form-item label="确认按钮本文">
    <el-input v-model="optionsModel.confirmText" />
  </el-form-item>
</template>

<script setup lang="ts">
import { desPropertyProps } from "../property";

defineProps(desPropertyProps);
</script>
