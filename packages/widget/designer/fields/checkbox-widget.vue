<template>
  <el-form-item
    :label="widgetData.options.label"
    :required="widgetData.options.required"
    :label-width="widgetData.options.labelWidth"
  >
    <el-checkbox-group @click.stop v-model="fieldValue">
      <template v-if="widgetData.options.buttonMode">
        <el-checkbox-button
          v-for="item in optionsItem"
          :key="item.value"
          :label="item.value"
        >
          {{ item.label }}
        </el-checkbox-button>
      </template>
      <template v-else>
        <el-checkbox
          v-for="item in optionsItem"
          :key="item.value"
          :label="item.value"
        >
          {{ item.label }}
        </el-checkbox>
      </template>
    </el-checkbox-group>
  </el-form-item>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { desFieldsProps } from "./fields";

const props = defineProps(desFieldsProps);
const fieldValue: any = ref([]);
const optionsItem = ref(props.widgetData.options.optionsItem);
</script>

<style lang="scss" scoped>
label {
  font-weight: 400;
}
</style>
