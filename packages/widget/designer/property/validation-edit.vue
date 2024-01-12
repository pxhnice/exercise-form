<template>
  <el-form-item label="字段校验">
    <el-select v-model="optionsModel.validation" :teleported="false">
      <el-option
        v-for="item in validationOptions"
        :key="item.type"
        :value="item.type"
        :label="item.label"
      />
    </el-select>
  </el-form-item>
</template>

<script setup lang="ts">
import { validationOptions } from "@exercise-form/constants";
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
