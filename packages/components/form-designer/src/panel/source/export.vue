<template>
  <div class="ex-source ex-upload">
    <el-dialog
      v-model="showExportData"
      width="800"
      title="导出数据"
      @close="cancel"
      destroy-on-close
      draggable
      :close-on-click-modal="false"
    >
      <el-tabs type="border-card">
        <el-tab-pane label="选择导出数据源">
          <el-scrollbar height="300px">
            <el-checkbox-group v-model="checkList" @change="changeCheckbox">
              <ul class="ex-source-list">
                <li v-for="(item, index) of dataSources" :key="index">
                  <div class="ex-source-box">
                    <div class="ex-source-list_title">
                      {{ item.name }}
                    </div>
                    <el-checkbox :label="index" size="default">
                      导出选中
                    </el-checkbox>
                  </div>
                  <div class="ex-source-list-box">
                    <div class="ex-source-list_icon">
                      <el-icon><Platform /></el-icon>
                    </div>
                    <el-divider direction="vertical" />
                    <div class="ex-source-list_content">
                      {{ item.requestUrl }}
                    </div>
                  </div>
                </li>
              </ul>
            </el-checkbox-group>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="导出结果预览">
          <ex-code-editor
            v-model="codeValue"
            disabled
            :dark="dark"
            lang="json"
          />
        </el-tab-pane>
      </el-tabs>
      <template #footer>
        <el-button type="primary" v-copy="codeValue"> 复制JSON </el-button>
        <el-button @click="cancel">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import { copy as vCopy } from "@exercise-form/directives";
import { darkKeys } from "../../form-designer";
import { DesFormSource } from "@exercise-form/core";

const dark = inject(darkKeys);
const dataSources = ref<DesFormSource[]>([]);
const showExportData = ref(false);
const codeValue = ref("");
const checkList = ref([]);

const handleOpen = (params: DesFormSource[]) => {
  checkList.value = [];
  dataSources.value = params;
  showExportData.value = true;
};

const changeCheckbox = (value: number[]) => {
  let arr: DesFormSource[] = [];
  for (var i = 0; i < value.length; i++) {
    arr.push(dataSources.value[value[i]]);
  }
  codeValue.value = JSON.stringify(arr, null, 2);
};

const cancel = () => {
  showExportData.value = false;
};

defineExpose({ handleOpen });
</script>
