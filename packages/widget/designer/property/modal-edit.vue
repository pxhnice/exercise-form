<template>
  <el-form-item label="是否需要遮罩层">
    <el-switch v-model="optionsModel.modal" />
  </el-form-item>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
