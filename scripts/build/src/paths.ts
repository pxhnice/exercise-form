import { resolve } from "path";

export const proPath = resolve(__dirname, "..", "..", "..");
export const pkgPath = resolve(proPath, "packages");
export const buildPath = resolve(proPath, "scripts", "build");
export const componentPath = resolve(pkgPath, "components");
export const exPath = resolve(pkgPath, "exercise-form");
export const utilPath = resolve(pkgPath, "utils");

// export const pakPath = resolve(__dirname, "../../../");

// export const buildOutput = resolve(proPath, "dist");
// export const exOutput = resolve(buildOutput, "exercise-form");

export const compPackage = resolve(componentPath, "package.json");
export const exPackage = resolve(exPath, "package.json");
export const utilPackage = resolve(utilPath, "package.json");
