<template>
  <el-form-item label="栅格偏移格数">
    <el-input-number
      style="width: 100%"
      v-model="optionsModel.offset"
      :min="0"
      :max="24"
    />
  </el-form-item>
</template>

<script setup lang="ts">
import { desPropertyProps } from "../property";

defineProps(desPropertyProps);
</script>
