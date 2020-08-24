const db = require('../connection');
const tools = require( '../tools');

module.exports = {

    async getByProductLine(productLine) {
        let sqlProductLine = "SELECT * FROM productLines " +
          "  WHERE productline = ?  " +
          "  ORDER BY productLine ";
        const queryResult = await db.query(sqlProductLine, productLine);
        return queryResult[0];
    },

    // async getByProductCode(productCode) {
    //     let sqlProduct = 'SELECT * FROM products WHERE productCode = ? ';
    //     const product = await db.query(sqlProduct, productCode);
    //     return product[0];
    // },

    async getAll() {
        let sqlProductLines = "SELECT * FROM productLines ORDER BY productLine";
        const productLines = await db.query(sqlProductLines);
        return productLines;
    }

}