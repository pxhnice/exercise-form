<template>
  <el-drawer
    style="width: 800px"
    v-model="showAddData"
    title="数据源设置"
    direction="ltr"
    destroy-on-close
    @close="cancel"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="95">
      <el-form-item label="唯一名称" prop="name">
        <el-input type="text" v-model="form.name" />
      </el-form-item>
      <el-form-item label="描述信息" prop="describe">
        <el-input type="text" v-model="form.describe" />
      </el-form-item>
      <el-form-item
        class="ex-upload-item"
        label-width="0"
        prop="requestUrl"
        size="default"
      >
        <div class="ex-upload-box">
          <el-tooltip effect="light" placement="bottom" trigger="click">
            <el-button class="ex-upload-button" type="primary" title="请求方式">
              {{ form.method }}
            </el-button>
            <template #content>
              <div class="ex-data-table-btn">
                <el-button
                  v-for="(item, index) of METHOD_LIST"
                  :key="index"
                  @click="handleSelectMethod(item)"
                  text
                >
                  {{ item }}
                </el-button>
              </div>
            </template>
          </el-tooltip>
          <el-input
            class="ex-upload-input"
            v-model="form.requestUrl"
            placeholder="url"
          />
        </div>
      </el-form-item>
      <el-radio-group v-model="active" size="default" @change="changeActive">
        <el-radio-button label="headers" title="请求头" />
        <el-radio-button label="params" title="参数" />
        <el-radio-button label="data" title="发送数据" />
      </el-radio-group>
      <div class="ex-upload-options">
        <el-row class="ex-options_row">
          <el-col :span="2"></el-col>
          <el-col :span="11">key</el-col>
          <el-col :span="11">value</el-col>
        </el-row>
        <el-scrollbar ref="scrollbarRef" height="200">
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
      <el-tabs style="margin-top: 20px" type="border-card">
        <el-tab-pane label="1.请求配置">
          <div class="ex-dialog-box">
            <div class="name-front">( config ) {</div>
            <ex-code-editor
              v-model="form.configHandlerCode"
              :dark="dark"
              height="250"
              lang="json"
            />
            <div class="name-back">}</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="2.数据处理">
          <div class="ex-dialog-box">
            <div class="name-front">( result ) {</div>
            <ex-code-editor
              v-model="form.dataHandlerCode"
              :dark="dark"
              lang="json"
            />
            <div class="name-back">}</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="3.错误处理">
          <div class="ex-dialog-box">
            <div class="name-front">( error ) {</div>
            <ex-code-editor
              v-model="form.errorHandlerCode"
              :dark="dark"
              lang="json"
            />
            <div class="name-back">}</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="4.多数据处理">
          <div class="ex-source-multi_data">
            <el-form-item label="开启多数据集返回" label-width="145px">
              <el-switch v-model="form.showMultiData" />
              <el-button
                style="margin-left: 50px"
                v-if="form.showMultiData"
                type="primary"
                @click="handleAddMultiData"
                icon="Plus"
                link
                >新增数据集
              </el-button>
            </el-form-item>
            <el-scrollbar
              ref="scrollbarMultiDataRef"
              v-if="form.showMultiData"
              max-height="240"
            >
              <el-form-item label="" label-width="130px">
                <el-row
                  v-for="(item, index) of form.multiData"
                  :key="index"
                  :gutter="20"
                >
                  <el-col :span="10">
                    <el-form-item
                      label=""
                      :prop="`multiData[${index}].name`"
                      :rules="multiDataRules.name"
                      label-width="0"
                    >
                      <el-input v-model="item.name" placeholder="名称" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-input v-model="item.remark" placeholder="备注" />
                  </el-col>
                  <el-col :span="4">
                    <el-button
                      icon="Delete"
                      @click="handleDeleteMultiData(index)"
                      plain
                      circle
                    />
                  </el-col>
                </el-row>
              </el-form-item>
            </el-scrollbar>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <template #footer>
      <div class="ex-source_button">
        <el-button type="primary" @click="handleOpenTest">
          测试数据源
        </el-button>
        <div>
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="handleAddConfirm(formRef)">
            确认
          </el-button>
        </div>
      </div>
    </template>
    <ex-source-test ref="exSourceTestRef" />
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, reactive, inject, nextTick } from "vue";
import type { FormInstance, FormRules, ElScrollbar } from "element-plus";
import { METHOD_LIST } from "@exercise-form/constants";
import { onMessageError, isObject, deepClone } from "@exercise-form/utils";
import { darkKeys } from "../../form-designer";
import ExSourceTest from "./test.vue";
import { DesSourceForm, getSourceForm } from "./source";

