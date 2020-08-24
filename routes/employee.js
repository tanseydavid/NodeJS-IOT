const express = require('express');
const router = express.Router();
const db = require('../connection');
const tools = require('../tools');
const Employees = require('../models/EmployeesModel');

// router.get('/:employeeNumber', async function(req, res, next) {
//     let employeeNumber = req.params.employeeNumber;
//     try {
//         let employee = await Employees.getByEmployeeNumber(employeeNumber);
//         employee.href = tools.hrefForEmployeeNumber( req, employee.employeeNumber );
//         employee.hrefOffice = tools.hrefForOfficeCode( req, employee.officeCode );
//         let title = employee.lastName + ", " + employee.firstName + " (" + employee.employeeNumber + ")";
//         res.render('employee', { title: title, employee: employee });
//     } catch(err) {
//       res.write("An error occurred: " + err );
//       res.end();
//       throw err;
//     }
// });

module.exports = router;