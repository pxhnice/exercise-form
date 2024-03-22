<template>
  <el-form-item
    :label="widgetData.options.label"
    :required="widgetData.options.required"
    :label-width="widgetData.options.labelWidth"
  >
    <el-upload
      v-model:file-list="fileList"
      v-bind="widgetData.options"
      :hidden="false"
      :accept="accept"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-exceed="handleExceed"
      :before-upload="beforeUpload"
      :before-remove="beforeRemove"
    >
      <el-button type="primary" link icon="Plus"> 选择文件 </el-button>
    </el-upload>
  </el-form-item>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import type { UploadUserFile } from "element-plus";
import { desFieldsProps } from "./fields";
import { useUpload } from "@exercise-form/hooks";

const props = defineProps(desFieldsProps);

const fileList = ref<UploadUserFile[]>([]);

const {
  accept,
  beforeUpload,
  beforeRemove,
  handlePreview,
  handleRemove,
  handleExceed,
  handleSuccess,
  handleError
} = useUpload(props.widgetData);
</script>
