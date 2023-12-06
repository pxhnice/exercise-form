<template>
  <div>
    <el-form-item label="隐藏">
      <el-switch v-model="optionsModel.hidden" />
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
