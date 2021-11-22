// eslint-disable-next-line import/no-commonjs
module.exports = {
  env: {
    browser: true, // For frontend only
    es2020: true,
    jest: true,
  },
  extends: ['algolia', 'algolia/jest', 'algolia/react', 'algolia/typescript'],
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
    'consistent-return': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',

    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      { accessibility: 'no-public' },
    ],
    'react/react-in-jsx-scope': 'off',

    // TMP
    'jsdoc/check-examples': ['off'],
  },
};
