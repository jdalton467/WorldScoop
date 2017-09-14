

module.exports = function(app,passport){



  //home page with login links
  app.get('/', function(req, res){
    res.render('index.html'); //load the index.html file
  });


  //show the login form
  app.get('login', function(req, res){

    res.render('login.html', {message: req.flash('loginMessage')})
  });

 // process the login form
    // app.post('/login', do all our passport stuff here);


//show the signup form
app.get('/signup', function(req, res){
  //render the page and pass in any flashdata if it exists
  res.render('signup.html', {message: req.flash('signupMessage')})
});

 // process the signup form
    // app.post('/signup', do all our passport stuff here);


 //we will want this protected do you have to be logged in to visit
app.get('/profile', isLoggedIn, function(req, res){
  res.render('profile.html',{
    user : req.user //get the user out of session and pass to template
  });
});


app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

};


//route middle ware to make sure a user is logged in
function isLoggedIn(req,res,next){
  //if user is authenticated in the session, carry on
  if(req.isAuthenticated())
    return next();


//if they aren't then redirect them to the home page
  res.redirect('/')
}
