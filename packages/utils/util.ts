export const deepClone = (source: any) => {
  if (!source && typeof source !== "object") {
    throw new Error("error arguments,deepClone");
  }
  const targetObj: any = source.constructor === Array ? [] : {};
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === "object") {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
};

// 生成uuid
export const getUniqueId = () => {
  let uuid = Math.random().toString(36).substr(2, 5);
  return uuid;
};
