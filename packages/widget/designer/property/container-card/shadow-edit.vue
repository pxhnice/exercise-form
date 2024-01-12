<template>
  <div>
    <el-form-item label="卡片阴影">
      <el-select v-model="optionsModel.shadow">
        <el-option
          v-for="name in SHADOW_LIST"
          :key="name"
          :label="name"
          :value="name"
        />
      </el-select>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { SHADOW_LIST } from "@exercise-form/constants";
import { desPropertyProps } from "../property";

defineProps(desPropertyProps);
</script>
