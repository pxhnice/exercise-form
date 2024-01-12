<template>
  <el-form-item label="最小输入长度">
    <el-input type="number" v-model="optionsModel.minLength" :min="0" />
  </el-form-item>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
