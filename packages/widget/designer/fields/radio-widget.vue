<template>
  <el-form-item
    :label="widgetData.options.label"
    :required="widgetData.options.required"
    :label-width="widgetData.options.labelWidth"
  >
    <el-radio-group @click.stop v-model="selectValue">
      <template v-if="widgetData.options.buttonMode">
        <el-radio-button
          v-for="item in options"
          :key="item[value]"
          :label="item[value]"
        >
          {{ item[label] }}
        </el-radio-button>
      </template>
      <template v-else>
        <el-radio
          :border="widgetData.options.border"
          :disabled="widgetData.options.disabled"
          v-for="item in options"
          :key="item[value]"
          :label="item[value]"
        >
          {{ item[label] }}
        </el-radio>
      </template>
    </el-radio-group>
  </el-form-item>
</template>

<script setup lang="ts">
import { desFieldsProps } from "./fields";
import { useOptions } from "@exercise-form/hooks";

const props = defineProps(desFieldsProps);

const { selectValue, options, label, value } = useOptions(props.widgetData);
</script>
