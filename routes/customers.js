const express = require('express');
const router = express.Router();
const db = require('../connection');
const tools = require('../tools');

router.get('/', function(req, res, next) {

  db.query( 'SELECT * FROM customers ORDER BY customerName' ).then( rows => {

        rows.forEach( (row) => {
            row.href = tools.hrefForCustomerNumber( req, row.customerNumber );
        });

        res.render('customers', { title: 'Customers', rows: rows });

      }, err => {
        return db.close().then( () => {
          res.write("<h3>An error occurred: " + err + "</h3>");
          res.end();
          throw err;
        })
      });

});

module.exports = router;