var express = require('express');
var router = express.Router();
var db = require('../connection');

router.get('/:orderNumber', function(req, res, next) {

    debugger;
    let orderNumber = req.params.orderNumber;
    let appRoot = getAppRootUrl( req )
    let sqlOrder = 'SELECT o.*, c.customerName FROM orders o JOIN customers c ON c.customerNumber = o.customerNumber WHERE orderNumber = ? ';
    let sqlOrderDetails = 'SELECT od.*, p.productName FROM orderdetails od JOIN products p ON p.productCode = od.productCode WHERE orderNumber = ? ORDER BY orderLineNumber';

    db.query( sqlOrder, orderNumber )
        .then( rows => {

            rows.forEach( (row) => {

                db.query( sqlOrderDetails, orderNumber ).then( details => {

                    row.href = appRoot + "/order/" + row.orderNumber;
                    row.orderDetails = details;
                    res.render('order', { title:  "Order # " +  rows[0].orderNumber, rows: rows });

                    // res.write(JSON.stringify(row, undefined, 4));
                    // res.end();

                }, err => {
                    return db.close().then( () => {
                        res.write("An error occurred: " + err );
                        res.end();
                        throw err;
                    })
                });


                // row.href = appRoot + "/order/" + row.orderNumber;
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

function getAppRootUrl(req) {
    return req.protocol + '://' + req.get('host') ;
}