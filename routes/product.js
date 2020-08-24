var express = require('express');
var router = express.Router();

// router.get('/:productCode', function(req, res, next) {
//
//     let productCode = req.params.productCode;
//
//     db.query( 'SELECT * FROM products WHERE productcode = ? ', productCode ).then( rows => {
//         rows.forEach( (row) => {
//             row.href = appRoot + "/product/" + row.productCode;
//         });
//         res.render('product', { title:  rows[0].productName, rows: rows });
//     }, err => {
//         return db.close().then( () => {
//             res.write("<h3>An error occurred: " + err + "</h3>");
//             res.end();
//             throw err;
//         })
//     });
// });

module.exports = router;