<template>
  <el-steps @click.stop :active="active">
    <el-step
      v-for="item in optionsItem"
      :key="item.value"
      :title="item.value"
    />
  </el-steps>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { desFieldsProps } from "./fields";

const props = defineProps(desFieldsProps);

const active = ref();
const optionsItem = ref(props.widgetData.options.optionsItem);
</script>
