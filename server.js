var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var productLinesRouter = require('./routes/productlines');
var productsRouter = require('./routes/products');
var productRouter = require('./routes/product');
var customersRouter = require('./routes/customers');
var customerRouter = require('./routes/customer');
var ordersRouter = require('./routes/orders');
var orderRouter = require('./routes/order');
var paymentsRouter = require('./routes/payments');
var officesRouter = require('./routes/offices');
var officeRouter = require('./routes/office');
var employeesRouter = require('./routes/employees');
var employeeRouter = require('./routes/employee');

const api = require('./api')
var server = express();

// view engine setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'pug');

server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'public')));

// HTML routes
server.use('/', indexRouter);
server.use('/productlines', productLinesRouter);
server.use('/products', productsRouter);
server.use('/product', productRouter);
server.use('/customers', customersRouter);
server.use('/customer', customerRouter);
server.use('/orders', ordersRouter);
server.use('/order', orderRouter);
server.use('/payments', paymentsRouter);
server.use('/offices', officesRouter);
server.use('/office', officeRouter);
server.use('/employees', employeesRouter);
server.use('/employee', employeeRouter);

// API routes
server.get("/api/ping", api.ping );
server.get("/api/config", api.config );
server.get("/api/products", api.products );
server.get("/api/productlines", api.productlines );
server.get("/api/customers", api.customers );
server.get("/api/orders", api.orders);
server.get("/api/order/:orderNumber", api.order);
server.get("/api/payments", api.payments);
server.get("/api/offices", api.offices );
server.get("/api/employees", api.employees );

// catch 404 and forward to error handler
server.use(function(req, res, next) {
  next(createError(404));
});

// error handler
server.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = server;