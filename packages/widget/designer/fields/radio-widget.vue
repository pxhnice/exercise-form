<template>
  <el-form-item
    :label="widgetData.options.label"
    :required="widgetData.options.required"
    :label-width="widgetData.options.labelWidth"
  >
    <el-radio-group @click.stop v-model="fieldValue">
      <template v-if="widgetData.options.buttonMode">
        <el-radio-button
          v-for="item in optionsItem"
          :key="item.value"
          :label="item.value"
        >
          {{ item.label }}
        </el-radio-button>
      </template>
      <template v-else>
        <el-radio
          v-for="item in optionsItem"
          :key="item.value"
          :label="item.value"
        >
          {{ item.label }}
        </el-radio>
      </template>
    </el-radio-group>
  </el-form-item>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { desFieldsProps } from "./fields";

const props = defineProps(desFieldsProps);

const fieldValue: any = ref(null);
const optionsItem = props.widgetData.options.optionsItem;
</script>
