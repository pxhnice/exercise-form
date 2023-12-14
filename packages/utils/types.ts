export const isArray = Array.isArray;

export const extend = Object.assign;

export const isObject = (target: unknown) => {
  return typeof target === "object" && target != null;
};

export const isNumber = (val: unknown) => typeof val === "number";

export const isString = (val: unknown) => typeof val === "string";
