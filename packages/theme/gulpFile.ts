import { src, dest } from "gulp";
import autoprefixer from "gulp-autoprefixer";
import gulpSass from "gulp-sass";
import cleanCSS from "gulp-clean-css";
import sassLang from "sass";

//打包样式
export const buildStyle = () => {
  const sass = gulpSass(sassLang);
  return src("src/*.scss")
    .pipe(sass())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS())
    .pipe(dest("dist"));
};

export default buildStyle;
