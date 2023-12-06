<template>
  <div>
    <el-form-item label="是否多选">
      <el-switch v-model="optionsModel.multiple" />
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
