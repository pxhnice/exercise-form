<template>
  <div>
    <el-form-item label="类型">
      <el-select v-model="optionsModel.type" :teleported="false">
        <el-option
          v-for="item in descriptionOptions"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="标题">
      <el-input v-model="optionsModel.title" />
    </el-form-item>
    <el-form-item label="描述文本">
      <el-input type="textarea" v-model="optionsModel.description" />
    </el-form-item>
    <el-form-item label="显示类型图标">
      <el-switch v-model="optionsModel.showIcon" />
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { descriptionOptions } from "@exercise-form/constants";
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
