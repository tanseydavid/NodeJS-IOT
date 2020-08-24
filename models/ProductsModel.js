const db = require('../connection');
const tools = require( '../tools');

module.exports = {

    async getByProductLine(productLine) {
        let sqlProducts = "SELECT * FROM products " +
          "  WHERE productline = ?  " +
          "  ORDER BY productLine, productCode ";
        const products = await db.query(sqlProducts, productLine);
        return products;
    },

    async getByProductCode(productCode) {
        let sqlProduct = 'SELECT * FROM products WHERE productCode = ? ';
        const product = await db.query(sqlProduct, productCode);
        return product[0];
    },

    // async getByCustomerNumber(customerNumber) {
    //     let sqlCustomerOrders = "SELECT *  FROM orders " +
    //         " WHERE customerNumber = ?" +
    //         " ORDER BY orderDate DESC";
    //     const orders = await db.query(sqlCustomerOrders, customerNumber);
    //     return orders;
    // },

    async getAll() {
        let sqlProducts = "SELECT * FROM products " +
            " ORDER BY productLine, productCode ";
        const products = await db.query(sqlProducts);
        return products;
    }

}