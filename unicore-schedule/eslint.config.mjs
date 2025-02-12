import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }, rules: {
    "quotes": ["error", "double"], 
    "indent": ["error", 2],       
    "semi": ["error", "always"],
    "no-unused-vars": ["warn"]  
  }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];