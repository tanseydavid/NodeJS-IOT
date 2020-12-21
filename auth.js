const path = require('path');
var passport = require('passport');
var session = require('express-session');
// var LocalStrategy = require('passport-local').Strategy;
// const LocalStrategy = require('passport-local-htpasswd');
const LocalHtpasswdStrategy = require('passport-local-htpasswd');

module.exports = function(app, user){

    app.use(session({
        secret: 'some secret value, changeme',
        resave: true,
        saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    // passport config
    // passport.use(new LocalStrategy(user.authenticate()));
    let filename = path.resolve(__dirname, '.htpasswd');
    // passport.use('local', new LocalStrategy({file: filename}));
    passport.use('local-htpasswd', new LocalHtpasswdStrategy({file: filename}));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    // passport.serializeUser(function(user, done) {
    //     console.log('serializing user: ');
    //     console.log(user);
    //     done(null, user._id);
    // });
    //
    // passport.deserializeUser(function(id, done) {
    //     user.findById(id, function(err, user) {
    //         console.log('no im not serial');
    //         done(err, user);
    //     });
    // });
};