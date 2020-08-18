var express = require('express');
var router = express.Router();
var db = require('../connection');

/* GET home page. */
router.get('/', function(req, res, next) {

  let appRoot = getAppRootUrl( req )

  db.query( 'SELECT * FROM productlines' )
      .then( rows => {

        rows.forEach( (row) => {
          row.href = appRoot + "/products/" + row.productLine;
        });

        res.render('productlines', { title: 'Product Lines', rows: rows });
        // res.end();

      }, err => {

        console.log( "An error occurred: " + err)
        return db.close().then( () => {
          res.write("<h3>An error occurred: " + err + "</h3>");
          res.end();
          throw err;
        })
      });

  // res.render('productlines', { title: 'Product Lines' });
});

module.exports = router;

function getAppRootUrl(req) {
  return req.protocol + '://' + req.get('host') ;
}
