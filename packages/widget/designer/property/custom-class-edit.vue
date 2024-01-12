<template>
  <el-form-item label="自定义CSS样式">
    <el-select v-model="optionsModel.customClass" multiple :teleported="false">
      <el-option
        v-for="name in globalCssList"
        :key="name"
        :label="name"
        :value="name"
      />
    </el-select>
  </el-form-item>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { desPropertyProps } from "./property";

const props = defineProps(desPropertyProps);

const globalCssList = computed(() => {
  let str = props.designer.desFormConfig.value.cssCode.replaceAll("\n", "");
  let rules = str.match(/[^.]+(?={)|[^.]+(?=,)/g) ?? [];
  rules = rules.map((item: any) => item.trim()) as RegExpMatchArray;
  rules = Array.from(new Set([...rules])) as RegExpMatchArray;
  return rules;
});
</script>
