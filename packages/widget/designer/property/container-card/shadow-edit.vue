<template>
  <div>
    <el-form-item label="卡片阴影">
      <el-select v-model="optionsModel.shadow">
        <el-option
          v-for="name in shadowList"
          :key="name"
          :lable="name"
          :value="name"
        />
      </el-select>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { desPropertyProps } from "../property";

defineProps(desPropertyProps);

const shadowList = ["always", "never", "hover"];
</script>
