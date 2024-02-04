<template>
  <div class="ex-rich-text">
    <Toolbar class="ex-rich-text_toolbar" :editor="editorRef" />
    <Editor
      class="ex-rich-text_editor"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, onBeforeUnmount } from "vue";
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { IDomEditor, IEditorConfig } from "@wangeditor/editor";

type Config = {
  placeholder: string;
  readOnly: boolean;
};

const props = withDefaults(defineProps<Config>(), {
  placeholder: "请输入内容...",
  readOnly: false
});

const editorRef = shallowRef<IDomEditor>();
const valueHtml = ref("");

const editorConfig: Partial<IEditorConfig> = {
  placeholder: props.placeholder,
  readOnly: props.readOnly
};

const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor;
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>
