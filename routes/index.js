var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Fuel@HOME' });
});

/* GET ABOUT page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'ABOUT - Fuel@HOME' });
});

/* GET CONTACT page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'CONTACT - Fuel@HOME' });
});

module.exports = router;
