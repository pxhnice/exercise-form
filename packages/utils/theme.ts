function cutColor(color: string) {
  const el = document.getElementById("ex-designer");
  if (el) {
    getComputedStyle(el).getPropertyValue(`--el-color-primary`);
    // 设置 css 变量
    el.style.setProperty("--el-color-primary", color);
    for (let i = 1; i <= 9; i++) {
      el.style.setProperty(
        `--el-color-primary-light-${i}`,
        getLightColor(color, i / 10)
      );
      el.style.setProperty(
        `--el-color-primary-dark-${i}`,
        getDarkColor(color, i / 10)
      );
    }
  }
}

// hex颜色转rgb颜色
function hexToRgb(str: string) {
  str = str.replace("#", "");
  let hex: any = str.match(/../g);
  for (let i = 0; i < 3; i++) {
    hex[i] = parseInt(hex[i], 16);
  }
  return hex;
}

// rgb颜色转Hex颜色
function rgbToHex(r: number, g: number, b: number) {
  let hex = [r.toString(16), g.toString(16), b.toString(16)];
  for (let i = 0; i < 3; i++) {
    if (hex[i].length == 1) {
      hex[i] = `0${hex[i]}`;
    }
  }
  return `#${hex.join("")}`;
}

// 变浅颜色值
function getLightColor(color: string, level: number) {
  let rgb: any = hexToRgb(color);
  for (let i = 0; i < 3; i++) {
    rgb[i] = Math.floor((255 - rgb[i]) * level + rgb[i]);
  }
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
}

// 变深颜色值
function getDarkColor(color: string, level: number) {
  let rgb: any = hexToRgb(color);
  for (let i = 0; i < 3; i++) {
    rgb[i] = Math.floor(rgb[i] * (1 - level));
  }
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
}

// 切换主题色
export function themeSwitcher(color: string) {
  cutColor(color);
}

//黑夜模式
export function cutNight(isNight: boolean) {
  const el = document.getElementById("ex-designer");
  if (el) {
    if (isNight) el.setAttribute("class", "ex-form-layout ex-dark");
    else el.setAttribute("class", "ex-form-layout");
  }
}
