const Database = require('./Database.js');
const db = new Database({
     host: process.env.DB_HOST,
     port: 8306,
     user: process.env.DB_USERNAME,
     password: process.env.DB_PASS,
     database: 'classicmodels'
});
module.exports = db;
