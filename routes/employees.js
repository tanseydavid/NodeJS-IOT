var express = require('express');
var router = express.Router();
var db = require('../connection');

/* GET home page. */
router.get('/', function(req, res, next) {

  let appRoot = getAppRootUrl( req )

  db.query( 'SELECT * FROM employees' )
      .then( rows => {

        rows.forEach( (row) => {
          row.href = appRoot + "/employee/" + row.employeeNumber;
        });

        res.render('employees', { title: 'Employees', rows: rows });

      }, err => {
        return db.close().then( () => {
          res.write("<h3>An error occurred: " + err + "</h3>");
          res.end();
          throw err;
        })
      });

});

module.exports = router;

function getAppRootUrl(req) {
  return req.protocol + '://' + req.get('host') ;
}
