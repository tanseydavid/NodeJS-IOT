const express = require('express');
const router = express.Router();
const db = require('../connection');
const tools = require('../tools')

router.get('/', function(req, res, next) {

    let sql =
        'SELECT p.*, c.customerName FROM payments p ' +
        ' JOIN customers c ON c.customerNumber = p.customerNumber' +
        ' ORDER BY paymentdate DESC';

    db.query( sql ).then( rows => {
        rows.forEach( (row) => {
          row.href = tools.hrefForPayment( req, row.checkNumber, row.customerNumber );
          row.hrefCustomer = tools.hrefForCustomerNumber( req, row.customerNumber );
        });
        res.render('payments', { title: 'Payments', rows: rows, tools: tools });
    }, err => {
        return db.close().then( () => {
          res.write("<h3>An error occurred: " + err + "</h3>");
          res.end();
          throw err;
        })
    });

});

module.exports = router;