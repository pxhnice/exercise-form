<template>
  <el-form-item
    label="唯一标识"
    prop="options.name"
    :rules="[{ required: true, validator: validateKey }]"
  >
    <el-input type="text" v-model="optionsModel.name" />
  </el-form-item>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { FormRules } from "element-plus";
import { desPropertyProps } from "./property";

const props = defineProps(desPropertyProps);

const selectWidget = props.designer.selectWidget;
const lastValue = ref();

watch(
  () => props.optionsModel.name,
  (val, old) => {
    if (old) lastValue.value = old;
  }
);

const validateKey = (rule: FormRules, value: string, callback: any) => {
  if (value == "") {
    callback(new Error("需要唯一标识"));
    selectWidget.value.options.name = lastValue.value;
  } else {
    callback();
  }
};
</script>
