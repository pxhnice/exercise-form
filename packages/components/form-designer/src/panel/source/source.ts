import { definePropType } from "@exercise-form/utils";
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