interface Params {
  sources: DesSourceForm;
  dataSources: DesSourceForm[];
}

interface OptionsKeys {
  key: string;
  value: string;
}

type DataKeys = { [key: string]: any };

const dark = inject(darkKeys);
const formRef = ref<FormInstance>();
const exSourceTestRef = ref();
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>();
const scrollbarMultiDataRef = ref<InstanceType<typeof ElScrollbar>>();
const showAddData = ref(false);
const form = ref<DesSourceForm>(getSourceForm()); //编辑数据源
const sources = ref<DataKeys>(); //原数据源
const rules = reactive<FormRules<DesSourceForm>>({
  name: [
    {
      required: true,
      message: "请填写名称",
      trigger: "change"
    }
  ],
  requestUrl: [
    {
      required: true,
      message: "请填写请求地址",
      trigger: "change"
    }
  ]
});

const multiDataRules = {
  name: [
    {
      required: true,
      message: "请填写",
      trigger: "change"
    }
  ]
};
const optionsList = ref<OptionsKeys[]>([]);
const dataSources = ref<DesSourceForm[]>([]);
const active = ref("headers");
const oldActive = ref("headers");
const isEdit = ref(false);

const getKeys = (data: DataKeys) => {
  let keysArr: OptionsKeys[] = [];
  for (const key in data) {
    keysArr.push({ key, value: data[key] });
  }
  keysArr.push({ key: "", value: "" });
  return keysArr;
};

const setKeys = (list: OptionsKeys[]) => {
  let keys: DataKeys = {};
  list.forEach((item) => {
    if (item.key) keys[item.key] = item.value;
  });
  return keys;
};

const handleOpen = (params: Params) => {
  if (isObject(params.sources)) {
    form.value = deepClone(params.sources);
    sources.value = params.sources;
    isEdit.value = true;
  } else {
    form.value = getSourceForm();
    isEdit.value = false;
  }
  dataSources.value = params.dataSources;
  active.value = "headers";
  oldActive.value = "headers";
  let headers = form.value.headers;
  optionsList.value = headers ? getKeys(headers) : [{ key: "", value: "" }];
  showAddData.value = true;
};

const changeActive = (value: string) => {
  let { headers, data, params } = form.value;
  handleSaveKeys();
  if (value === "headers") {
    optionsList.value = headers ? getKeys(headers) : [{ key: "", value: "" }];
  } else if (value === "data") {
    optionsList.value = data ? getKeys(data) : [{ key: "", value: "" }];
  } else {
    optionsList.value = params ? getKeys(params) : [{ key: "", value: "" }];
  }
  oldActive.value = value;
};

const handleSaveKeys = () => {
  if (oldActive.value === "headers") {
    form.value.headers = setKeys(optionsList.value);
  } else if (oldActive.value === "data") {
    form.value.data = setKeys(optionsList.value);
  } else {
    form.value.params = setKeys(optionsList.value);
  }
};

const handleSelectMethod = (value: string) => {
  form.value.method = value;
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

const handleAddMultiData = () => {
  if (!form.value.multiData) form.value.multiData = [];
  form.value.multiData.push({ name: "", remark: "" });
  nextTick(() => {
    let wrapRef = scrollbarMultiDataRef.value!.wrapRef;
    scrollbarMultiDataRef.value!.setScrollTop(wrapRef!.scrollHeight);
  });
};

const handleDeleteMultiData = (index: number) => {
  form.value.multiData.splice(index, 1);
};

const handleOpenTest = () => {
  handleSaveKeys();
  exSourceTestRef.value!.handleOpen(form.value);
};

const handleAddConfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      handleSaveKeys();
      let has = dataSources.value.some(
        (item) =>
          item.name == form.value.name && item.sourceId != form.value.sourceId
      );
      if (has) {
        onMessageError("据源名称重复，请修改!");
        return;
      }
      if (isEdit.value) {
        let formData = form.value as DataKeys;
        for (const key in formData) {
          if (sources.value) {
            sources.value[key] = formData[key];
          }
        }
        showAddData.value = false;
      } else {
        dataSources.value.push(form.value);
        showAddData.value = false;
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};

const cancel = () => {
  showAddData.value = false;
};

defineExpose({ handleOpen });
</script>
