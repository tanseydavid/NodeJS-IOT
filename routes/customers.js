const express = require('express');
const router = express.Router();
const db = require('../connection');
const tools = require('../tools');
const Customers = require('../models/CustomersModel');
const Orders = require('../models/OrdersModel');
const Payments = require('../models/PaymentsModel');

router.get('/', async function(req, res, next) {
    try {
        let customers = await Customers.getAll();
        customers.forEach( (customer) => {
            customer.href = tools.hrefForCustomerNumber( req, customer.customerNumber );
        });
        res.render('customers', { title: 'Customers', customers: customers });
    } catch(err) {
        res.write("An error occurred: " + err );
        res.end();
        throw err;
    }
});

router.get('/:customerNumber', async function(req, res, next) {

    let customerNumber = req.params.customerNumber;
    try {
        let customer = await Customers.getByCustomerNumber(customerNumber);
        customer.href = tools.hrefForCustomerNumber( req, customer.customerNumber );
        customer.hrefSalesRep = tools.hrefForEmployeeNumber( req, customer.salesRepEmployeeNumber );
        customer.hrefOffice = tools.hrefForOfficeCode( req, customer.officeCode );

        customer.customerOrders = await Orders.getByCustomerNumber(customerNumber);
        customer.customerOrders.forEach( (order) => {
            order.href = tools.hrefForOrderNumber( req, order.orderNumber );
        });

        customer.customerPayments = await Payments.getByCustomerNumber(customerNumber);
        customer.customerPayments.forEach( (payment) => {
          payment.href = tools.hrefForPayment( req, payment.checkNumber, payment.customerNumber );
          payment.amountFormatted = tools.formatCurrency( payment.amount );
        });

        res.render('customer', { title: customer.customerName, customer: customer });

    } catch(err) {
        res.write("An error occurred: " + err );
        res.end();
        throw err;
    }

//     let sqlCustomerPayments =
//         "SELECT *  FROM payments " +
//         " WHERE customerNumber = ?" +
//         " ORDER BY paymentDate DESC";
//
//     db.query( sqlCustomer, customerNumber ).then( rows => {
//
//         rows.forEach( (row) => {
//
//             row.href = tools.hrefForCustomerNumber( req, row.customerNumber );
//             row.hrefSalesRep = tools.hrefForEmployeeNumber( req, row.salesRepEmployeeNumber );
//             row.hrefOffice = tools.hrefForOfficeCode( req, row.officeCode );
//
//             db.query( sqlCustomerOrders, customerNumber ).then( orders => {
//                 orders.forEach( (order) => {
//                     order.href = tools.hrefForOrderNumber( req, order.orderNumber );
//                 });
//                 row.customerOrders = orders;
//
//                 db.query( sqlCustomerPayments, customerNumber ).then( payments => {
//                     payments.forEach( (payment) => {
//                         payment.href = tools.hrefForPayment( req, payment.checkNumber, payment.customerNumber );
//                         payment.amountFormatted = tools.formatCurrency( payment.amount );
//                     });
//                     row.customerPayments = payments;
//                     res.render('customer', { title: rows[0].customerName, rows: rows });
//                 });
//
//             });
//
//         }, err => {
//             return db.close().then( () => {
//                 res.write("An error occurred: " + err );
//                 res.end();
//                 throw err;
//             })
//         });
//
//     });
//
// }, err => {
//     return db.close().then( () => {
//         res.write("An error occurred: " + err );
//         res.end();
//         throw err;
//     });

});


module.exports = router;