module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-duplicate-imports': 'error',
    'no-use-before-define': ['error', { functions: true, classes: true }],
    'no-var': 'error',
    // note you must disable the base rule as it can report incorrect errors
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '_next' }
    ],
    'prefer-const': 'error',
    eqeqeq: 'error',
    camelcase: 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
