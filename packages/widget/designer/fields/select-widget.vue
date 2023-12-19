<template>
  <el-form-item
    :label="widgetData.options.label"
    :required="widgetData.options.required"
    :label-width="widgetData.options.labelWidth"
  >
    <el-select v-model="value" :teleported="false">
      <el-option
        v-for="item in optionsItem"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </el-form-item>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { desFieldsProps } from "./fields";

const props = defineProps(desFieldsProps);
const value = ref();
const optionsItem = ref(props.widgetData.options.optionsItem);
</script>
