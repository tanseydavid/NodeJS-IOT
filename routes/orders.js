const express = require('express');
const router = express.Router();
const tools = require( '../tools');
const Orders = require('../models/OrdersModel');

router.get('/:orderNumber', async function(req, res, next) {
    let orderNumber = req.params.orderNumber;
    try {
        let order = await Orders.getByOrderNumber(orderNumber);
        order.hrefCustomer = tools.hrefForCustomerNumber( req, order.customerNumber );
        order.hrefSalesRep = tools.hrefForEmployeeNumber( req, order.salesRepEmployeeNumber );
        order.orderDetails.forEach( (detail) => {
            detail.hrefProduct = tools.hrefForProductCode( req, detail.productCode );
        });
        let title = "Order # " +  order.orderNumber;
        res.render('order', { title: title, order: order });
    } catch(err) {
        res.write("An error occurred: " + err );
        res.end();
        throw err;
    }
});

router.get('/', async function(req, res, next) {
    try {
        let orders = await Orders.getAll();
        orders.forEach( (order) => {
            order.href = tools.hrefForOrderNumber( req, order.orderNumber );
            order.hrefCustomer = tools.hrefForCustomerNumber( req, order.customerNumber );
        });
        res.render('orders', { title: 'Orders', orders: orders });
    } catch(err) {
        res.write("An error occurred: " + err );
        res.end();
        throw err;
    }
});

router.get('/status/:status', async function(req, res, next) {
    let orderStatus = req.params.status;
    try {
        let orders = await Orders.getByStatus(orderStatus);
        orders.forEach((order) => {
            order.href = tools.hrefForOrderNumber( req, order.orderNumber );
            order.hrefCustomer = tools.hrefForCustomerNumber( req, order.customerNumber );
        });
        let title = 'Orders - ' + orderStatus;
        res.render('orders', { title: title, orders: orders });
    } catch(err) {
        res.write("An error occurred: " + err );
        res.end();
        throw err;
    }
});

module.exports = router;