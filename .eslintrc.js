module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  rules: {
    quotes: [2, 'backtick'],
    '@typescript-eslint/interface-name-prefix': [
      'error',
      'always',
    ],
  },
  root: true,
  env: {
    node: true,
    jest: true,
  },
};
