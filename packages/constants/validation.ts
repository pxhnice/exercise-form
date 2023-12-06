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
