module.exports = {
  plugins: [
    'eslint-plugin-tsdoc'
  ],
  extends: 'standard-with-typescript',
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    'tsdoc/syntax': 'error',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false
        }
      }
    ],
    semi: 0,
    '@typescript-eslint/semi': [
      'error',
      'always'
    ],
    'padded-blocks': [
      'error',
      'never'
    ],
    '@typescript-eslint/space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always'
    }],
    'handle-callback-err': 0,
    'node/handle-callback-err': 0,
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/prefer-readonly': 0,
    '@typescript-eslint/no-floating-promises': 0,
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/consistent-type-assertions': 0,
    '@typescript-eslint/lines-between-class-members': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-extraneous-class': 0,
    '@typescript-eslint/restrict-template-expressions': 0,
    '@typescript-eslint/restrict-plus-operands': 0
  }
};
