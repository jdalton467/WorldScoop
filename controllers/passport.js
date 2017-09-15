

//load the passport-local npm module
var LocalStrategy = require('passport-local').Strategy;

//load up the user model

var User = require('../models/saved_schema');

//expose this dunction to our app using module.exports
module.exports = function(passport){
  //passport session setup
  //required for persistent login sessions
  //passport needs ability to serialize and unserialize users out of session

  //used to serialize the user for the session
  passport.serializeUser(function(user, done){
    done(null, user.id);
  });


  //used to deserialize the user out of the session
  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      done(err,user);
    });
  });

//Local Signup
//we are using named strategies since we have one for login and 
//one for signup

//by default, if there was no name, it would jsut be called 'local'


passport.use('local-signup', new LocalStrategy({
  //by default, local strategy uses username and password, we will override with email
  usernameField: 'email',
  passwordField: 'password',
  passReqToCalllback: true //allows us to passback the entire request to the callback
},
function(req,email,password,done){
  //async
  //User.findOne won't fire unless data is sent back
  process.nextTick(function(){

    //find a user whose email is the same as the forms email
    //we are checking to see if the usr trying to login already exists
    User.findOne({'local.email':email}, function(err,user){
      //if there are any errors, return the error
      if(err)
        return done(err);

      //check to see id theres already a user with that email
      if(user){
        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
      }else{
        //if there is no user with that email
        //create the user
        var newUser = new User();

        //set the user's local credentials
        newUser.local.email = email;
        newUser.local.password = newUser.generateHash(password);

        //save the user
        newUser.save(function(err){
          if(err)
            throw err;
          return done(null, newUser);
        });
      }
      });
    });
  }));
};





