<template>
  <div class="ex-toolbar">
    <div class="ex-toolbar-header">
      <div class="ex-toolbar-header-left">
        <div class="ex-operation">
          <el-button
            :type="undoEnabled ? 'primary' : ''"
            :disabled="!undoEnabled"
            @click="handleRetreat"
            link
          >
            <el-icon class="ex-mgr-10" :size="20">
              <ex-icon-retreat />
            </el-icon>
          </el-button>
          <el-button
            :type="redoEnabled ? 'primary' : ''"
            :disabled="!redoEnabled"
            @click="handleAdvance"
            link
          >
            <el-icon class="ex-mgr-10" :size="20">
              <ex-icon-advance />
            </el-icon>
          </el-button>
        </div>
        <el-radio-group v-model="formConfig.patternType">
          <el-radio-button label="pc">Pc</el-radio-button>
          <el-radio-button label="pad">Pad</el-radio-button>
          <el-radio-button label="h5">H5</el-radio-button>
        </el-radio-group>
        <el-button
          v-if="optionsData?.treeFormButton"
          @click="openWidgetTree"
          class="ex-mgl-10"
        >
          <div title="组件层次结构树">
            <el-icon :size="20">
              <ex-icon-tree />
            </el-icon>
          </div>
        </el-button>
      </div>
      <el-scrollbar>
        <div class="ex-toolbar-header-right">
          <el-button @click="clear" link type="primary">
            <el-icon><Delete /></el-icon>
            清空
          </el-button>
          <el-button
            v-if="optionsData?.previewFormButton"
            @click="openPreview"
            link
            type="primary"
          >
            <el-icon><View /></el-icon>
            预览
          </el-button>
          <el-button
            v-if="optionsData?.exportJsonButton"
            @click="openJsonDialog"
            link
            type="primary"
          >
            JSON导出
          </el-button>
          <el-button
            v-if="optionsData?.generateSFCButton"
            @click="openSFCDialog"
            link
            type="primary"
          >
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
      @close="cancelJSONDialog"
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
        :dark="dark"
        :disabled="true"
        lang="json"
      />
      <template #footer>
        <span>
          <el-button
            v-if="optionsData?.copyDataButton"
            type="primary"
            v-copy="codeValue"
            >复制内容</el-button
          >
          <el-button
            v-if="optionsData?.saveFileButton"
            type="primary"
            @click="importJSON"
            >保存为文件</el-button
          >
          <el-button @click="cancelJSONDialog">取消</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="isShowSFC"
      width="800"
      :title="title"
      @close="cancelSFCDialog"
      draggable
      destroy-on-close
      :close-on-click-modal="false"
    >
      <el-form ref="formRef" :model="form">
        <el-form-item label="导出文件名">
          <el-input v-model="form.importName" />
        </el-form-item>
        <el-form-item>
          <el-radio-group
            v-if="optionsData?.pageTypeButton"
            v-model="formConfig.isPageType"
            @change="changeRadio"
          >
            <el-radio-button label="page">页面</el-radio-button>
            <el-radio-button label="dialog">弹框</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <ex-code-editor
        v-model="codeValue"
        :height="500"
        :dark="dark"
        :disabled="true"
        lang="vue"
      />
      <template #footer>
        <span>
          <el-button
            v-if="optionsData?.copyDataButton"
            type="primary"
            v-copy="codeValue"
            >复制内容</el-button
          >
          <el-button
            v-if="optionsData?.saveFileButton"
            type="primary"
            @click="importSFC"
          >
            保存为Vue3组件
          </el-button>
          <el-button @click="cancelSFCDialog">取消</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="isShowRender"
      fullscreen
      title="预览"
      @close="cancelRenderDialog"
      destroy-on-close
      center
      :close-on-click-modal="false"
    >
      <div style="height: calc(100vh - 176px)">
        <ex-form-render
          ref="vFormRenderRef"
          :widget-list="widgetList"
          :form-config="formConfig"
        />
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
          <el-button @click="cancelRenderDialog">关闭</el-button>
        </div>
      </template>
    </el-dialog>
    <el-drawer
      size="300px"
      v-model="drawer"
      title="组件层次结构树"
      direction="ltr"
      @open="handelOpen"
      :before-close="close"
    >
      <div class="ex-toolbar-drawer_tree">
        <el-tree
          ref="treeRef"
          :data="widgetList"
          :props="defaultProps"
          node-key="id"
          default-expand-all
          @node-click="handleNodeClick"
          :filter-node-method="filterNode"
        />
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from "vue";
import FileSaver from "file-saver";
import prettier from "prettier";
import parserHtml from "prettier/plugins/html";
import parserCss from "prettier/plugins/postcss";
import parserBabel from "prettier/plugins/babel";
import parserEstree from "prettier/plugins/estree";
import {
  deepClone,
  getSFCGenerator,
  onMessageWarning
} from "@exercise-form/utils";
import { copy as vCopy } from "@exercise-form/directives";
import { desPanelProps } from "./panel";
import { optionsKeys, darkKeys } from "../form-designer";

const props = defineProps(desPanelProps);

const optionsData = inject(optionsKeys);
const dark = inject(darkKeys);
const isShowJSON = ref(false);
const isShowSFC = ref(false);
const isShowRender = ref(false);
const title = ref("导出JSON");
const vFormRenderRef = ref();
const form = ref({ importName: "" });
const codeValue = ref("");
const treeRef = ref();
const drawer = ref(false);
const defaultProps = {
  children: "children",
  label: "id"
};
const undoEnabled = computed(() => props.designer.undoEnabled());
const redoEnabled = computed(() => props.designer.redoEnabled());

const clear = () => {
  props.designer.clearAllWidget();
};

const openWidgetTree = () => {
  drawer.value = true;
};

const handleAdvance = () => {
  props.designer.redoHistoryStep();
};

const handleRetreat = () => {
  props.designer.undoHistoryStep();
};

const openPreview = () => {
  isShowRender.value = true;
};

const openJsonDialog = () => {
  title.value = "导出JSON";
  form.value.importName = `form${new Date().getTime()}.json`;
  let widgetList = deepClone(props.designer.widgetList.value);
  const jsonString = JSON.stringify(
    {
      formConfig: props.formConfig,
      widgetList
    },
    null,
    2
  );
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
  let code = getSFCGenerator(formConfig, widgetList);
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
      plugins: [parserHtml, parserBabel, parserEstree, parserCss],
      tabWidth: 2,
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

const cancelJSONDialog = () => {
  isShowJSON.value = false;
};

const cancelSFCDialog = () => {
  isShowSFC.value = false;
};

const cancelRenderDialog = () => {
  isShowRender.value = false;
};

const handelOpen = () => {
  let id = props.designer.selectWidgetId.value;
  if (id) treeRef.value!.setCurrentKey(id);
  treeRef.value!.filter();
};

const filterNode = (value: string, data: any) => {
  return !(data.type === "table-td" && !data.merged);
};

const handleNodeClick = (data: any) => {
  if (["tab-pane", "table-tr"].includes(data.type)) {
    onMessageWarning("该节点不可选中");
    return;
  }
  props.designer.setSelectWidget(data);
};

const close = () => {
  drawer.value = false;
};
</script>
