var express = require('express');
var router = express.Router();
var db = require('../connection');

router.get('/', function(req, res, next) {

  let appRoot = getAppRootUrl( req )

    let sql =
        "SELECT o.*, customerName, phone " +
        " FROM orders o " +
        " JOIN customers c ON c.customerNumber = o.customerNumber";

    db.query( sql )
      .then( rows => {

        rows.forEach( (row) => {
          row.href = appRoot + "/order/" + row.orderNumber;
        });

        res.render('orders', { title: 'Orders', rows: rows });

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