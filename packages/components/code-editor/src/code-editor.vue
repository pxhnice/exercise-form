<template>
  <div class="ex-codemirror">
    <Codemirror
      v-model="codeValue"
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
import { computed } from "vue";
import { Codemirror } from "vue-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { codeEditorProps, codeEditorEmits, langs } from "./code-editor";

defineOptions({ name: "ex-code-editor" });
const emits = defineEmits(codeEditorEmits);
const props = defineProps(codeEditorProps);
const extensions = props.dark
  ? [langs[props.lang], oneDark]
  : [langs[props.lang]];

const codeValue = computed({
  get: () => props.modelValue,
  set: (val) => val
});

const onChange = (value: string) => {
  emits("update:modelValue", value);
};
</script>
