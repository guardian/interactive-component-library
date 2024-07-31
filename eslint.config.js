import js from "@eslint/js"
import prettierConfig from "eslint-config-prettier"
import react from "eslint-plugin-react"
import hooks from "eslint-plugin-react-hooks"
import vitest from "eslint-plugin-vitest"
import globals from "globals"

export default [
  {
    ignores: ["dist/**/*", "storybook-static/", ".vscode/"],
  },
  {
    ...js.configs.recommended,
    rules: {
      "prefer-rest-params": "error",
      "no-unused-vars": "error",
    },
  },
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser },
      parserOptions: {
        ecmaFeatures: {
          modules: true,
          impliedStrict: true,
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        pragma: "h",
        version: "16.0",
      },
    },
    plugins: { "react-hooks": hooks },
    rules: {
      ...hooks.configs.recommended.rules,
      "react/prop-types": "off",
      "react-hooks/exhaustive-deps": "error",
    },
  },
  {
    files: ["**/*.test.{js,jsx,ts,tsx}"],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      "vitest/max-nested-describe": ["error", { max: 3 }],
    },
  },
  prettierConfig,
]
