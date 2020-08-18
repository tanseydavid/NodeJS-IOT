const express = require('express');
const router = express.Router();
const db = require('../connection');
const tools = require('../tools');

// router.get('/:officeCode', function(req, res, next) {
//   let officeCode = req.params.officeCode;
//   let sqlOffice = 'SELECT * FROM offices WHERE officeCode = ?';
//   let sqlEmployees = 'SELECT * FROM employees WHERE officeCode = ? ORDER BY lastName, firstName';
//   db.query( sqlOffice, officeCode ).then( rows => {
//
//         rows.forEach( (row) => {
//           row.href = tools.hrefForOfficeCode( req, row.officeCode );
//
//             db.query( sqlEmployees, officeCode ).then( employees => {
//
//                 employees.forEach( (employee) => {
//                     employee.href = tools.hrefForEmployeeNumber( req, employee.employeeNumber );
//                 });
//
//                 row.employees = employees;
//                 res.render('office', { title: rows[0].city + ' - Office', rows: rows });
//             }, err => {
//                 return db.close().then( () => {
//                     res.write("An error occurred: " + err );
//                     res.end();
//                     throw err;
//                 })
//             });
//
//         });
//         // res.render('office', { title: rows[0].city + ' - Office', rows: rows });
//       }, err => {
//         return db.close().then( () => {
//           res.write("An error occurred: " + err );
//           res.end();
//           throw err;
//         })
//     });
// });

module.exports = router;