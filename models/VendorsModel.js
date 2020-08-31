const db = require('../connection');
const tools = require('../tools');

module.exports = {

    async getByProductVendor(productVendor) {
        let sqlVendor =
            'SELECT productVendor ' +
            '  FROM classicmodels.products ' +
            '  WHERE productVendor = ? ';
        let sqlVendorProducts = 'SELECT * FROM products WHERE productVendor = ? ORDER BY productLine, productCode';
        const vendor = await db.query(sqlVendor, productVendor);
        if (vendor.length < 1) {
            throw new Error('Vendor with this productVendor was not found');
        }
        const vendorProducts = await db.query( sqlVendorProducts, productVendor );
        vendor[0].products = vendorProducts;
        vendorProducts.forEach( (product) => {
            product.buyPriceFormatted = tools.formatCurrency( product.buyPrice );
            product.MSRPFormatted = tools.formatCurrency( product.MSRP );
        });

        return vendor[0];
    },

    async getAll() {
        let sqlVendors =
            'SELECT productVendor, COUNT(*) AS productCount ' +
            '  FROM classicmodels.products ' +
            '  GROUP BY productVendor'
            '  ORDER BY 1';

        const vendors = await db.query(sqlVendors);
        return vendors;
    }

}