<template>
  <div>
    <el-form-item label="	栅格左移格数">
      <el-input-number
        style="width: 100%"
        v-model="optionsModel.pull"
        :min="0"
        :max="24"
      />
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { desPropertyProps } from "../property";

defineProps(desPropertyProps);
</script>
