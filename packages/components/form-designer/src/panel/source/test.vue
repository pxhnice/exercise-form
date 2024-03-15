<template>
  <div class="ex-source ex-upload">
    <el-dialog
      v-model="showTestData"
      width="800"
      title="测试数据源"
      @close="handleClose"
      destroy-on-close
      draggable
      :close-on-click-modal="false"
    >
      <div class="ex-dialog-box">
        <div class="name-front">数据源变量</div>
        <ex-code-editor
          v-model="codeValue"
          height="200"
          :dark="dark"
          lang="json"
        />
      </div>
      <div class="ex-source-operation ex-source-test_buttons">
        <el-button type="primary" @click="handleExecute"> 立即执行 </el-button>
        <el-button type="primary" plain @click="handleClear"> 清空 </el-button>
        <el-button @click="handleClose">关闭</el-button>
      </div>
      <div class="ex-dialog-box">
        <div class="name-front">返回数据</div>
        <ex-code-editor v-model="resultCode" :dark="dark" lang="json" />
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import { darkKeys } from "../../form-designer";
import { DesFormSource } from "@exercise-form/core";
import { onMessageError } from "@exercise-form/utils";

const dark = inject(darkKeys);
const showTestData = ref(false);
const codeValue = ref("");
const sources = ref<DesFormSource>();
const resultCode = ref("");

const handleOpen = (form: DesFormSource) => {
  let { requestUrl, method, headers, data, params } = form;
  sources.value = form;
  codeValue.value = JSON.stringify(
    { requestUrl, method, headers, data, params },
    null,
    2
  );
  showTestData.value = true;
};

const handleExecute = () => {
  if (sources.value) {
    let {
      requestUrl,
      method,
      headers,
      data,
      params,
      dataHandlerCode,
      errorHandlerCode
    } = sources.value;
    window
      .axios({
        method,
        headers,
        data,
        params,
        url: requestUrl
      })
      .then((result: any) => {
        console.log("result:", result);
        console.log("数据处理格式:", dataHandlerCode);
        let data = handleData(result, dataHandlerCode);
        resultCode.value = JSON.stringify(data, null, 2);
      })
      .catch((error: any) => {
        handleError(error, errorHandlerCode);
      });
  }
};

const handleData = (result: any, dataHandlerCode: string) => {
  if (dataHandlerCode) return eval(`(function (){${dataHandlerCode}})()`);
  return result;
};

const handleError = (error: any, errorHandlerCode: string) => {
  if (errorHandlerCode) {
    eval(`(function (){${errorHandlerCode}})()`);
    return;
  }
  onMessageError(error);
};

const handleClear = () => {
  resultCode.value = "";
};

const handleClose = () => {
  showTestData.value = false;
};

defineExpose({ handleOpen });
</script>
