<template>
  <div>
    <el-form-item label="高度">
      <el-input style="width: 100%" v-model="optionsModel.cellHeight" />
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { desPropertyProps } from "../property";

defineProps(desPropertyProps);
</script>
