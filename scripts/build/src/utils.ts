import type { ProjectManifest } from "@pnpm/types";
import { exPackage } from "./paths";

const customExternal = [
  "prettier/plugins/html",
  "prettier/plugins/postcss",
  "prettier/plugins/babel",
  "prettier/plugins/estree",
  "@wangeditor/editor/dist/css/style.css"
];

export const getPackageManifest = (pkgPath: string) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(pkgPath) as ProjectManifest;
};

export const getPackageDependencies = (
  pkgPath: string
): Record<"dependencies" | "peerDependencies", string[]> => {
  const manifest = getPackageManifest(pkgPath);
  const { dependencies = {}, peerDependencies = {} } = manifest;

  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies)
  };
};

export const generateExternal = () => {
  const { dependencies, peerDependencies } = getPackageDependencies(exPackage);
  const packages: string[] = [
    ...dependencies,
    ...peerDependencies,
    ...customExternal
  ];
  return [...new Set(packages)];
};
