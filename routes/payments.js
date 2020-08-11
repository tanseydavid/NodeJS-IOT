var express = require('express');
var router = express.Router();
var db = require('../connection');

/* GET home page. */
router.get('/', function(req, res, next) {

  let appRoot = getAppRootUrl( req )

  db.query( 'SELECT p.*, c.customerName FROM payments p JOIN customers c ON c.customerNumber = p.customerNumber ORDER BY paymentdate DESC' )
      .then( rows => {

        rows.forEach( (row) => {
          row.href = appRoot + "/payment/" + row.checkNumber + "/" + row.customerNumber ;
        });

        res.render('payments', { title: 'Payments', rows: rows });

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
