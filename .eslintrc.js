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

    'arrow-body-style': 'off',
    'no-console': 'off',
    'no-continue': 'off',
    'no-loop-func': 'off',
    // eslint-disable-next-line no-warning-comments
    'no-undef': 'off', // TODO: find how to remove "ESLint: 'JSX' is not defined." errors properly
    'consistent-return': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',

    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      { accessibility: 'no-public' },
    ],
  },
};
