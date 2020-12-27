const express = require('express');
const router = express.Router();
const version = require('../version')

/* GET / page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Fuel@HOME', version: version });
});

/* GET LOGIN page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'LOGIN', version: version  });
});


router.post('/login', function(req, res, next) {

  passport.authenticate( 'local-htpasswd', { successRedirect: '/auth-landing', failureRedirect: '/login' }, function(err, user, info) {

    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect('/login');

      // return res.status(401).json({
      //   err: info
      // });
    }

    req.logIn(user, function(err) {

      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }

      // If this function gets called, authentication was successful.
      // `req.user` contains the authenticated user.
      httpLogger.config.setUserIdentity(user.username, user.username);
      httpLogger.createLog('LOGIN', `${user.username}`, 'Info').addTags('AUTH').submit();
      // httpLogger.createLog('LOGIN', 'LOGIN:', 'Info').addTags('AUTH').submit();
      res.locals.user = user;
      res.redirect('/admin');

      // res.status(200).json({
      //   status: 'XXX - Login successful!'
      // });

    });

  })(req, res, next);
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
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
