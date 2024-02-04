<template>
  <el-form-item
    :label="widgetData.options.label"
    :required="widgetData.options.required"
    :label-width="widgetData.options.labelWidth"
  >
    <el-select
      v-model="selectValue"
      v-bind="widgetData.options"
      :teleported="false"
    >
      <el-option
        v-for="item in options"
        :key="item[value]"
        :value="item[value]"
        :label="item[label]"
      />
    </el-select>
  </el-form-item>
</template>

<script setup lang="ts">
import { desFieldsProps } from "./fields";
import { useOptions } from "@exercise-form/hooks";

const props = defineProps(desFieldsProps);

const { selectValue, options, label, value } = useOptions(props.widgetData);
</script>
