module.exports = {
  root: true,
  plugins: ['jest', 'vuetify'],
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/recommended', 'plugin:prettier/recommended', 'prettier/vue'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'vuetify/no-deprecated-classes': 'error',
    'vuetify/grid-unknown-attributes': 'error',
    'vuetify/no-legacy-grid': 'error',
    'no-unused-vars': 'off',
  },
}
