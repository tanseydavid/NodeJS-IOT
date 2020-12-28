const config = require('dotenv').config();
const version = require('./version');
const path = require('path');
const createError = require('http-errors');
passport = require("passport");
const express = require('express');

const cookieParser = require('cookie-parser');

const morgan = require('morgan');
const addRequestId = require('express-request-id')();
const logger = require('./logger');

const  bunyan = require('bunyan');
const log = bunyan.createLogger({name: 'NodeJS-IoT'});
httpLogger = require('exceptionless').ExceptionlessClient.default;
httpLogger.config.apiKey = '4COaMVufYKZbSb1MEGPKZqGOiUm252ZUuhY2rUXJ';
httpLogger.config.useSessions();
global.httpLogger = httpLogger;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const productLinesRouter = require('./routes/productlines');
const productsRouter = require('./routes/products');
const customersRouter = require('./routes/customers');
const ordersRouter = require('./routes/orders');
const paymentsRouter = require('./routes/payments');
const officesRouter = require('./routes/offices');
const employeesRouter = require('./routes/employees');
const vendorsRouter = require('./routes/vendors');

const api = require('./api');
const server = express();

// view engine setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'pug');

const bodyParser = require('body-parser');
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use(addRequestId);
morgan.token('id', function getId(req) {
  return req.id
});
const loggerFormat = ':id [:date[web]]" :method :url" :status :response-time';

server.use(morgan(loggerFormat, {
  skip: function (req, res) {
    return res.statusCode < 400
  },
  stream: process.stderr
}));

server.use(morgan(loggerFormat, {
  skip: function (req, res) {
    return res.statusCode >= 400
  },
  stream: process.stdout
}));

server.use(function (req, res, next){
  var log = logger.loggerInstance.child({
    id: req.id,
    body: req.body
  }, true)
  log.info({req: req})

  next();
});

server.use(function (req, res, next) {
  function afterResponse() {
    res.removeListener('finish', afterResponse);
    res.removeListener('close', afterResponse);
    var log = logger.loggerInstance.child({
      id: req.id
    }, true)
    log.info({res:res}, 'response')
  }
  res.on('finish', afterResponse);
  res.on('close', afterResponse);
  next();
});


//code before
let user = require('./models/user.js');
let auth = require('./auth.js')(server, user);
// code after

server.use(function(req, res, next){
  res.locals.user = req.user;
  next();
  // console.log();
});

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'public')));
server.use('/api-docs',swaggerUi.serve, swaggerUi.setup( swaggerDocument ));

// HTML routes
server.use('/', indexRouter);
server.use('/login', indexRouter);
server.use('/logout', indexRouter);
server.use('/about', indexRouter);
server.use('/contact', indexRouter);
server.use('/admin', adminRouter);
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
  httpLogger.createNotFound(req.originalUrl).addRequestInfo(req).submit();
  next(createError(404));
});

// error handler
server.use(function(err, req, res, next) {

  httpLogger.createUnhandledException(err, 'express').addRequestInfo(req).submit();

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// TESTING
server.on('listening', function() {

  // log.info('hi');
  // log.warn({lang: 'fr'}, 'au revoir');

  let host = server.address().address;
  let port = server.address().port;
  let message = 'NodeJS-IoT: listening at http://' + host + port;
  console.log('-----------------------------------------------------------------');
  console.log(message);
  console.log('-----------------------------------------------------------------');
  httpLogger.submitLog('app', message, 'Info');
});

// app.get('/api/me',
//     passport.authenticate('basic', { session: false }),
//     function(req, res) {
//       res.json(req.user);
//     });

// module.exports = { server: server, httpLogger: httpLogger };
module.exports = { server: server, httpLogger: httpLogger };