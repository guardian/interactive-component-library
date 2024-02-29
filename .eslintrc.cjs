module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      impliedStrict: true,
      jsx: true,
    },
  },
  extends: ['eslint:recommended', 'plugin:import/recommended', 'plugin:react-hooks/recommended'],
  plugins: ['compat', 'react'],
  globals: {
    expect: true,
    browser: true,
    global: true,
  },
  settings: {
    react: {
      // eslint-plugin-preact interprets this as "h.createElement",
      // however we only care about marking h() as being a used variable.
      pragma: 'h',
      version: 'detect',
    },
  },
}
