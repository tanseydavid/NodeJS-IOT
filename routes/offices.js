const express = require('express');
const router = express.Router();
const db = require('../connection');
const tools = require('../tools');

router.get('/', function(req, res, next) {

  db.query( 'SELECT * FROM offices' ).then( rows => {

        rows.forEach( (row) => {
          row.href = tools.hrefForOfficeCode( req, row.officeCode );
        });

        res.render('offices', { title: 'Offices', rows: rows });

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
