<template>
  <el-form-item label="显示取消按钮">
    <el-switch v-model="optionsModel.showConfirmButton" />
  </el-form-item>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
