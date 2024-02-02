<template>
  <el-form-item
    :label="widgetData.options.label"
    :required="widgetData.options.required"
    :label-width="widgetData.options.labelWidth"
  >
    <div class="ex-rich-text">
      <Toolbar
        class="ex-rich-text_toolbar"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
      />
      <Editor
        class="ex-rich-text_editor"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        @onCreated="handleCreated"
      />
    </div>
  </el-form-item>
</template>

<script setup lang="ts">
import { ref, shallowRef, onBeforeUnmount } from "vue";
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { IDomEditor } from "@wangeditor/editor";
import { desFieldsProps } from "./fields";

defineProps(desFieldsProps);

const editorRef = shallowRef<IDomEditor>();
const valueHtml = ref("");
const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容..." };

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
