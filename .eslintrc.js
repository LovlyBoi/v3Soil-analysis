module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/essential'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    process: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    eqeqeq: ['error', 'always'],
    'no-global-assign': ['error', { exceptions: ['Object'] }],
    'no-redeclare': 'error'
  },
}
