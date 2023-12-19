<template>
  <div>
    <el-form-item label="类型">
      <el-select v-model="optionsModel.type" :teleported="false">
        <el-option
          v-for="item in tagOptions"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="文本内容">
      <el-input type="textarea" v-model="optionsModel.content" />
    </el-form-item>
    <el-form-item label="文本大小">
      <el-input v-model="optionsModel.fontSize" />
    </el-form-item>
    <el-form-item label="自定义元素标签">
      <el-input v-model="optionsModel.tag" />
    </el-form-item>
    <el-form-item label="显示省略号">
      <el-switch v-model="optionsModel.truncated" />
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { tagOptions } from "@exercise-form/constants";
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
