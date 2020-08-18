const express = require('express');
const router = express.Router();
const tools = require('../tools');
const Offices = require('../models/OfficesModel');

router.get('/', async function(req, res, next) {
    try {
        let offices = await Offices.getAll();
        offices.forEach( (office) => {
            office.href = tools.hrefForOfficeCode( req, office.officeCode );
        });
        res.render('offices', { title: 'Offices', rows: offices });
    } catch(err) {
        res.write("An error occurred: " + err );
        res.end();
        throw err;
    }
});

router.get('/:officeCode',  async function(req, res, next) {
    try {
        let officeCode = req.params.officeCode;
        let office = await Offices.getByOfficeCode( officeCode );
        office.href = tools.hrefForOfficeCode( req, office.officeCode );
        office.employees.forEach( (employee) => {
            employee.href = tools.hrefForEmployeeNumber( req, employee.employeeNumber );
        });
        res.render('office', { title: office.city + ' - Office', office: office });
    } catch(err) {
        res.write("An error occurred: " + err );
        res.end();
        throw err;
    }
});

module.exports = router;