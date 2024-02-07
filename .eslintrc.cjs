module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:storybook/recommended', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'off',
    'no-console': 'warn',
  },
}
