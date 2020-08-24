const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const productLinesRouter = require('./routes/productlines');
const productsRouter = require('./routes/products');
const customersRouter = require('./routes/customers');
const ordersRouter = require('./routes/orders');
const paymentsRouter = require('./routes/payments');
const officesRouter = require('./routes/offices');
const employeesRouter = require('./routes/employees');
const vendorsRouter = require('./routes/vendors');

const api = require('./api')
const server = express();

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
server.use('/about', indexRouter);
server.use('/contact', indexRouter);
server.use('/productlines', productLinesRouter);
server.use('/products', productsRouter);
server.use('/customers', customersRouter);
server.use('/orders', ordersRouter);
server.use('/payments', paymentsRouter);
server.use('/offices', officesRouter);
server.use('/employees', employeesRouter);
server.use('/vendors', vendorsRouter);

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
server.get("/api/vendors", api.vendors );

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