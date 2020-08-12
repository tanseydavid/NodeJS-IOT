const express = require('express');
const router = express.Router();
const db = require('../connection');
const tools = require("../tools");

router.get('/', function(req, res, next) {

    db.query( 'SELECT * FROM products ORDER BY productLine, productCode ').then( rows => {

            rows.forEach( (row) => {
                row.href = tools.hrefForProductCode(req, row.productCode);
            });

            res.render('products', { title: 'Products', rows: rows });

        }, err => {
            return db.close().then( () => {
                res.write("An error occurred: " + err );
                res.end();
                throw err;
            })
        });
});

router.get('/:productline', function(req, res, next) {

    var productLine = req.params.productline;

    db.query( 'SELECT * FROM products WHERE productline = ? ORDER BY productLine, productCode ', productLine )
        .then( rows => {

            rows.forEach( (row) => {
                row.href = tools.hrefForProductCode(req, row.productCode);
            });

            res.render('products', { title: productLine, rows: rows });

        }, err => {
            return db.close().then( () => {
                res.write("<h3>An error occurred: " + err + "</h3>");
                res.end();
                throw err;
            })
        });

});

module.exports = router;