const db = require('../connection');
const tools = require( '../tools');

module.exports = {

    async getByCheckNumberAndCustomerNumber(checkNumber, customerNumber) {
        let sqlPayment = "SELECT * FROM payments p " +
            "  WHERE checkNumber = ? AND customerNumber = ? " +
            "  ORDER BY paymentDate DESC";

        const payment = await db.query(sqlPayment, checkNumber, customerNumber);
        // payments.forEach( (payment) => {
        // });
        return payments;
    },

    async getByCustomerNumber(customerNumber) {
        let sqlPayments =
            'SELECT * FROM payments p WHERE customerNumber = ? ' +
            ' ORDER BY paymentdate DESC';

        const payments = await db.query(sqlPayments, customerNumber);
        // payments.forEach( (payment) => {
        // });
        return payments;
    },

    async getAll() {

        let sqlPayments =
            'SELECT p.*, c.customerName FROM payments p ' +
            ' JOIN customers c ON c.customerNumber = p.customerNumber' +
            ' ORDER BY paymentdate DESC';
        const payments = await db.query(sqlPayments);
        return payments;
    }

}