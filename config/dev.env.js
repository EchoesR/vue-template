'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"https://www.easy-mock.com/mock/5c3ef00a59a16703c68543eb/api"'
})
