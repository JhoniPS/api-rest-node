import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["*.js"],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 12,
      sourceType: "module",
    },
    rules: {
      indent: ["error", 2],
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "single"],
      semi: ["error", "always"],
      "no-console": "off",
      "no-undef": "off",
    },
  },
  pluginJs.configs.recommended,
];
