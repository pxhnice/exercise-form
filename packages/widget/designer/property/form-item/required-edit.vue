<template>
  <div>
    <el-form-item label="是否必填">
      <el-switch v-model="optionsModel.required" />
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { desPropertyProps } from "../property";

defineProps(desPropertyProps);
</script>
