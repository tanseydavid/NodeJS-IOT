const express = require('express');
const router = express.Router();
const version = require('../version')
const passport = require("passport")
const LocalHtpasswdStrategy = require('passport-local-htpasswd');
passport.use('local-htpasswd', new LocalHtpasswdStrategy({file: './htpasswd'}));

/* GET / page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Fuel@HOME', version: version });
});

/* GET LOGIN page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'LOGIN', version: version  });
});
/* POST LOGIN page. */
// router.post('/login', function(req, res, next) {
//   res.render('/', { title: 'WELCOME', version: version  });
// });
router.post('/login', passport.authenticate('local-htpasswd', { successRedirect: '/', failureRedirect: '/login' }),  function(req, res) {
  console.log(req.user)
  res.redirect('/dashboard');
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
