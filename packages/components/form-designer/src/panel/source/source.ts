import { definePropType, getRandomNumber } from "@exercise-form/utils";
import { DesFormConfig } from "@exercise-form/constants";

type RequestData = { [key: string]: any };

type DesMultiData = {
  name: string;
  remark: string;
};

export interface DesSourceForm {
  sourceId: number;
  name: string;
  describe: string;
  requestUrl: string;
  method: string;
  headers: RequestData;
  params: RequestData;
  data: RequestData;
  configHandlerCode: string;
  dataHandlerCode: string;
  errorHandlerCode: string;
  showMultiData: boolean;
  multiData: DesMultiData[];
}

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
    type: Object,
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
