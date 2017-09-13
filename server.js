var express = require('express'), path = require('path');

var bodyParser = require('body-parser'), session = require('express-sessions'); 
var passport = require('./controllers/passport.js');



var app = express();

// Define the port to run on
app.set('port', 3000);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

passport(app);


// Listen for requests
var server = app.listen(app.get('port'), function() {
    var port = server.address().port;
    console.log('Magic happens on port ' + port);
});