module.exports = {
  extends: 'eslint:recommended',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};
