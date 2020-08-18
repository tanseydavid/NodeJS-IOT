const express = require('express');
const router = express.Router();
const db = require('../connection');
const tools = require( '../tools');

router.get('/', function(req, res, next) {

    let sql =
        "SELECT o.*, customerName, phone " +
        " FROM orders o " +
        " JOIN customers c ON c.customerNumber = o.customerNumber" +
        " ORDER BY orderDate DESC";

    db.query( sql ).then( rows => {

      rows.forEach( (row) => {
        row.href = tools.hrefForOrderNumber( req, row.orderNumber );
        row.hrefCustomer = tools.hrefForCustomerNumber( req, row.customerNumber );
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

router.get('/:status', function(req, res, next) {

    var orderStatus = req.params.status;

    let sql =
        "SELECT o.*, customerName, phone " +
        " FROM orders o " +
        " JOIN customers c ON c.customerNumber = o.customerNumber" +
        " WHERE status = ?" +
        " ORDER BY orderDate DESC";

    db.query( sql, orderStatus )
        .then( rows => {

            rows.forEach( (row) => {
                row.href = tools.hrefForOrderNumber( req, row.orderNumber );
                row.hrefCustomer = tools.hrefForCustomerNumber( req, row.customerNumber );
            });
            res.render('orders', { title: 'Orders - ' + orderStatus, rows: rows });

        }, err => {
            return db.close().then( () => {
                res.write("<h3>An error occurred: " + err + "</h3>");
                res.end();
                throw err;
            })
        });

});

module.exports = router;