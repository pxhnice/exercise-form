export function deepClone<T>(value: T): T {
  /** 空 */
  if (!value) return value;
  /** 数组 */
  if (Array.isArray(value))
    return value.map((item) => deepClone(item)) as unknown as T;
  /** 日期 */
  if (value instanceof Date) return new Date(value) as unknown as T;
  /** 普通对象 */
  if (typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]: [string, any]) => {
        return [k, deepClone(v)];
      })
    ) as unknown as T;
  }
  /** 基本类型 */
  return value;
}

// 生成uuid
export const getUniqueId = () => {
  let uuid = Math.random().toString(36).substr(2, 5);
  return uuid;
};
