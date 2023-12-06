<template>
  <div>
    <el-form-item label="可清除">
      <el-switch v-model="optionsModel.clearable" />
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
