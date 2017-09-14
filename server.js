var express = require('express');
let app = express(), port = process.env.PORT || 3000;
let mongoose = require('mongoose'), passport = require('passport');
let flash = require('connect-flash'), morgan = require('morgan');
let cookieParser = require('cookie-parser'), bodyParser = require('body-parser');
let session = require('express-session'), path = require('path');
let configDB = require('./config/connection.js');


mongoose.connect(configDB.url);

// require('./config/passport')(passport); // pass passport for configuration

app.use(morgan('dev')); //log every request to the console
app.use(cookieParser()); //read cookies
app.use(bodyParser()); //get information from the html form


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
// app.set('view engine', 'html');
//required for passport
app.use(session({secret:'marbles'})); //session secret
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions
app.use(flash()); //use connect-flash for flash messages stored in sessions

//routes
//load our routes and pass in our app and fully configured passport
require('./controllers/routes.js')(app,passport); 

app.listen(port);
console.log('The magic happens on port ' + port);


