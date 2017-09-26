var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require('./models/user.js');
var Article = require('./models/article.js');
var mongoose = require('mongoose');
var db = require('../config/connection.js');

router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.get('/login', function(req, res, next) {
    res.render('login.ejs', {
        message: req.flash('loginMessage')
    });

});

router.get('/signup', function(req, res) {
    res.render('signup.ejs', {
        message: req.flash('signupMessage')
    });
});

router.get('/profile', isLoggedIn, function(req, res) {

    res.render('profile.ejs', {
        user: req.user
    });

    // User.find();

});

router.post('/profile', function(req, res){
    // console.log(req);
    console.log(req.user._id);
    res.send('hi');
})

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true,
}));

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true,
}))


module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}