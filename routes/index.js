const express = require('express');
const router = express.Router();
const version = require('../version')

const passport = require("passport")

// // const session = require('express-session');
// // router.use(session({secret: 'some secret value, changeme'}));
// // const LocalHtpasswdStrategy = require('passport-local-htpasswd');
// // passport.use('local-htpasswd', new LocalHtpasswdStrategy({file: './htpasswd'}));
// // router.use(passport.initialize());
// // router.use(passport.session());


// passport.serializeUser(function(user, done) {
//   done(null, user);
// });
//
// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });



/* GET / page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Fuel@HOME', version: version });
});

/* GET LOGIN page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'LOGIN', version: version  });
});

/* POST LOGIN page. */
// router.post('/login', passport.authenticate('local-htpasswd', { successRedirect: '/auth-landing', failureRedirect: '/login' }),  function(req, res) {
//   httpLogger.submitLog('app', 'TESTING', 'Info');
//   console.log("TESTING: " + req.user)
//   res.redirect('/dashboard');
// });



router.post('/login', function(req, res, next) {

  // debugger;
  // passport.authenticate('local', function(err, user, info) {
  passport.authenticate( 'local-htpasswd', { successRedirect: '/auth-landing', failureRedirect: '/login' }, function(err, user, info) {

    debugger;

    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({
        err: info
      });
    }

    req.logIn(user, function(err) {

      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }

      res.status(200).json({
        status: 'Login successful!'
      });

    });

  })(req, res, next);
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
