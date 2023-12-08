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
import "../style/index.scss";
import { codeEditoirProps, codeEditorEmits, langs } from "./code-editor";

defineOptions({ name: "ex-code-editor" });
const emits = defineEmits(codeEditorEmits);
const props = defineProps(codeEditoirProps);
const extensions = [langs[props.lang]];

const codeValue = computed({
  get: () => props.modelValue,
  set: (val) => val
});

const onChange = (value: string) => {
  emits("update:modelValue", value);
};
</script>
<style lang="scss" scoped>
:deep(.cm-editor) {
  outline: none;
}

:deep(.cm-focused) {
  border: none !important;
}

:deep(.cm-scroller) {
  font-family: inherit;
  line-height: 1.6;
  font-size: 12px;
}
</style>
