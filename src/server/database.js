/**
 * IN-MEMORY DB IMPLMENTATION
 * @type {*|{}}
 */
const loki = require('lokijs');
let database = new loki('users.db');
module.exports = database;