<template>
  <div>
    <el-form-item label="结束占位内容">
      <el-input v-model="optionsModel.endPlaceholder" />
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
