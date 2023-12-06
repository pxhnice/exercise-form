<template>
  <div>
    <el-form-item label="最大输入长度">
      <el-input type="number" v-model="optionsModel.maxLength" :min="0" />
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
