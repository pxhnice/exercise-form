<template>
  <div>
    <el-radio-group v-model="groupValue" class="ex-radio-group">
      <el-radio-button style="flex: 1" label="zj">组件设置</el-radio-button>
      <el-radio-button style="flex: 1" label="bd">表单设置</el-radio-button>
    </el-radio-group>
    <div class="widget-container">
      <div class="widget-container-box">
        <el-scrollbar class="widget-box-scrollbar"> </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import "../../style/index.scss";

const groupValue = ref("bd");
</script>
