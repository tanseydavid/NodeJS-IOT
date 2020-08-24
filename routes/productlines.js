const express = require('express');
const router = express.Router();
const tools = require('../tools');

const ProductLines = require('../Models/ProductLinesModel')
const Products = require('../Models/ProductsModel')

router.get('/', async function(req, res, next) {
    try {
        let productLines = await ProductLines.getAll();
        productLines.forEach( (productLine) => {
            productLine.hrefProductLine = tools.hrefForProductLine( req, productLine.productLine );
            productLine.hrefProductVendor = tools.hrefForProductVendor( req, productLine.productVendor );
            productLine.productLineClass = tools.classNameForProductLine( req, productLine.productLine );
        });
        res.render('productlines', { title: 'Product Lines', productLines: productLines });
    } catch(err) {
        res.write("An error occurred: " + err );
        res.end();
        throw err;
    }
});

router.get('/:productline', async function(req, res, next) {
    let productLine = req.params.productline;
    try {
        let productLineDetail = await ProductLines.getByProductLine(productLine);
        let t = productLineDetail.productLine;
        productLineDetail.productLineClass = tools.classNameForProductLine( req, productLineDetail.productLine );
        let products = await Products.getByProductLine(productLine);
        products.forEach( (product) => {
            product.href = tools.hrefForProductCode(req, product.productCode);
            product.hrefProductLine = tools.hrefForProductLine( req, product.productLine );
            product.hrefProductVendor = tools.hrefForProductVendor( req, product.productVendor );
        });

        let results = {
            success: true,
            title: productLine,
            productLineDetail: productLineDetail,
            data: {
                result: products,
                meta: null
            }
        }

        res.render('products', results);

    } catch(err) {
        res.write("An error occurred: " + err );
        res.end();
        throw err;
    }
});

module.exports = router;