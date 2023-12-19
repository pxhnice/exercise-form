<template>
  <div>
    <el-form-item label="绑定值格式">
      <el-select v-model="optionsModel.valueFormat" :teleported="false">
        <el-option value="YYYY-MM-DD" label="YYYY-MM-DD" />
        <el-option value="YYYY-MM-DD HH:mm:ss" label="YYYY-MM-DD HH:mm:ss" />
      </el-select>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
