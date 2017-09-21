var express = require('express'); //
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./controllers/index.js');
var users = require('./controllers/users.js')
// var users = require('./routes/users');

var port = process.env.PORT || 3000;

var passport = require('passport'); //requiring the passport npm package
var LocalStrategy = require('passport-local').Strategy; //
var mongoose = require('mongoose');
var flash = require('connect-flash'); //diplays flash messages
var session = require('express-session');



var configDB = require('./config/connection.js');
mongoose.connect(configDB.url);

var app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views')); //
app.set('view engine', 'ejs');

// ==== testing middleware ====
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

app.use(session({secret:'marbles'})); //session secret
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions
app.use(flash());
 //use connect-flash for flash messages stored in sessions

app.use('/', index);
app.use('/users', users);


require('./config/passport.js')(passport);

app.use(function(req, res, next){
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});
if(app.get('env') === 'development'){
	app.use(function(err,req, res, next){
		res.status(err.status || 500);
		res.render('error',{
			message: err.message,
			error:err,
		});
	});
}

//error handler
app.use(function(err, req, res, next){
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.render('error');
});

app.listen(port);
module.exports = app;
