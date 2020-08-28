const express = require('express');
const router = express.Router();
const db = require('../connection');
const tools = require('../tools')
const Payments = require('../models/PaymentsModel');

router.get('/', async function(req, res, next) {
    try {
        let payments = await Payments.getAll();
        payments.forEach( (payment) => {
            payment.href = tools.hrefForPayment( req, payment.checkNumber, payment.customerNumber );
            payment.hrefCustomer = tools.hrefForCustomerNumber( req, payment.customerNumber );
        });
        res.render('payments', { title: 'Payments', payments: payments, tools: tools });
    } catch(err) {
        res.write("An error occurred: " + err );
        res.end();
        throw err;
    }
});

router.get('/:checkNumber/:customerNumber', async function(req, res, next) {

    let checkNumber = req.params.checkNumber;
    let customerNumber = req.params.customerNumber;

    try {
        let payment = await Payments.getByCheckNumberAndCustomerNumber( checkNumber, customerNumber );
        payment.href = tools.hrefForPayment( req, payment.checkNumber, payment.customerNumber );
        payment.hrefCustomer = tools.hrefForCustomerNumber( req, payment.customerNumber );
        debugger;
        res.render('payment', { title: 'Payment', payment: payment, tools: tools });
    } catch(err) {
        res.write("An error occurred: " + err );
        res.end();
        throw err;
    }
});

module.exports = router;