const express = require('express');
const router = express.Router();
const version = require('../version');
const path = require('path');

myisAuthenticated = function(req,res,next) {
  if(req.user)  {
    res.locals.user = req.user
    return true;
  }
  return false;
}

requireAuthentication = function(req,res,next) {
  if(myisAuthenticated(req,res,next))
      return next();
  else
    return res.status(401).json({
      error: 'User not authenticated'
    });
}

/* GET / page. */
router.get('/', requireAuthentication, function(req, res, next) {
  res.render('admin', { title: 'ADMIN - Classic Models', version: version });
});

router.get('/index', requireAuthentication, function(req, res, next) {
  res.render('admin-index', { title: 'ADMIN - Classic Models', version: version });
});

// router.get('/index', function(req, res) {
//   res.sendFile(path.join(__dirname + '/indexadmin.html'));
// });

module.exports = router;