import { definePropType, getRandomNumber } from "@exercise-form/utils";
import { DesFormConfig, DesUseWidgetMethods } from "@exercise-form/core";

export const getSourceForm = () => {
  return {
    sourceId: getRandomNumber(),
    name: "",
    describe: "",
    requestUrl: "",
    method: "POST",
    headers: {},
    params: {},
    data: {},
    configHandlerCode: "return config",
    dataHandlerCode: "return result.data.data",
    errorHandlerCode: "onMessageError(error)",
    showMultiData: false,
    multiData: []
  };
};

export const desSourceProps = {
  designer: {
    type: definePropType<DesUseWidgetMethods>(Object),
    default() {
      return {};
    }
  },
  formConfig: {
    type: definePropType<DesFormConfig>(Object),
    default() {
      return {};
    }
  }
};
