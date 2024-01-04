import { copyFile, mkdir } from "fs/promises";
import { parallel, series } from "gulp";

import { buildPath, delPath, exPath, pkgPath, run, themePath } from "./src";

// 删除打包文件
export const removeDist = () => {
  return delPath(exPath);
};

export const copyStyle = async () => {
  await mkdir(`${exPath}/dist`);
  await copyFile(`${pkgPath}/theme/dist/index.css`, `${exPath}/dist/index.css`);
};

export const buildComponent = async () => {
  await run("pnpm run build", `${buildPath}`);
};

export const buildTheme = async () => {
  await run("pnpm -w run build:theme", `${themePath}`);
};

export const buildCss = async () => {
  await buildTheme();
  await copyStyle();
};

export default series(
  async () => removeDist(),
  parallel(
    () => buildCss(),
    () => buildComponent()
  )
);
