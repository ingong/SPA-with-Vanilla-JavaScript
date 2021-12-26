module.exports = {
  extends: 'eslint:recommended',
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'warn',
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2015,
  },
};
