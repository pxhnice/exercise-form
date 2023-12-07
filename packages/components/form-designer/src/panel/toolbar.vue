<template>
  <div>
    <div class="ex-toolbar-header">
      <div class="ex-toolbar-header-left">
        <div class="ex-operation">
          <el-button :type="0 ? 'primary' : ''" link>
            <ex-svg-icon class="ex-icon-ft-20" name="retreat" />
          </el-button>
          <el-button :type="0 ? 'primary' : ''" link>
            <ex-svg-icon class="ex-icon-ft-20" name="advance" />
          </el-button>
        </div>
        <el-radio-group v-model="patternType" @change="onChange">
          <el-radio-button label="pc">Pc</el-radio-button>
          <el-radio-button label="pad">Pad</el-radio-button>
          <el-radio-button label="h5">H5</el-radio-button>
        </el-radio-group>
        <el-button @click="openWidgetTree" class="ex-mgl-10">
          <div title="组件层次结构树">
            <ex-svg-icon class="ex-icon-ft-20" name="tree" />
          </div>
        </el-button>
      </div>
      <el-scrollbar>
        <div class="ex-toolbar-header-right">
          <el-button @click="clear" link type="primary">
            <el-icon><Delete /></el-icon>
            清空
          </el-button>
          <el-button @click="openPreview" link type="primary">
            <el-icon><View /></el-icon>
            预览
          </el-button>
          <el-button @click="openJsonDialog" link type="primary">
            JSON导出
          </el-button>
          <el-button @click="openSFCDialog" link type="primary">
            <el-icon><Coin /></el-icon>
            导出SFC
          </el-button>
        </div>
      </el-scrollbar>
    </div>
    <el-dialog
      v-model="isShowJSON"
      width="800"
      :title="title"
      @close="cancel"
      destroy-on-close
      draggable
      :close-on-click-modal="false"
    >
      <el-form ref="formRef" :model="form">
        <el-form-item label="导出文件名">
          <el-input v-model="form.importName" />
        </el-form-item>
      </el-form>
      <ex-code-editor
        v-model="codeValue"
        :height="500"
        :disabled="true"
        lang="json"
      />
      <template #footer>
        <span>
          <el-button type="primary">复制内容</el-button>
          <el-button type="primary" @click="importJSON">保存为文件</el-button>
          <el-button @click="cancel">取消</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="isShowSFC"
      width="800"
      :title="title"
      @close="cancel"
      draggable
      destroy-on-close
      :close-on-click-modal="false"
    >
      <el-form ref="formRef" :model="form">
        <el-form-item label="导出文件名">
          <el-input v-model="form.importName" />
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="formConfig.isPageType" @change="changeRadio">
            <el-radio-button label="page">页面</el-radio-button>
            <el-radio-button label="dialog">弹框</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <ex-code-editor
        v-model="codeValue"
        :height="500"
        :disabled="true"
        lang="vue"
      />
      <template #footer>
        <span>
          <!-- <el-button type="primary" v-copy="codeValue">复制内容</el-button> -->
          <el-button type="primary" @click="importSFC">
            保存为Vue3组件
          </el-button>
          <el-button @click="cancel">取消</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="isShowRender"
      fullscreen
      title="预览"
      @close="cancel"
      destroy-on-close
      center
      :close-on-click-modal="false"
    >
      <template> </template>
      <div style="height: calc(100vh - 176px)">
        <ex-form-render ref="vFormRenderRef" :designer="designer" />
      </div>
      <template #footer>
        <div class="footer-btns">
          <el-button @click="openDefaultValueDialog" type="primary">
            获取数据
          </el-button>
          <el-button @click="handleResetForm" type="primary">
            重置表单
          </el-button>
          <el-button @click="handleOndisabled" type="primary">
            禁用编辑
          </el-button>
          <el-button @click="handleUndisable" type="primary">
            恢复编辑
          </el-button>
          <el-button @click="cancel">关闭</el-button>
        </div>
      </template>
    </el-dialog>
    <!-- <widget-tree ref="widgetTreeRef" :designer="designer" /> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FileSaver from "file-saver";
import { deepClone, getSFCGenerator } from "@exercise-form/utils";
import prettier from "prettier";
import parserHtml from "prettier/plugins/html";
import parserCss from "prettier/plugins/postcss";
import parserBabel from "prettier/plugins/babel";
import { desPanelProps } from "./panel";
import "../../style/index.scss";

const props = defineProps(desPanelProps);

const patternType = ref("pad");
const formConfig = ref<any>({});
const widgetTreeRef = ref();
const isShowJSON = ref(false);
const isShowSFC = ref(false);
const isShowRender = ref(false);
const title = ref("导出JSON");
// const toolbarTreeRef = ref();
const vFormRenderRef = ref();
const form = ref({
  importName: ""
});
const codeValue = ref("");

const onChange = (value: string) => {
  props.designer.setPatternType(value);
};
const clear = () => {
  props.designer.clearAllWidget();
};
const openWidgetTree = () => {
  if (widgetTreeRef.value) widgetTreeRef.value.open();
};

// const hanldeAdvance = () => {
//   console.log("前进");
// };

// const hanldeRetreat = () => {
//   console.log("后退");
// };

// const openTree = () => {
//   toolbarTreeRef.value.open();
// };

const openPreview = () => {
  isShowRender.value = true;
};

const openJsonDialog = () => {
  title.value = "导出JSON";
  form.value.importName = `form${new Date().getTime()}.json`;
  let widgetList = deepClone(props.designer.widgetList);
  const jsonString = JSON.stringify(widgetList, null, 2);
  codeValue.value = jsonString;
  isShowJSON.value = true;
};

const importJSON = () => {
  let bold = new Blob([codeValue.value], { type: "application/json" });
  FileSaver.saveAs(
    bold,
    form.value.importName ?? `form${new Date().getTime()}.json`
  );
};

const openSFCDialog = async () => {
  title.value = "生成SFC";
  form.value.importName = `form${new Date().getTime()}.vue`;
  await changeRadio();
  isShowSFC.value = true;
};

const changeRadio = async () => {
  let widgetList = deepClone(props.widgetList);
  let formConfig = deepClone(props.formConfig);
  let code = getSFCGenerator(formConfig as any, widgetList);
  codeValue.value = await prettierCode(code);
};

const importSFC = () => {
  let bold = new Blob([codeValue.value], { type: "application/json" });
  FileSaver.saveAs(
    bold,
    form.value.importName ?? `form${new Date().getTime()}.vue`
  );
};
// 格式化vue模板
const prettierCode = async (code: string) => {
  try {
    return await prettier.format(code, {
      parser: "vue",
      plugins: [parserHtml, parserBabel, parserCss],
      tabWidth: 4,
      printWidth: 60,
      trailingComma: "none",
      htmlWhitespaceSensitivity: "ignore",
      vueIndentScriptAndStyle: true,
      singleAttributePerLine: true
    });
  } catch (error) {
    return code;
  }
};

const openDefaultValueDialog = () => {
  title.value = "表单数据";
  form.value.importName = `form${new Date().getTime()}.json`;
  let data = vFormRenderRef.value.originalData;
  const jsonString = JSON.stringify(deepClone(data), null, 2);
  codeValue.value = jsonString;
  isShowJSON.value = true;
};

const handleResetForm = () => {
  vFormRenderRef.value.resetForm();
};

const handleOndisabled = () => {
  vFormRenderRef.value.ondisabled();
};

const handleUndisable = () => {
  vFormRenderRef.value.undisable();
};

const cancel = () => {
  isShowJSON.value = false;
  isShowSFC.value = false;
  isShowRender.value = false;
};
</script>
