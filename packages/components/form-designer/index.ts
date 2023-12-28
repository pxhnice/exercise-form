import formDesigner from "./src/form-designer.vue";
import { withInstall } from "@exercise-form/utils";

export const ExFormDesigner = withInstall(formDesigner);
export default ExFormDesigner;

export * from "./src/form-designer";
