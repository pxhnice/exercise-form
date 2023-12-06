<template>
  <div>
    <el-form-item label="最大分值">
      <el-input-number v-model="optionsModel.max" />
    </el-form-item>
    <el-form-item label="允许半选">
      <el-switch v-model="optionsModel.allowHalf" />
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
