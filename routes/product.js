var express = require('express');
var router = express.Router();
var db = require('../connection');

router.get('/:productcode', function(req, res, next) {

    var productCode = req.params.productcode;
    let appRoot = getAppRootUrl( req )

    db.query( 'SELECT * FROM products WHERE productcode = ? ', productCode )
        .then( rows => {

            rows.forEach( (row) => {
                row.href = appRoot + "/product/" + row.productCode;
            });
            debugger;
            res.render('product', { title:  rows[0].productName, rows: rows });

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