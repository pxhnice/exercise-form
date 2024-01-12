<template>
  <el-form-item label="显示格式">
    <el-select v-model="optionsModel.format" :teleported="false">
      <el-option
        v-for="item in options"
        :key="item.value"
        :value="item.value"
        :label="item.label"
      />
    </el-select>
  </el-form-item>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { dateFormatOptions, timeFormatOptions } from "@exercise-form/constants";
import { desPropertyProps } from "./property";

const props = defineProps(desPropertyProps);

const options: any = ref([]);

const initOptions = () => {
  options.value =
    props.settingData.type == "date-picker"
      ? dateFormatOptions
      : timeFormatOptions;
};

initOptions();
</script>
