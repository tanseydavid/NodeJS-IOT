const Database = require('./Database.js');
const db = new Database({
     host: 'localhost',
     user: 'dtansey',
     password: 'just4MySQL1,',
     database: 'classicmodels'
});
module.exports = db;