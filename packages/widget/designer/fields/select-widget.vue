<template>
  <el-form-item
    class="ex-widget-form_item"
    :label="widgetData.options.label"
    :required="widgetData.options.required"
    :label-width="widgetData.options.labelWidth"
  >
    <el-select
      v-model="selectValue"
      v-bind="widgetData.options"
      :teleported="false"
      :key="selectKey"
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
import { ref, watch } from "vue";
import { desFieldsProps } from "./fields";
import { getRandomNumber } from "@exercise-form/utils";
import { useOptions } from "@exercise-form/hooks";

const props = defineProps(desFieldsProps);

const selectKey = ref(props.widgetData.id);

const { selectValue, options, label, value } = useOptions(props.widgetData);

watch(
  () => props.widgetData.options.multiple,
  () => {
    selectKey.value = selectKey.value + getRandomNumber;
  }
);
</script>
