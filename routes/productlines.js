const express = require('express');
const router = express.Router();
const tools = require('../tools');

const ProductLines = require('../Models/ProductLinesModel')

router.get('/', async function(req, res, next) {
    try {
        let productLines = await ProductLines.getAll();
        productLines.forEach( (productLine) => {
            productLine.href = tools.hrefForProductLine( req, productLine.productLine );
            productLine.productLineClass = tools.classNameForProductLine( req, productLine.productLine );
        });
        res.render('productlines', { title: 'Product Lines', productLines: productLines });
    } catch(err) {
        res.write("An error occurred: " + err );
        res.end();
        throw err;
    }
});

module.exports = router;