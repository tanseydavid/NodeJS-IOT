const db = require('../connection');
const tools = require( '../tools');

module.exports = {

    async getByProductLine(productLine) {
        let sqlProducts = "SELECT * FROM products " +
          "  WHERE productline = ?  " +
          "  ORDER BY productLine, productCode ";
        const products = await db.query(sqlProducts, productCode);
        return products;
    },

    async getByProductCode(productCode) {
        let sqlProduct = 'SELECT * FROM products WHERE productCode = ? ';
        const product = await db.query(sqlProduct, productCode);
        return product[0];
    },

    async getAll() {
        let sqlProductLines = "SELECT * FROM productLines ORDER BY productLine";
        const productLines = await db.query(sqlProductLines);
        return productLines;
    }

}