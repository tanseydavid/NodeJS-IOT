const express = require('express');
const router = express.Router();
const db = require('../connection');
const tools = require('../tools');

router.get('/:orderNumber', function(req, res, next) {

    let orderNumber = req.params.orderNumber;
    // let appRoot = getAppRootUrl( req )
    let sqlOrder = 'SELECT o.*, c.customerName FROM orders o JOIN customers c ON c.customerNumber = o.customerNumber WHERE orderNumber = ? ';
    let sqlOrderDetails = 'SELECT od.*, od.priceEach * od.quantityOrdered AS priceExtended, p.productName FROM orderdetails od JOIN products p ON p.productCode = od.productCode WHERE orderNumber = ? ORDER BY orderLineNumber';

    db.query( sqlOrder, orderNumber ).then( rows => {

            rows.forEach( (row) => {

                row.orderTotal = 0;

                db.query( sqlOrderDetails, orderNumber ).then( details => {

                    row.hrefCustomer = tools.hrefForCustomerNumber( req, row.customerNumber );
                    row.hrefSalesRep = tools.hrefForEmployeeNumber( req, row.salesRepEmployeeNumber );

                    details.forEach( (detail) => {
                        detail.hrefProduct = tools.hrefForProductCode( req, detail.productCode );
                        detail.priceEachFormatted = tools.formatCurrency( detail.priceEach );
                        detail.priceExtendedFormatted = tools.formatCurrency( detail.priceExtended );
                        row.orderTotal += detail.priceExtended;
                    });

                    row.orderDetails = details;
                    row.orderTotalFormatted = tools.formatCurrency( row.orderTotal )

                    res.render('order', { title:  "Order # " +  rows[0].orderNumber, rows: rows });

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
                res.write("<h3>An error occurred: " + err + "</h3>");
                res.end();
                throw err;
            })
        });

});

module.exports = router;

// function getAppRootUrl(req) {
//     return req.protocol + '://' + req.get('host') ;
// }