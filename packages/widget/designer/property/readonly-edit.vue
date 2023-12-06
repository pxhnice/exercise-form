<template>
  <div>
    <el-form-item label="只读">
      <el-switch v-model="optionsModel.readonly" />
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
