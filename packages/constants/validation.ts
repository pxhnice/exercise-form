type ValidatorNameType =
  | "number"
  | "letter"
  | "letterAndNumber"
  | "mobilePhone"
  | "letterStartNumberIncluded"
  | "noChinese"
  | "chinese"
  | "email"
  | "url";

export function getRegExp(validatorName: ValidatorNameType) {
  const commonRegExp: { [key: string]: any } = {
    number: "/^[-]?\\d+(\\.\\d+)?$/",
    letter: "/^[A-Za-z]+$/",
    letterAndNumber: "/^[A-Za-z0-9]+$/",
    phone: "/^[1][3-9][0-9]{9}$/",
    letterStartNumberIncluded: "/^[A-Za-z]+[A-Za-z\\d]*$/",
    noChinese: "/^[^\u4e00-\u9fa5]+$/",
    chinese: "/^[\u4e00-\u9fa5]+$/",
    email: "/^([-_A-Za-z0-9.]+)@([_A-Za-z0-9]+\\.)+[A-Za-z0-9]{2,3}$/",
    url: "/^([hH][tT]{2}[pP]:\\/\\/|[hH][tT]{2}[pP][sS]:\\/\\/)(([A-Za-z0-9-~]+)\\.)+([A-Za-z0-9-~\\/])+$/"
  };

  return commonRegExp[validatorName];
}

export const dataTableValidator = [
  {
    label: "渲染函数",
    options: [
      {
        label: "render",
        value: "render"
      }
    ]
  },
  {
    label: "时间格式",
    options: [
      {
        label: "YYYY-MM-DD",
        value: "YYYY-MM-DD"
      },
      {
        label: "yyyy/MM/dd",
        value: "yyyy/MM/dd"
      },
      {
        label: "yyyy年MM月dd日",
        value: "yyyy年MM月dd日"
      },
      {
        label: "yyyy-MM-dd HH:mm:ss",
        value: "yyyy-MM-dd HH:mm:ss"
      },
      {
        label: "yyyy-MM-dd hh:mm:ss",
        value: "yyyy-MM-dd hh:mm:ss"
      }
    ]
  },
  {
    label: "数字格式",
    options: [
      {
        label: "###,###,###,##0.######",
        value: "###,###,###,##0.######"
      },
      {
        label: "###,###,###,##0.00####",
        value: "###,###,###,##0.00####"
      },
      {
        label: "###,###,###,##0.000000",
        value: "###,###,###,##0.000000"
      },
      {
        label: "###,###,###,##0.000",
        value: "###,###,###,##0.000"
      },
      {
        label: "###,###,###,##0.00",
        value: "###,###,###,##0.00"
      },
      {
        label: "###,###,###,##0",
        value: "###,###,###,##0"
      },
      {
        label: "###,##0.00##%",
        value: "###,##0.00##%"
      }
    ]
  }
];
