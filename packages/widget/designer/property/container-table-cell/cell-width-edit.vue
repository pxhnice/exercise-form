<template>
  <el-form-item label="宽度">
    <el-input style="width: 100%" v-model="optionsModel.cellWidth" />
  </el-form-item>
</template>

<script setup lang="ts">
import { desPropertyProps } from "../property";

defineProps(desPropertyProps);
</script>
