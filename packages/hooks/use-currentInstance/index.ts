import { getCurrentInstance } from "vue";
import type { ComponentInternalInstance } from "vue";
const userCurrentInstance = () => {
  let { appContext } = getCurrentInstance() as ComponentInternalInstance;
  const proxy = appContext.config.globalProperties;
  const app = appContext.app;
  return {
    proxy,
    app,
    appContext,
  };
};
export default userCurrentInstance;
