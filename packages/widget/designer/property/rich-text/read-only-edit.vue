<template>
  <el-form-item label="只读">
    <el-switch v-model="optionsModel.readOnly" />
  </el-form-item>
</template>

<script setup lang="ts">
import { desPropertyProps } from "../property";

defineProps(desPropertyProps);
</script>
