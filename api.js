const tools = require('./tools');

const Employees = require('./models/EmployeesModel');
const Offices = require('./models/OfficesModel');
const Orders = require('./models/OrdersModel');

module.exports = {
    ping,
    config,
    products,
    productlines,
    customers,
    orders,
    order,
    payments,
    offices,
    employees
}

// TESTING
const Database = require('./Database.js');
const db = new Database({
    host: 'localhost',
    user: 'dtansey',
    password: 'just4MySQL1,',
    database: 'classicmodels'
});

function ping(req, res) {
    //set the appropriate HTTP header
    res.setHeader('Content-Type', 'text/plain');
    res.write(getServerNameVersion());
    res.write("PING: OK\n");

    res.end();
}

function config(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(getServerNameVersion());
    res.write("CONFIG: process.env\n");

    Object.keys(process.env).forEach(function(key) {
        console.log('\nexport ' + key + '="' + process.env[key] +'"');
        res.write('\nexport ' + key + '="' + process.env[key] +'"');
    });

    res.end();
}

function customers(req, res) {
    let appRoot = getAppRootUrl( req )
    db.query( 'SELECT * FROM customers' )
        .then( rows => {
            rows.forEach( (row) => {
                row.href = appRoot + "/customer/" + row.customerNumber;
                res.write(JSON.stringify(row, undefined, 4));
            });
            res.end();
        }, err => {
            return db.close().then( () => {
                res.send("<h3>An error occurred: " + err + "</h3>");
                throw err;
            })
        });
}

function products(req, res) {

    let appRoot = getAppRootUrl( req )

    db.query( 'SELECT * FROM products ORDER BY productLine, productCode' )
        .then( rows => {

            rows.forEach( (row) => {
                row.href = appRoot + "/product/" + row.productCode;
                res.write(JSON.stringify(row, undefined, 4));
            });

            res.end();

        }, err => {
            return db.close().then( () => {
                res.send("<h3>An error occurred: " + err + "</h3>");
                throw err;
            })
        });
}

function productlines(req, res) {

    let appRoot = getAppRootUrl( req )

    db.query( 'SELECT * FROM productlines' )
        .then( rows => {

            rows.forEach( (row) => {
                row.href = appRoot + "/productline/" + row.productLine;
                res.write(JSON.stringify(row, undefined, 4));
            });

            res.end();

        }, err => {
            return db.close().then( () => {
                res.send("<h3>An error occurred: " + err + "</h3>");
                throw err;
            })
        });
}



async function orders(req, res) {
    try {
        let orders = await Orders.getAll();
        orders.forEach( (office) => {
            order.href = tools.hrefForOrderNumber( req, order.orderNumber );
        });
        res.json( orders );
    } catch(err) {
        res.write("An error occurred: " + err );
        res.end();
        throw err;
    }
}
// function orders(req, res) {
//
//     let appRoot = getAppRootUrl( req )
//
//     db.query( 'SELECT * FROM orders')
//         .then( rows => {
//
//             rows.forEach( (row) => {
//                 row.href = appRoot + "/order/" + row.orderNumber;
//                 row.hrefapi = appRoot + "/api/order/" + row.orderNumber;
//                 res.write(JSON.stringify(row, undefined, 4));
//             });
//
//             res.end();
//
//         }, err => {
//             return db.close().then( () => {
//                 res.write("<h3>An error occurred: " + err + "</h3>");
//                 res.end();
//                 throw err;
//             })
//         });
// }

function order(req, res) {

    var orderNumber = req.params.orderNumber;
    let appRoot = getAppRootUrl( req )
    let sqlOrder = 'SELECT * FROM orders WHERE orderNumber = ? ';
    let sqlOrderDetails = 'SELECT od.*, p.productName FROM orderdetails od JOIN products p ON p.productCode = od.productCode WHERE orderNumber = ? ORDER BY orderLineNumber';

    db.query( sqlOrder, orderNumber ).then( rows => {

        rows.forEach( (row) => {

            db.query( sqlOrderDetails, orderNumber ).then( details => {

                row.href = appRoot + "/order/" + row.orderNumber;
                row.orderDetails = details;
                res.write(JSON.stringify(row, undefined, 4));

                res.end();

            }, err => {
                return db.close().then( () => {
                    res.write("An error occurred: " + err );
                    res.end();
                    throw err;
                })
            });

        });

    }, err => {
        return db.close().then( () => {
            res.write("An error occurred: " + err );
            res.end();
            throw err;
        })
    });
}

function payments(req, res) {

    let appRoot = getAppRootUrl( req )
    db.query( 'SELECT * FROM payments' ).then( rows => {
        rows.forEach( (row) => {
            row.href = appRoot + "/api/payment/" + row.customerNumber + "/" + row.checkNumber;
            res.write(JSON.stringify(row, undefined, 4));
        });
        res.end();
    }, err => {
        return db.close().then( () => {
            res.send("<h3>An error occurred: " + err + "</h3>");
            throw err;
        })
    });
}

async function offices(req, res) {
    try {
        let offices = await Offices.getAll();
        offices.forEach( (office) => {
            office.href = tools.hrefForOfficeCode( req, office.officeCode );
        });
        res.json( offices );
    } catch(err) {
        res.write("An error occurred: " + err );
        res.end();
        throw err;
    }
}

async function employees(req, res) {
    try {
        let employees = await Employees.getAll();
        employees.forEach( (employee) => {
            employee.href = tools.hrefForEmployeeNumber( req, employee.employeeNumber );
            employee.hrefOffice = tools.hrefForOfficeCode( req, employee.officeCode );
        });
        res.json( employees );
    } catch(err) {
        res.write("An error occurred: " + err );
        res.end();
        throw err;
    }
}


function getServerNameVersion() {
    let d = getDividerString();
    return d + "Fuel@HOME.Server\n" +
        "Version: 1.0.0.5\t\t" +
        "Built: 2020-08-11 15:08\n" + d;
}

function getDividerString() {
    return "-".repeat(55) + "\n";
}

function getAppRootUrl(req) {
    return req.protocol + '://' + req.get('host') ;
}