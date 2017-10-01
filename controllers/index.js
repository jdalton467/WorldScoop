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
router.post('/profile/saveduser', function(req, res) {
    User.findOne({
        "_id": req.user._id,
    }).exec(function(err, doc) {
        if (err) {
            res.send(err);
        } else {
            res.send(doc);

        }
    });
});

router.post('/profile/savedarticle', function(req, res) {
    // console.log(req.body);
    console.log(req.body);
    Article.findOne({
        "_id": req.body._id,
    }).exec(function(err, doc) {
        if (err) {
            res.send(err);
        } else {
            res.send(doc);
            console.log(doc);

        }
    });
});



router.post('/profile', function(req, res) {
    console.log(req.body);
    // User.find();
    console.log(req.user._id);
    var article = new Article({
        title: req.body.title,
        article: req.body.article
    });


    article.save(function(error, doc) {
        if (error) {
            res.send(error);
        } else {

            var id = doc._id;
            User.findOneAndUpdate({
                _id: req.user._id
            }, {
                $push: {
                    article: id
                }
            }).exec(function(err, doc) {
                if (err) {
                    res.send(err);
                } else {
                    // res.send(doc);
                }
            })
            res.send(doc);
        }
    })

});

router.post('/profile/delete', function(req, res) {
    console.log(req.body.title);
    console.log(req.body.article);
    console.log(req.body);
    Article.remove({
        title: req.body.title
    }, function(err,doc) {
        if (err) {
            handleError(err);
        }else{
            User.findOneAndUpdate({
                _id: req.user._id
            }, {

                $pull: {
                    article: req.body._id
                }
            }).exec(function(err, doc){
                if(err){
                    res.send(err);
                }else{
                    res.send(doc);
                    console.log(doc);
                }
            })
        }
    })
});



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