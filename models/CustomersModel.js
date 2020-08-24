const db = require('../connection');
const tools = require( '../tools');

module.exports = {

    async getByCustomerNumber(customerNumber) {

        let sqlCustomer = 'SELECT * FROM customers o ' +
          '  WHERE customerNumber = ? ';

        const customer = await db.query(sqlCustomer, customerNumber);
        return customer[0];
    },

    async getAll() {

        let sqlCustomers = "SELECT * FROM customers ORDER BY customerName";

        const customers = await db.query(sqlCustomers);
        return customers;
    }

}