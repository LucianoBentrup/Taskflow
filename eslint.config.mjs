import { baseConfig } from "@taskflow/eslint-config/base.js";

export default [
  ...baseConfig,
  {
    ignores: ["apps/**", "**/dist/**", "**/.next/**", "**/.turbo/**"],
  },
];
