<template>
  <div>
    <el-form-item label="组件栅格高度(px)">
      <el-input type="number" v-model="optionsModel.colHeight" :min="0" />
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { desPropertyProps } from "../property";

defineProps(desPropertyProps);
</script>
