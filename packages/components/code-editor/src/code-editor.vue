<template>
  <div>
    <Codemirror
      v-model:code="codeValue"
      :style="{ height: height + 'px' }"
      :extensions="extensions"
      :disabled="disabled"
      :smart-indent="true"
      :auto-refresh="true"
      :line="true"
      @change="onChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Codemirror } from "vue-codemirror";
import "../style/index.scss";
import { codeEditoirProps, codeEditorEmits, langs } from "./code-editor";

defineOptions({ name: "ex-code-editor" });
const emits = defineEmits(codeEditorEmits);
const props = defineProps(codeEditoirProps);
const extensions = [langs[props.lang]];

const codeValue = ref<string>();

watch(
  () => props.modelValue,
  (val) => {
    codeValue.value = val;
  }
);

const onChange = (value: string) => {
  emits("update:modelValue", value);
};
</script>
