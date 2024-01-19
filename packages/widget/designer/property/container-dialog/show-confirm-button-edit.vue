<template>
  <el-form-item label="显示确认按钮">
    <el-switch v-model="optionsModel.showCancelButton" />
  </el-form-item>
</template>

<script setup lang="ts">
import { desPropertyProps } from "../property";

defineProps(desPropertyProps);
</script>
