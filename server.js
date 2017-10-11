// server.js


// get all the tools we need
var express  = require('express');
var app      = express();
const sequelize = require('sequelize');
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var handlebars = require('handlebars')
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var exphbs = require("express-handlebars");
var configDB = require('./config/database.js');
var path = require('path');
var helpers = require('handlebars-helpers')();

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(path.join(__dirname, 'public')));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
require("dotenv").config();

// required for passport
var options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database : process.env.DB_NAME
};

var sessionStore = new MySQLStore(options);
app.use(session({
    secret: 'aritzahadababyitzagirl', // session secret
    store: sessionStore,
    resave: true,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================

// Import routes and give the server access to them.
// var routes = require("./controllers/appController.js");
// app.use("/", routes);
require('./app/routes.js')(app, passport); 
// load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
