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
import { desPropertyProps } from "./property";

const props = defineProps(desPropertyProps);
const lastValue = ref();

watch(
  () => props.optionsModel.name,
  (val, old) => {
    if (old) lastValue.value = old;
  }
);

const validateKey = (rule: any, value: any, callback: any) => {
  if (value == "") {
    callback(new Error("需要唯一标识"));
    // props.optionsModel.name = lastValue.value;
  } else {
    callback();
  }
};
</script>
