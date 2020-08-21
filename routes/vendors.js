const express = require('express');
const router = express.Router();
const tools = require('../tools');
const Vendors = require('../models/VendorsModel');

router.get('/', async function(req, res, next) {
    try {
        let vendors = await Vendors.getAll();
        vendors.forEach( (vendor) => {
            vendor.href = tools.hrefForProductVendor( req, vendor.productVendor );
        });
        res.render('vendors', { title: 'Vendors', vendors: vendors });
    } catch(err) {
        res.write("An error occurred: " + err );
        res.end();
        throw err;
    }
});

// router.get('/:productVendor',  async function(req, res, next) {
//     try {
//         let officeCode = req.params.officeCode;
//         let office = await Offices.getByOfficeCode( officeCode );
//         office.href = tools.hrefForOfficeCode( req, office.officeCode );
//         office.employees.forEach( (employee) => {
//             employee.href = tools.hrefForEmployeeNumber( req, employee.employeeNumber );
//         });
//         res.render('office', { title: office.city + ' - Office', office: office });
//     } catch(err) {
//         res.write("An error occurred: " + err );
//         res.end();
//         throw err;
//     }
// });

module.exports = router;