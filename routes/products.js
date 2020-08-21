const express = require('express');
const router = express.Router();
const db = require('../connection');
const tools = require("../tools");
const Products = require('../models/ProductsModel');

router.get('/', async function(req, res, next) {
    try {
        let products = await Products.getAll();
        products.forEach( (product) => {
            product.href = tools.hrefForProductCode( req, product.productCode );
            product.hrefProductLine = tools.hrefForProductLine( req, product.productLine );
            product.hrefProductVendor = tools.hrefForProductVendor( req, product.productVendor );
        });
        res.render('products', { title: 'Products', products: products });
    } catch(err) {
        res.write("An error occurred: " + err );
        res.end();
        throw err;
    }
});

router.get('/productLine/:productline', async function(req, res, next) {
    let productLine = req.params.productline;
    try {
        let products = await Products.getByProductLine(productLine);
        products.forEach( (product) => {
            product.href = tools.hrefForProductCode(req, product.productCode);
            product.hrefProductLine = tools.hrefForProductLine( req, product.productLine );
            product.hrefProductVendor = tools.hrefForProductVendor( req, product.productVendor );
        });
        res.render('products', { title: productLine, products: products });
    } catch(err) {
        res.write("An error occurred: " + err );
        res.end();
        throw err;
    }
});

router.get('/:productCode', async function(req, res, next) {
    let productCode = req.params.productCode;
    try {
        let product = await Products.getByProductCode(productCode);
        product.href = tools.hrefForProductCode(req, product.productCode);
        product.hrefProductLine = tools.hrefForProductLine( req, product.productLine );
        product.hrefProductVendor = tools.hrefForProductVendor( req, product.productVendor );
        res.render('product', { title:  product.productName, product: product });
    } catch(err) {
        res.write("An error occurred: " + err );
        res.end();
        throw err;
    }
});

module.exports = router;