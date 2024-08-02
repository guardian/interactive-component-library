import js from "@eslint/js"
import prettierConfig from "eslint-config-prettier"
import react from "eslint-plugin-react"
import hooks from "eslint-plugin-react-hooks"
import vitest from "eslint-plugin-vitest"
import globals from "globals"

export default [
  js.configs.recommended,
  {
    ignores: ["dist/**/*", "storybook-static/", ".vscode/"],
  },
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
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
        version: "17",
      },
    },
    rules: {
      "prefer-rest-params": "error",
      "no-unused-vars": "error",
    },
  },
  {
    ...hooks.configs.recommended,
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "react-hooks": hooks,
    },
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }],
      "react/prop-types": "off",
      "react-hooks/exhaustive-deps": "error",
      // enforce .jsx extension for files that contain jsx
      "react/jsx-filename-extension": [
        "error",
        { allow: "always", extensions: [".jsx"] },
      ],
    },
  },
  {
    files: ["**/*.test.{js,ts}"],
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
