var express = require('express')
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

//Configuration ====================================================================================
mongoose.connect(configDB.url); //Connect to our database

//require('./config/passport')(passport); //pass passport for configuration

//Setting up express application
app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs'); //setting up ejs for templating

//Required for passport
app.use(session({secret: 'ilovescotchscotchyscotchscotch'})); //Session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// app.get('/', function(request, response) {
//   response.send('Hello Prash! Your app is running in port: '+app.get('port')+' Watch this space for updates..');
// })

app.listen(app.get('port'), function() {
  console.log("The magic happens on port  "+ app.get('port'));
})
