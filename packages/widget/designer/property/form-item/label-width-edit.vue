<template>
  <el-form-item label="标签宽度">
    <el-input v-model="optionsModel.labelWidth" />
  </el-form-item>
</template>

<script setup lang="ts">
import { desPropertyProps } from "../property";

defineProps(desPropertyProps);
</script>
