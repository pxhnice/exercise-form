<template>
  <div>
    <el-form-item v-if="settingData.type == 'divider'" label="分割线方向">
      <el-select v-model="optionsModel.direction" :teleported="false">
        <el-option value="horizontal" label="horizontal" />
        <el-option value="vertical" label="vertical" />
      </el-select>
    </el-form-item>
    <el-form-item v-if="settingData.type == 'side-drawer'" label="弹出方向">
      <el-select v-model="optionsModel.direction" :teleported="false">
        <el-option value="rtl" label="rtl" />
        <el-option value="ltr" label="ltr" />
        <el-option value="ttb" label="ttb" />
        <el-option value="btt" label="btt" />
      </el-select>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { desPropertyProps } from "./property";

defineProps(desPropertyProps);
</script>
