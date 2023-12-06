<template>
  <div>
    <el-form-item label="宽度">
      <el-input style="width: 100%" v-model="optionsModel.cardWidth" />
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { desPropertyProps } from "../property";

defineProps(desPropertyProps);
</script>
