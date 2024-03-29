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

// 生成随机数字
export function getRandomNumber() {
  let randomNumber;
  let generatedNumbers: Array<number> = [];
  do {
    randomNumber = Math.floor(Math.random() * 100000000);
  } while (
    generatedNumbers.includes(randomNumber) ||
    String(randomNumber).length !== 8
  );
  generatedNumbers.push(randomNumber);
  return randomNumber;
}

// 获取全局css
export function getGlobalCss(str: string) {
  let rules: Array<string> = str.match(/[^.]+(?={)|[^.]+(?=,)/g) ?? [];
  rules = rules.map((item) => item.trim());
  rules = Array.from(new Set([...rules]));
  return rules;
}
