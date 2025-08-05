import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default [
  // Ignorados
  {
    ignores: ["dist/**", "node_modules/**", "*.config.js", "vite.config.js", ".eslintrc.*"],
  },

  /* ------------------------------------------------------------------
     1)  Arquivos SERVERLESS (api/*) — Node.js, pode usar console.log
  ------------------------------------------------------------------ */
  {
    files: ["api/**/*.js"],
    env: { node: true },
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2024,
      },
    },
    rules: {
      "no-console": "off",
    },
  },

  /* ------------------------------------------------------------------
     2)  Arquivos do FRONT (qualquer .js/.jsx fora de api/) — Browser
  ------------------------------------------------------------------ */
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        ...globals.browser,
        ...globals.es2024,
      },
    },
  },
  { files: ["**/*.{js,jsx}"], ...js.configs.recommended },

  /* React + hooks + refresh  */
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "react-refresh": pluginReactRefresh,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_", ignoreRestSiblings: true }],
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "no-console": "off",
      "prefer-const": "warn",
      "no-var": "error",
      "no-debugger": "warn",
      "no-duplicate-imports": "error",
    },
    settings: { react: { version: "detect" } },
  },
];
