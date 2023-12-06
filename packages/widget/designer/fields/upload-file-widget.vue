<template>
  <el-form-item
    :label="dragData.options.label"
    :required="dragData.options.required"
    :label-width="dragData.options.labelWidth"
  >
    <el-upload v-model:file-list="fileList" v-bind="dragData.options">
      <el-button style="font-style: italic" type="primary" link icon="Plus">
        选择文件
      </el-button>
      <template #tip>
        <!-- <div class="el-upload__tip">
          jpg/png files with a size less than 500KB.
        </div> -->
      </template>
    </el-upload>
  </el-form-item>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import type { UploadUserFile } from "element-plus";
interface WidgetType {
  dragData: any;
}

withDefaults(defineProps<WidgetType>(), {
  dragData: {}
});

const fileList = ref<UploadUserFile[]>([]);
</script>
