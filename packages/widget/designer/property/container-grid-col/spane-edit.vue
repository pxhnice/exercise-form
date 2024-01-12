<template>
  <el-form-item label="栅格宽度">
    <el-input-number
      style="width: 100%"
      v-model="optionsModel.span"
      :min="0"
      :max="24"
    />
  </el-form-item>
</template>

<script setup lang="ts">
import { desPropertyProps } from "../property";

defineProps(desPropertyProps);
</script>
