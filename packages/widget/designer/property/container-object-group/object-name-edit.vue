<template>
  <el-form-item
    label="对象名称"
    prop="options.objectName"
    :rules="[{ required: true, validator: validateKey }]"
  >
    <el-input type="text" v-model="optionsModel.objectName" />
  </el-form-item>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { FormRules } from "element-plus";
import { desPropertyProps } from "../property";

const props = defineProps(desPropertyProps);

const selectWidget = props.designer.selectWidget;
const lastValue = ref();

watch(
  () => props.optionsModel.objectName,
  (val, old) => {
    if (old) lastValue.value = old;
  }
);

const validateKey = (rule: FormRules, value: string, callback: any) => {
  if (value == "") {
    callback(new Error("需要唯一标识"));
    selectWidget.value.options.objectName = lastValue.value;
  } else {
    callback();
  }
};
</script>
