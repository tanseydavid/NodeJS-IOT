const express = require('express');
const router = express.Router();
const db = require('../connection');
const tools = require('../tools');

// router.get('/:customerNumber', function(req, res, next) {
//
//   let customerNumber = req.params.customerNumber;
//   let sqlCustomer =
//       "SELECT c.*, o.officeCode, o.city AS officeCity, CONCAT( e.firstName, ' ', e.lastName ) AS salesRepName FROM customers c" +
//       " LEFT OUTER JOIN employees e on e.employeeNumber = c.salesRepEmployeeNumber " +
//       " LEFT OUTER JOIN offices o on o.officeCode = e.officeCode " +
//       " WHERE customerNumber = ?";
//     let sqlCustomerOrders =
//         "SELECT *  FROM orders " +
//         " WHERE customerNumber = ?" +
//         " ORDER BY orderDate DESC";
//     let sqlCustomerPayments =
//         "SELECT *  FROM payments " +
//         " WHERE customerNumber = ?" +
//         " ORDER BY paymentDate DESC";
//
//   db.query( sqlCustomer, customerNumber ).then( rows => {
//
//         rows.forEach( (row) => {
//
//           row.href = tools.hrefForCustomerNumber( req, row.customerNumber );
//           row.hrefSalesRep = tools.hrefForEmployeeNumber( req, row.salesRepEmployeeNumber );
//           row.hrefOffice = tools.hrefForOfficeCode( req, row.officeCode );
//
//           db.query( sqlCustomerOrders, customerNumber ).then( orders => {
//             orders.forEach( (order) => {
//                 order.href = tools.hrefForOrderNumber( req, order.orderNumber );
//             });
//             row.customerOrders = orders;
//
//             db.query( sqlCustomerPayments, customerNumber ).then( payments => {
//                 payments.forEach( (payment) => {
//                     payment.href = tools.hrefForPayment( req, payment.checkNumber, payment.customerNumber );
//                     payment.amountFormatted = tools.formatCurrency( payment.amount );
//                 });
//                 row.customerPayments = payments;
//                 res.render('customer', { title: rows[0].customerName, rows: rows });
//             });
//
//           });
//
//         }, err => {
//             return db.close().then( () => {
//               res.write("An error occurred: " + err );
//               res.end();
//               throw err;
//           })
//         });
//
//       });
//
//     }, err => {
//         return db.close().then( () => {
//           res.write("An error occurred: " + err );
//           res.end();
//           throw err;
//         });
//
// });

module.exports = router;