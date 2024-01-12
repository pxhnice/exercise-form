<template>
  <el-form-item label="文本框可输入">
    <el-switch v-model="optionsModel.editable" />
  </el-form-item>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
