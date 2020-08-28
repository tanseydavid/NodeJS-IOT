const express = require('express');
const router = express.Router();
const tools = require('../tools');
// const Products = require('../models/ProductsModel');
const Vendors = require('../models/VendorsModel');

router.get('/', async function(req, res, next) {
    try {
        let vendors = await Vendors.getAll();
        vendors.forEach( (vendor) => {
            vendor.href = tools.hrefForProductVendor( req, vendor.productVendor );
        });
        debugger;
        res.render('vendors', { title: 'Vendors', vendors: vendors });
    } catch(err) {
        res.write("An error occurred: " + err );
        res.end();
        throw err;
    }
});

router.get('/:productVendor',  async function(req, res, next) {
    try {
        let productVendor = req.params.productVendor;
        let vendor = await Vendors.getByProductVendor( productVendor );
        // let vendorProducts = await Products.getByProductVendor( productVendor );
        vendor.href = tools.hrefForProductVendor( req, vendor.productVendor );
        // vendor.products = vendorProducts;
        vendor.products.forEach( (product) => {
            product.href = tools.hrefForProductCode( req, product.productCode );
            product.hrefProductLine = tools.hrefForProductLine( req, product.productLine );
        });
        res.render('vendor', { title: vendor.productVendor, vendor: vendor });
    } catch(err) {
        res.write("An error occurred: " + err );
        res.end();
        throw err;
    }
});

module.exports = router;