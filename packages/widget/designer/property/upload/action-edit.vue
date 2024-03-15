<template>
  <div>
    <el-divider> 上传参数设置 </el-divider>
    <el-form-item label="请求参数">
      <el-button @click="dialogVisible = true" type="primary" icon="Edit" round>
        参数设置
      </el-button>
    </el-form-item>
    <!-- <el-form-item label="请求URL">
      <el-input v-model="optionsModel.action" />
    </el-form-item>
    <el-form-item label="请求头部">
      <el-input v-model="optionsModel.headers" />
    </el-form-item>
    <el-form-item label="请求方法">
      <el-input v-model="optionsModel.method" />
    </el-form-item>
    <el-form-item label="请求额外参数">
      <el-input v-model="optionsModel.data" />
    </el-form-item> -->
    <el-form-item label="发送cookie凭证">
      <el-switch v-model="optionsModel.withCredentials" />
    </el-form-item>
    <el-form-item label="文件大小(MB)">
      <el-input-number v-model="optionsModel.fileMaxSize" />
    </el-form-item>
    <el-form-item label="上传数量">
      <el-input-number v-model="optionsModel.limit" />
    </el-form-item>
    <el-form-item label="上传文件类型">
      <el-select
        v-if="settingData.type === 'upload-file'"
        v-model="optionsModel.fileTypes"
        multiple
      >
        <el-option label="doc" value="doc" />
        <el-option label="docx" value="docx" />
        <el-option label="xlsx" value="xlsx" />
        <el-option label="xls" value="xls" />
      </el-select>
      <el-select v-else v-model="optionsModel.fileTypes" multiple>
        <el-option label="png" value="png" />
        <el-option label="jpeg" value="jpeg" />
        <el-option label="jpg" value="jpg" />
      </el-select>
    </el-form-item>
    <el-dialog
      v-model="dialogVisible"
      class="ex-upload"
      title="参数设置"
      @open="handleOpen"
      @close="handleClose"
      draggable
      destroy-on-close
    >
      <el-form-item class="ex-upload-item" label-width="0" size="default">
        <div class="ex-upload-box">
          <el-tooltip effect="light" placement="bottom" trigger="click">
            <el-button class="ex-upload-button" type="primary" title="请求方式">
              {{ optionsModel.method }}
            </el-button>
            <template #content>
              <div class="ex-data-table-btn">
                <el-button
                  v-for="(item, index) of METHOD_LIST"
                  :key="index"
                  @click="handleSelectMethod(optionsModel, item)"
                  text
                >
                  {{ item }}
                </el-button>
              </div>
            </template>
          </el-tooltip>
          <el-input
            class="ex-upload-input"
            v-model="optionsModel.action"
            placeholder="url"
          />
        </div>
      </el-form-item>
      <el-radio-group v-model="active" size="default" @change="changeActive">
        <el-radio-button label="headers" title="请求头" />
        <el-radio-button label="data" title="额外参数" />
      </el-radio-group>
      <div class="ex-upload-options">
        <el-row class="ex-options_row">
          <el-col :span="2"></el-col>
          <el-col :span="11">key</el-col>
          <el-col :span="11">value</el-col>
        </el-row>
        <el-scrollbar ref="scrollbarRef" height="300px">
          <el-row
            class="ex-upload-row"
            v-for="(item, index) of optionsList"
            :key="index"
            :gutter="1"
          >
            <el-col class="ex-upload-del" :span="2">
              <el-button
                v-if="index !== optionsList.length - 1"
                icon="Delete"
                @click="handleDelete(index)"
                plain
                circle
              />
            </el-col>
            <el-col :span="11">
              <el-input
                class="ex-upload-input"
                v-model="item.key"
                @input="onInput(index)"
                size="default"
                placeholder="key"
              />
            </el-col>
            <el-col :span="11">
              <el-input
                class="ex-upload-input"
                v-model="item.value"
                @input="onInput(index)"
                size="default"
                placeholder="value"
              />
            </el-col>
          </el-row>
        </el-scrollbar>
      </div>
      <template #footer>
        <div style="display: flex; justify-content: center">
          <el-button size="default" @click="dialogVisible = false">
            关闭
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import { ElScrollbar } from "element-plus";
import { desPropertyProps } from "../property";
import { METHOD_LIST } from "@exercise-form/core";

interface optionsKeys {
  key: string;
  value: string;
}

const props = defineProps(desPropertyProps);

const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>();
const selectWidget = props.designer.selectWidget;
const optionsList = ref<optionsKeys[]>([]);
const dialogVisible = ref(false);
const active = ref("headers");

const handleOpen = () => {
  active.value = "headers";
  optionsList.value = props.optionsModel.headers
    ? getKeys(props.optionsModel.headers)
    : [{ key: "", value: "" }];
};

const getKeys = (data: { [key: string]: any }) => {
  let keysArr: optionsKeys[] = [];
  for (const key in data) {
    keysArr.push({ key, value: data[key] });
  }
  keysArr.push({ key: "", value: "" });
  return keysArr;
};

const setKeys = (list: optionsKeys[]) => {
  let keys: { [key: string]: any } = {};
  list.forEach((item) => {
    if (item.key) keys[item.key] = item.value;
  });
  return keys;
};

const changeActive = (value: string) => {
  if (value === "headers") {
    handleDisposeData();
    optionsList.value = props.optionsModel.headers
      ? getKeys(props.optionsModel.headers)
      : [{ key: "", value: "" }];
  } else {
    handleDisposeHeaders();
    optionsList.value = props.optionsModel.data
      ? getKeys(props.optionsModel.data)
      : [{ key: "", value: "" }];
  }
};

const handleDisposeHeaders = () => {
  selectWidget.value.options.headers = setKeys(optionsList.value);
};

const handleDisposeData = () => {
  selectWidget.value.options.data = setKeys(optionsList.value);
};

const handleSelectMethod = (options: { [key: string]: any }, value: string) => {
  options.method = value;
};

const onInput = (index: number) => {
  if (index === optionsList.value.length - 1) {
    optionsList.value.push({ key: "", value: "" });
    nextTick(() => {
      let wrapRef = scrollbarRef.value!.wrapRef;
      scrollbarRef.value!.setScrollTop(wrapRef!.scrollHeight);
    });
  }
};

const handleDelete = (index: number) => {
  optionsList.value.splice(index, 1);
};

const handleClose = () => {
  if (active.value === "headers") {
    handleDisposeHeaders();
  } else {
    handleDisposeData();
  }
};
</script>
