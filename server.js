var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productLinesRouter = require('./routes/productlines');
var officesRouter = require('./routes/offices');
var customersRouter = require('./routes/customers');
var productsRouter = require('./routes/products');
var employeesRouter = require('./routes/employees');
var ordersRouter = require('./routes/orders');

const api = require('./api')

var server = express();

const dateFormat = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};

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
server.use('/users', usersRouter);
server.use('/productlines', productLinesRouter);
server.use('/offices', officesRouter);
server.use('/customers', customersRouter);
server.use('/products', productsRouter);
server.use('/employees', employeesRouter);
server.use('/orders', ordersRouter);

// API routes
server.get("/api/ping", api.ping );
server.get("/api/config", api.config );
server.get("/api/customers", api.customers );
server.get("/api/products", api.products );
server.get("/api/productlines", api.productlines );
server.get("/api/orders", api.orders);
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

function getAppRootUrl(req) {
  return req.protocol + '://' + req.get('host') ;
}
