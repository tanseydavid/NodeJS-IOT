const express = require('express');
const router = express.Router();
const version = require('../version')

/* GET / page. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'ADMIN - Fuel@HOME', version: version });
});

module.exports = router;
