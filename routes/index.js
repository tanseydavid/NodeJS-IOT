var express = require('express');
var router = express.Router();
const version = require('../version')

/* GET / page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Fuel@HOME', version: version });
});

/* GET ABOUT page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'ABOUT', version: version  });
});

/* GET CONTACT page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'CONTACT', version: version  });
});

module.exports = router;
