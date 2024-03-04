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
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['react', 'compat'],
  globals: {
    expect: true,
    browser: true,
    global: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'import/export': 0,
    'import/no-unresolved': 0,

    /**
     * Preact / JSX rules
     */
    'react/prop-types': 0,
    'react/no-deprecated': 2,
    'react/no-unknown-property': 0,
    'react/react-in-jsx-scope': 0, // handled this automatically
    'react/display-name': [1, { ignoreTranspilerName: false }],
    'react/jsx-no-bind': [
      1,
      {
        ignoreRefs: true,
        allowFunctions: true,
        allowArrowFunctions: true,
      },
    ],
    'react/jsx-no-comment-textnodes': 2,
    'react/jsx-no-duplicate-props': 2,
    'react/jsx-no-target-blank': 2,
    'react/jsx-no-undef': 2,
    'react/jsx-tag-spacing': [2, { beforeSelfClosing: 'always' }],
    'react/jsx-uses-react': 2, // debatable
    'react/jsx-uses-vars': 2,
    'react/jsx-key': [2, { checkFragmentShorthand: true }],
    'react/self-closing-comp': 2,
    'react/prefer-es6-class': 2,
    'react/prefer-stateless-function': 1,
    'react/require-render-return': 2,
    'react/no-danger': 1,
    // Legacy APIs not supported in Preact:
    'react/no-did-mount-set-state': 2,
    'react/no-did-update-set-state': 2,
    'react/no-find-dom-node': 2,
    'react/no-is-mounted': 2,
    'react/no-string-refs': 2,

    /**
     * Hooks
     */
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 1,

    /**
     * General JavaScript error avoidance
     */
    'constructor-super': 2,
    'no-caller': 2,
    'no-const-assign': 2,
    'no-delete-var': 2,
    'no-dupe-class-members': 2,
    'no-dupe-keys': 2,
    'no-duplicate-imports': 2,
    'no-else-return': 1,
    'no-empty-pattern': 0,
    'no-empty': 0,
    'no-extra-parens': 0,
    'no-iterator': 2,
    'no-lonely-if': 2,
    'no-mixed-spaces-and-tabs': [1, 'smart-tabs'],
    'no-multi-str': 1,
    'no-new-wrappers': 2,
    'no-proto': 2,
    'no-redeclare': 2,
    'no-shadow-restricted-names': 2,
    'no-shadow': 0,
    'no-spaced-func': 2,
    'no-this-before-super': 2,
    'no-undef-init': 2,
    'no-unneeded-ternary': 2,
    'no-unused-vars': [
      2,
      {
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],
    'no-useless-call': 1,
    'no-useless-computed-key': 1,
    'no-useless-concat': 1,
    'no-useless-constructor': 1,
    'no-useless-escape': 1,
    'no-useless-rename': 1,
    'no-var': 1,
    'no-with': 2,
  },
}
