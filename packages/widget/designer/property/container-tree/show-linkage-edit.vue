<template>
  <div>
    <el-form-item label="nodeKey">
      <el-input v-model="optionsModel.nodeKey" />
    </el-form-item>
    <el-form-item label="显示复选框">
      <el-switch v-model="optionsModel.showCheckbox" />
    </el-form-item>
    <el-form-item label="显示过滤框">
      <el-switch v-model="optionsModel.showFilter" />
    </el-form-item>
    <el-form-item label="显示展示/收缩">
      <el-switch v-model="optionsModel.showExpandOrRetract" />
    </el-form-item>
    <el-form-item label="显示全选/取消选中">
      <el-switch v-model="optionsModel.showCheckAllOrCancelAll" />
    </el-form-item>
    <el-form-item label="显示父子联动">
      <el-switch v-model="optionsModel.showLinkage" />
    </el-form-item>
    <el-form-item label="默认展开所有节点">
      <el-switch v-model="optionsModel.defaultExpandAll" />
    </el-form-item>
    <el-form-item label="懒加载子节点">
      <el-switch v-model="optionsModel.lazy" />
    </el-form-item>
    <el-form-item label="显示操作按钮">
      <el-switch v-model="optionsModel.showOperationButton" />
    </el-form-item>
    <el-form-item label="树形数据编辑">
      <el-button type="primary" icon="Edit" round @click="openTreeData">
        编辑
      </el-button>
    </el-form-item>
    <el-dialog
      width="800"
      v-model="isShowTreeData"
      v-bind="dialogOptions"
      title="表格JSON数据编辑"
      @close="cancel"
    >
      <ex-code-editor v-model="codeValue" lang="json" :dark="dark" />
      <template #footer>
        <div style="display: flex; justify-content: center">
          <el-button type="primary" size="default" @click="confirmDataTable">
            确认
          </el-button>
          <el-button size="default" @click="cancel">关闭</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import { onMessageError } from "@exercise-form/utils";
import { desPropertyProps } from "../property";
import { darkKeys } from "@exercise-form/components/form-designer/src/form-designer";

const props = defineProps(desPropertyProps);

const dark = inject(darkKeys);
const optionsModel = props.optionsModel;
const isShowTreeData = ref(false);
const codeValue = ref("");
const dialogOptions = {
  draggable: true,
  destroyOnClose: true,
  closeOnClickModal: false
};

const openTreeData = () => {
  codeValue.value = JSON.stringify(props.optionsModel.treeData, null, 2);
  isShowTreeData.value = true;
};

const confirmDataTable = () => {
  try {
    optionsModel["treeData"] = JSON.parse(codeValue.value);
    isShowTreeData.value = false;
  } catch (error) {
    onMessageError(`错误的选项数据:${error}`);
  }
};

const cancel = () => {
  isShowTreeData.value = false;
};
</script>
