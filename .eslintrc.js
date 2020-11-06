module.exports = {

  env: {

    browser: true,

    commonjs: true,

    es2021: true,

  },

  extends:

    'airbnb',

  parserOptions: {

    ecmaFeatures: {

      jsx: true,

    },

    ecmaVersion: 12,

  },

  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],

    'eol-last': ['error', 'never'],
    'linebreak-style': 0,

  },

};