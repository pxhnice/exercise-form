import { ElMessage, ElLoading } from "element-plus";

export function onMessage(message: string) {
  ElMessage({ message });
}
export function onMessageSuccess(message: string) {
  ElMessage({
    message,
    type: "success"
  });
}
export function onMessageWarning(message: string) {
  ElMessage({
    message,
    type: "warning"
  });
}
export function onMessageError(message: string) {
  ElMessage({
    message,
    type: "error"
  });
}

let loading: any;
export function onLoading(text = "加载中") {
  loading = ElLoading.service({
    lock: true,
    text,
    background: "rgba(0, 0, 0, 0.7)"
  });
}
export function closeLoading() {
  loading.close();
}

export default {
  onLoading,
  closeLoading,
  onMessage,
  onMessageSuccess,
  onMessageWarning,
  onMessageError
};
