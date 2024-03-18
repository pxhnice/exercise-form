import { reactive, toRefs, computed } from "vue";
import { DesFormWidget } from "@exercise-form/core";
import { UploadProps } from "element-plus";
import { onMessageError, onLoading, closeLoading } from "@exercise-form/utils";

export const useUpload = (widget: DesFormWidget) => {
  const state = reactive({
    dialogVisible: false,
    dialogImageUrl: ""
  });

  const accept = computed(() => {
    return widget.options.fileTypes.map((t: string) => "." + t).join(",");
  });

  const beforeUpload: UploadProps["beforeUpload"] = (file) => {
    let { fileTypes, fileMaxSize } = widget.options;
    let isFile: boolean = false;
    if (fileTypes.length > 0) {
      let fileExtension = "";
      if (file.name.lastIndexOf(".") > -1) {
        fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
      }
      isFile = fileTypes.some((type: string) => {
        if (file.type.indexOf(type) > -1) return true;
        if (fileExtension && fileExtension.indexOf(type) > -1) return true;
        return false;
      });
    }
    if (!isFile) {
      onMessageError(`文件格式不正确, 请上传${fileTypes.join("/")}格式文件!`);
      return false;
    }

    if (fileMaxSize) {
      const isMax = file.size / 1024 / 1024 < fileMaxSize;
      if (!isMax) {
        onMessageError(`上传文件大小不能超过 ${fileMaxSize} MB!`);
        return false;
      }
    }
    onLoading("上传中,请稍等...");
  };

  const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
    onMessageError(`上传文件数量不能超过 ${widget.options.limit} 个!`);
  };

  const handleSuccess: UploadProps["onSuccess"] = (file, uploadFiles) => {
    closeLoading();
    console.log(file, uploadFiles, "onSuccess");
  };

  const handleRemove: UploadProps["onRemove"] = (file, uploadFiles) => {
    console.log(file, uploadFiles, "onRemove");
  };

  const handlePreview: UploadProps["onPreview"] = (uploadFile) => {
    state.dialogImageUrl = uploadFile.url ?? "";
    state.dialogVisible = true;
  };

  const handleError: UploadProps["onError"] = (error) => {
    closeLoading();
    onMessageError(error.message);
  };

  const beforeRemove: UploadProps["beforeRemove"] = (
    uploadFile,
    uploadFiles
  ) => {
    console.log(uploadFile, uploadFiles, "beforeRemove");
    return true;
  };
  return {
    ...toRefs(state),
    accept,
    handleSuccess,
    handleRemove,
    handlePreview,
    handleExceed,
    handleError,
    beforeRemove,
    beforeUpload
  };
};

export default useUpload;
