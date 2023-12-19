<template>
  <div v-if="initType(settingData)">
    <el-form-item label="类型选择">
      <el-select v-model="optionsModel.type" :teleported="false">
        <el-option
          v-for="item in options"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        />
      </el-select>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { dateOptions, dateRangeOptions } from "@exercise-form/constants";
import { desPropertyProps } from "./property";

const props = defineProps(desPropertyProps);
const options: any = ref([]);

const initType = (params: any) => {
  let types = ["date-picker"];
  let is = types.includes(params.type);
  if (is) {
    options.value = props.optionsModel.isRange ? dateRangeOptions : dateOptions;
  }
  return is;
};
</script>
