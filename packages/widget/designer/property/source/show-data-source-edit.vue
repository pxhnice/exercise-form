<template>
  <div>
    <el-form-item label="使用数据源">
      <el-switch
        v-model="optionsModel.showDataSource"
        @change="changeShowSource"
      />
    </el-form-item>
    <el-form-item v-if="showDataSource" label="指定数据源">
      <el-select
        v-model="optionsModel.dataSourceName"
        :teleported="false"
        @change="changeSource"
      >
        <el-option
          v-for="(item, index) of formConfig.dataSources"
          :key="index"
          :value="item.name"
          :label="item.name"
        />
      </el-select>
    </el-form-item>
    <el-form-item v-if="sources.showMultiData" label="指定数据集">
      <el-select v-model="optionsModel.dataSourceSetName" :teleported="false">
        <el-option
          v-for="(item, index) of sources.multiData"
          :key="index"
          :value="item.name"
          :label="item.name"
        />
      </el-select>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { desPropertyProps } from "../property";
import {
  DesSourceForm,
  getSourceForm
} from "@exercise-form/components/form-designer/src/panel/source/source";

const props = defineProps(desPropertyProps);

const formConfig = props.designer.desFormConfig;
const sources = ref<DesSourceForm>(getSourceForm());
const showDataSource = computed(
  () => props.optionsModel.showDataSource && formConfig.value.dataSources
);

const getSource = (name: string) => {
  let dataSources: DesSourceForm[] = formConfig.value.dataSources;
  dataSources.forEach((item) => {
    if (name == item.name) sources.value = item;
  });
};

const changeShowSource = (value: boolean) => {
  value ? initSource() : (sources.value = getSourceForm());
};

const changeSource = (value: string) => {
  getSource(value);
};

const initSource = () => {
  let { showDataSource, dataSourceName } = props.optionsModel;
  if (showDataSource && dataSourceName) {
    getSource(dataSourceName);
  } else {
    sources.value = getSourceForm();
  }
};

watch(
  () => props.settingData,
  () => {
    initSource();
  }
);

initSource();
</script>
