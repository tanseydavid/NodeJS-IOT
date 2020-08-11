const express = require('express');
const router = express.Router();
const db = require('../connection');
const tools = require('../tools');

router.get('/:customerNumber', function(req, res, next) {

  let customerNumber = req.params.customerNumber;
  let appRoot = tools.getAppRootUrl( req )
  let sqlCustomer =
      "SELECT c.*, o.city AS officeCity, CONCAT( e.firstName, ' ', e.lastName ) AS salesRepName FROM customers c" +
      " LEFT OUTER JOIN employees e on e.employeeNumber = c.salesRepEmployeeNumber " +
      " LEFT OUTER JOIN offices o on o.officeCode = e.officeCode " +
      " WHERE customerNumber = ?";
    let sqlCustomerOrders =
        "SELECT * " +
        " FROM orders o " +
        " WHERE customerNumber = ?" +
        " ORDER BY orderDate DESC";

  db.query( sqlCustomer, customerNumber ).then( rows => {

        rows.forEach( (row) => {
          row.href = tools.hrefForCustomerNumber( req, row.customerNumber );

          db.query( sqlCustomerOrders, customerNumber ).then( orders => {
            orders.forEach( (order) => {
                order.href = appRoot + "/order/" + order.orderNumber;
            });
            row.customerOrders = orders;
            res.render('customer', { title: rows[0].customerName, rows: rows });
          });

        }, err => {
            return db.close().then( () => {
              res.write("An error occurred: " + err );
              res.end();
              throw err;
          })
        });

      });

    }, err => {
        return db.close().then( () => {
          res.write("An error occurred: " + err );
          res.end();
          throw err;
        });

});

module.exports = router;

// function getAppRootUrl(req) {
//   return req.protocol + '://' + req.get('host') ;
// }