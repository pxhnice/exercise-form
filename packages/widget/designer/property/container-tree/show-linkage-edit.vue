<template>
  <div>
    <el-form-item label="显示复选框">
      <el-switch v-model="optionsModel.showCheckbox" />
    </el-form-item>
    <el-form-item label="显示过滤框">
      <el-switch v-model="optionsModel.showFilter" />
    </el-form-item>
    <el-form-item label="展示/收缩">
      <el-switch v-model="optionsModel.showExpandOrRetract" />
    </el-form-item>
    <el-form-item label="全选/取消选中">
      <el-switch v-model="optionsModel.showCheckAllOrCancelAll" />
    </el-form-item>
    <el-form-item label="父子联动">
      <el-switch v-model="optionsModel.showLinkage" />
    </el-form-item>
    <el-form-item label="默认展开所有节点">
      <el-switch v-model="optionsModel.defaultExpandAll" />
    </el-form-item>
    <el-form-item label="懒加载子节点">
      <el-switch v-model="optionsModel.lazy" />
    </el-form-item>
    <el-form-item label="树形数据编辑">
      <el-button type="primary" icon="Edit" round> 编辑 </el-button>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { desPropertyProps } from "../property";

defineProps(desPropertyProps);
</script>
