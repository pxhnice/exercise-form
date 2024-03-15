<template>
  <el-form-item
    :label="widgetData.options.label"
    :required="widgetData.options.required"
    :label-width="widgetData.options.labelWidth"
  >
    <el-checkbox-group @click.stop v-model="selectValue">
      <template v-if="widgetData.options.buttonMode">
        <el-checkbox-button
          v-for="item in options"
          :key="item[value]"
          :label="item[value]"
        >
          {{ item[label] }}
        </el-checkbox-button>
      </template>
      <template v-else>
        <el-checkbox
          :style="{ display: widgetData.options.displayStyle ?? 'inline-flex' }"
          :border="widgetData.options.border"
          :disabled="widgetData.options.disabled"
          v-for="item in options"
          :key="item[value]"
          :label="item[value]"
        >
          {{ item[label] }}
        </el-checkbox>
      </template>
    </el-checkbox-group>
  </el-form-item>
</template>

<script setup lang="ts">
import { desFieldsProps } from "./fields";
import { useOptions } from "@exercise-form/hooks";

const props = defineProps(desFieldsProps);

const { selectValue, options, label, value } = useOptions(props.widgetData);
</script>
