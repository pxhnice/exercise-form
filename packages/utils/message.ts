import { ElMessage, ElLoading } from "element-plus";

export const onMessage = (message: string) => {
  ElMessage({ message });
};
export const onMessageSuccess = (message: string) => {
  ElMessage({
    message,
    type: "success"
  });
};
export const onMessageWarning = (message: string) => {
  ElMessage({
    message,
    type: "warning"
  });
};
export const onMessageError = (message: string) => {
  ElMessage({
    message,
    type: "error"
  });
};

let loading: any;
export const onLoading = (text = "加载中") => {
  loading = ElLoading.service({
    lock: true,
    text,
    background: "rgba(0, 0, 0, 0.7)"
  });
};
export const closeLoading = () => {
  loading.close();
};

export default {
  onLoading,
  closeLoading,
  onMessage,
  onMessageSuccess,
  onMessageWarning,
  onMessageError
};
