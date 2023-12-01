import { series, parallel, src, dest } from "gulp";
import autoprefixer from "gulp-autoprefixer";
import gulpSass from "gulp-sass";
import sassLang from "sass";
import { delPath, run, pkgPath, exPath, buildPath } from "./src";

console.log(autoprefixer);

const sass = gulpSass(sassLang);

// 删除打包文件
export const removeDist = () => {
  return delPath(exPath);
};

//打包样式
export const buildStyle = () => {
  console.log(pkgPath, exPath, "sssssssssssssssss");
  return src(`${pkgPath}/components/**/style/**.scss`)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(dest(`${exPath}/es/components`))
    .pipe(dest(`${exPath}/lib/components`));
};

export const buildComponent = async () => {
  run("pnpm run build", `${buildPath}`);
};

export default series(
  async () => removeDist(),
  parallel(
    async () => buildStyle(),
    async () => buildComponent()
  )
);
