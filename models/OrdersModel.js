const db = require('../connection');
const tools = require( '../tools');

module.exports = {

    async getByOrderNumber(orderNumber) {

        let sqlOrder =
            'SELECT o.*, c.customerName FROM orders o ' +
            '  JOIN customers c ON c.customerNumber = o.customerNumber ' +
            '  WHERE orderNumber = ? ';
        let sqlOrderDetails =
            'SELECT od.*, od.priceEach * od.quantityOrdered AS priceExtended, p.productName FROM orderdetails od  ' +
            '  JOIN products p ON p.productCode = od.productCode ' +
            '  WHERE orderNumber = ? ' +
            '  ORDER BY orderLineNumber';

        const order = await db.query(sqlOrder, orderNumber);
        order[0].orderTotal = 0;

        const orderDetails = await db.query(sqlOrderDetails, orderNumber);
        orderDetails.forEach( (detail) => {
            detail.priceEachFormatted = tools.formatCurrency( detail.priceEach );
            detail.priceExtendedFormatted = tools.formatCurrency( detail.priceExtended );
            order[0].orderTotal += detail.priceExtended;
        });

        order[0].orderDetails = orderDetails;
        order[0].orderTotalFormatted = tools.formatCurrency( order[0].orderTotal )

        return order[0];
    },

    async getByStatus(orderStatus) {
        let sqlOrders =
            "SELECT o.*, customerName, phone " +
            " FROM orders o " +
            " JOIN customers c ON c.customerNumber = o.customerNumber " +
            " WHERE status = ?" +
            " ORDER BY orderDate DESC ";
        const orders = await db.query(sqlOrders, orderStatus);
        return orders;
    },

    async getByCustomerNumber(customerNumber) {
        let sqlCustomerOrders = "SELECT *  FROM orders " +
            " WHERE customerNumber = ?" +
            " ORDER BY orderDate DESC";
        const orders = await db.query(sqlCustomerOrders, customerNumber);
        return orders;
    },

    async getAll() {

        let sqlOrders = "SELECT o.*, customerName, phone " +
            " FROM orders o " +
            " JOIN customers c ON c.customerNumber = o.customerNumber" +
            " ORDER BY orderDate DESC";

        const orders = await db.query(sqlOrders);
        return orders;
    }

}