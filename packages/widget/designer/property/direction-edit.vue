<template>
  <div>
    <el-form-item label="文本内容">
      <el-input type="textarea" v-model="optionsModel.label" />
    </el-form-item>
    <el-form-item label="分割线方向">
      <el-select v-model="optionsModel.direction" :teleported="false">
        <el-option value="horizontal" label="horizontal" />
        <el-option value="vertical" label="vertical" />
      </el-select>
    </el-form-item>
    <el-form-item label="分隔符样式">
      <el-select v-model="optionsModel.borderStyle" :teleported="false">
        <el-option
          v-for="item in directionOptions"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="分隔线内容的位置">
      <el-select v-model="optionsModel.contentPosition" :teleported="false">
        <el-option value="left" label="left" />
        <el-option value="center" label="center" />
        <el-option value="right" label="right" />
      </el-select>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { directionOptions } from "@exercise-form/constants";
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
