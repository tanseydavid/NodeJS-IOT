const express = require('express');
const router = express.Router();
const db = require('../connection');
const tools = require('../tools');

router.get('/:employeeNumber', function(req, res, next) {

  let employeeNumber = req.params.employeeNumber;
  let sql =
      'SELECT e.*, o.City AS officeCity FROM employees e ' +
      ' LEFT OUTER JOIN offices o ON o.officeCode = e.officeCode '+
      ' WHERE employeeNumber = ? ' +
      ' ORDER BY lastName, FirstName';

  db.query( sql, employeeNumber ).then( rows => {

        rows.forEach( (row) => {
          row.href = tools.hrefForEmployeeNumber( req, row.employeeNumber );
          row.hrefOffice = tools.hrefForOfficeCode( req, row.officeCode );
        });
        let title = rows[0].lastName + ", " + rows[0].firstName + " (" + rows[0].employeeNumber + ")";
        res.render('employee', { title: title, rows: rows });

      }, err => {
        return db.close().then( () => {
          res.write("An error occurred: " + err );
          res.end();
          throw err;
        })
      });

});

module.exports = router;