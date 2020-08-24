const Database = require('./Database.js');
const db = new Database({
     host: 'localhost',
     user: '***',
     password: '****',
     database: 'classicmodels'
});
module.exports = db;
