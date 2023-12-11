export function deepClone<T>(value: T): T {
  if (!value) return value;
  if (Array.isArray(value))
    return value.map((item) => deepClone(item)) as unknown as T;
  if (value instanceof Date) return new Date(value) as unknown as T;
  if (typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]: [string, any]) => {
        return [k, deepClone(v)];
      })
    ) as unknown as T;
  }
  return value;
}

// 生成uuid
export function getUniqueId() {
  let uuid = Math.random().toString(36).substr(2, 5);
  return uuid;
}
