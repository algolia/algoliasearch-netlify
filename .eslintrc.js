// eslint-disable-next-line import/no-commonjs
module.exports = {
  env: {
    browser: true, // For frontend only
    es2020: true,
    jest: true,
  },
  extends: [
    'algolia',
    'algolia/jest',
    'algolia/typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jest/style',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['prettier', '@typescript-eslint', 'import', 'algolia'],
  rules: {
    'algolia/func-style-toplevel': 'error',

    'no-console': 'off',
    'consistent-return': 'off',

    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      { accessibility: 'no-public' },
    ],
  },
};
