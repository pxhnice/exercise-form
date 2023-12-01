import fs from "fs";
import { resolve } from "path";
import { exPath } from "./paths";

const satyFile = ["package.json", "README.md", "global.d.ts"];

export const delPath = async (path: string) => {
  let files: string[] = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(async (file) => {
      const curPath = resolve(path, file);
      if (fs.statSync(curPath).isDirectory()) {
        if (file !== "node_modules") await delPath(curPath);
      } else {
        if (!satyFile.includes(file)) {
          fs.unlinkSync(curPath);
        }
      }
    });
    if (path != exPath) fs.rmdirSync(path);
  }
};

export default delPath;
