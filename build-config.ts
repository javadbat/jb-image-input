import type { ReactComponentBuildConfig, WebComponentBuildConfig } from "../../tasks/build/builder/src/types.ts";

export const webComponentList: WebComponentBuildConfig[] = [
  {
    name: "jb-image-input",
    path: "./lib/jb-image-input.ts",
    outputPath: "./dist/jb-image-input.js",
    umdName: "JBDateImageInput",
    external: ["jb-validation","jb-core","jb-core/i18n", "jb-core/theme"],
    globals: {
      "jb-validation": "JBValidation",
      "jb-core":"JBCore",
      "jb-core/theme":"JBCoreTheme",
      "jb-core/i18n":"JBCoreI18N",
    },
  },
];
export const reactComponentList: ReactComponentBuildConfig[] = [
  {
    name: "jb-image-input-react",
    path: "./react/lib/JBImageInput.tsx",
    outputPath: "./react/dist/JBImageInput.js",
    external: ["react", "jb-image-input", "jb-image-input/types", "jb-core", "jb-core/react"],
    globals: {
      react: "React",
      "prop-types": "PropTypes",
      "jb-image-input": "JBImageInput",
      "jb-core":"JBCore",
      "jb-core/react":"JBCoreReact"
    },
    umdName: "JBImageInputReact",
    dir: "./react"
  },
];