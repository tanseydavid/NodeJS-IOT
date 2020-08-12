const express = require('express');
const router = express.Router();
const db = require('../connection');
const tools = require('../tools');

router.get('/', function(req, res, next) {
  let sql =
      'SELECT e.*, o.City AS officeCity FROM employees e ' +
      ' LEFT OUTER JOIN offices o ON o.officeCode = e.officeCode '+
      ' ORDER BY lastName, FirstName';
  db.query( sql ).then( rows => {

        rows.forEach( (row) => {
          row.href = tools.hrefForEmployeeNumber( req, row.employeeNumber );
          row.hrefOffice = tools.hrefForOfficeCode( req, row.officeCode );
        });

        res.render('employees', { title: 'Employees', rows: rows });

      }, err => {
        return db.close().then( () => {
          res.write("An error occurred: " + err );
          res.end();
          throw err;
        })
      });

});

module.exports = router;