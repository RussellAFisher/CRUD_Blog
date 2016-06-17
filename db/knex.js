var config = require('../knexfile');
var knex = require('knex');
var environment = process.env.NODE_ENV || 'development';
module.exports = knex(config[environment]);
