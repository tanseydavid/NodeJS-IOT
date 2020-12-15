const Database = require('./Database.js');
const db = new Database({
     host: '0.0.0.0',
     user: process.env.DB_USERNAME,
     password: process.env.DB_PASS,
     database: 'classicmodels'
});
module.exports = db;
