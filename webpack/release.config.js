const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
  mode: 'development',
  externals: {
    'redux': 'redux',
    'redux-saga': 'redux-saga',
    'eosjs': 'eosjs',
    'is-plain-object': 'is-plain-object',
    'deepmerge': 'deepmerge',
    'scatterjs-core':'scatterjs-core',
    'scatterjs-plugin-eosjs ':'scatterjs-plugin-eosjs '
  }
});