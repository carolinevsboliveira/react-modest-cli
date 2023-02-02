module.exports = {
  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['no-comments'],
  rules: {
    'no-comments/disallowComments': [
      'error',
      {
        allow: ['TODO', 'DEBUG'],
      },
    ],
  },
  ignorePaterns: ['bin', 'node_modules'],
}
