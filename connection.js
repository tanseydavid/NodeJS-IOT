const Database = require('./Database.js');
const db = new Database({
     host: 'demofuelathome.mysql.database.azure.com',
     user: 'admin_fuelathome@demofuelathome',
     password: 'just4NodeJS,',
     database: 'classicmodels'
});
module.exports = db;
