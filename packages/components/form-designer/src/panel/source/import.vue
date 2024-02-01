<template>
  <div class="ex-source ex-upload">
    <el-dialog
      v-model="showImportData"
      width="800"
      title="导入数据"
      @close="cancel"
    >
      <div class="ex-dialog-box">
        <div class="name-front">
          <el-icon><InfoFilled /></el-icon>
          导入的数据源格式须符合规范，以保证顺利导入
        </div>
        <ex-code-editor
          v-model="codeValue"
          height="250"
          :dark="dark"
          lang="json"
        />
      </div>
      <el-switch
        v-model="isAdd"
        size="default"
        active-text="追加到已有数据源之后"
        inactive-text="导入后清空源数据源"
      />
      <template #footer>
        <el-button type="primary" @click="handleImportConfirm">
          导入
        </el-button>
        <el-button @click="cancel">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import { onMessageError } from "@exercise-form/utils";
import { darkKeys } from "../../form-designer";
import { DesSourceForm } from "./source";

const dark = inject(darkKeys);
const dataSources = ref<DesSourceForm[]>([]);
const showImportData = ref(false);
const codeValue = ref("");
const isAdd = ref(false);

const handleOpen = (params: DesSourceForm[]) => {
  isAdd.value = false;
  codeValue.value = "";
  dataSources.value = params;
  showImportData.value = true;
};

const handleImportConfirm = () => {
  try {
    let sources = JSON.parse(codeValue.value);
    if (isAdd.value) dataSources.value.splice(0, dataSources.value.length);
    dataSources.value.push(sources);
    showImportData.value = false;
  } catch (error) {
    onMessageError(`错误的选项数据:${error}`);
  }
};

const cancel = () => {
  showImportData.value = false;
};

defineExpose({ handleOpen });
</script>
