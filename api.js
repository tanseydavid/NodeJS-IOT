const version = require('./version')
const tools = require('./tools');

const Customers = require('./models/CustomersModel');
const Employees = require('./models/EmployeesModel');
const Offices = require('./models/OfficesModel');
const Orders = require('./models/OrdersModel');
const Payments = require('./models/PaymentsModel');
const Products = require('./models/ProductsModel');
const ProductLines = require('./models/ProductLinesModel');
const Vendors = require('./models/VendorsModel');

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
    employees,
    vendors
}

function ping(req, res) {
    // set the appropriate HTTP header
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

async function customers(req, res) {
    try {
        let customers = await Customers.getAll();
        customers.forEach((customer) => {
            customer.href = tools.hrefForCustomerNumber(req, customer.customerNumber);
        });
        res.json(customers);
    } catch (err) {
        res.write("An error occurred: " + err);
        res.end();
        throw err;
    }
}

async function products(req, res) {
    try {
        let products = await Products.getAll();
        products.forEach((product) => {
            product.href = tools.hrefForProductCode(req, product.productCode);
        });
        res.json(products);
    } catch (err) {
        res.write("An error occurred: " + err);
        res.end();
        throw err;
    }
}

async function productlines(req, res) {
    try {
        let productLines = await ProductLines.getAll();
        productLines.forEach((productLine) => {
            productLine.href = tools.hrefForProductLine(req, productLine.productLine);
        });
        res.json(productLines);
    } catch (err) {
        res.write("An error occurred: " + err);
        res.end();
        throw err;
    }
}

async function orders(req, res) {
    try {
        let orders = await Orders.getAll();
        orders.forEach( (order) => {
            order.href = tools.hrefForOrderNumber( req, order.orderNumber );
        });
        res.json( orders );
    } catch(err) {
        res.write("An error occurred: " + err );
        res.end();
        throw err;
    }
}

function order(req, res) {

    let orderNumber = req.params.orderNumber;

    // let sqlOrder = 'SELECT * FROM orders WHERE orderNumber = ? ';
    // let sqlOrderDetails = 'SELECT od.*, p.productName FROM orderdetails od JOIN products p ON p.productCode = od.productCode WHERE orderNumber = ? ORDER BY orderLineNumber';

    // db.query( sqlOrder, orderNumber ).then( rows => {
    //
    //     rows.forEach( (row) => {
    //
    //         db.query( sqlOrderDetails, orderNumber ).then( details => {
    //
    //             row.href = appRoot + "/order/" + row.orderNumber;
    //             row.orderDetails = details;
    //             res.write(JSON.stringify(row, undefined, 4));
    //
    //             res.end();
    //
    //         }, err => {
    //             return db.close().then( () => {
    //                 res.write("An error occurred: " + err );
    //                 res.end();
    //                 throw err;
    //             })
    //         });
    //
    //     });
    //
    // }, err => {
    //     return db.close().then( () => {
    //         res.write("An error occurred: " + err );
    //         res.end();
    //         throw err;
    //     })
    // });
}


async function payments(req, res) {
    try {
        let payments = await Payments.getAll();
        payments.forEach((payment) => {
            payment.href = tools.hrefForProductCode(req, payment.productCode);
        });
        res.json(payments);
    } catch (err) {
        res.write("An error occurred: " + err);
        res.end();
        throw err;
    }
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

async function vendors(req, res) {
    try {
        let vendors = await Vendors.getAll();
        vendors.forEach((vendor) => {
            vendor.href = tools.hrefForProductVendor(req, vendor.productVendor);
        });
        res.json(vendors);
    } catch (err) {
        res.write("An error occurred: " + err);
        res.end();
        throw err;
    }
}

function getServerNameVersion() {
    let d = getDividerString();
    return d + "Fuel@HOME.Server\n" +
        "Version: " +  version + "\t\t\t" +
        "Built: 2020-08-27 4:52pm\n" + d;
}

function getDividerString() {
    return "-".repeat(57) + "\n";
}