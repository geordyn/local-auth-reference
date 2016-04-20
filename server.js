/// DEPENDENCIES ///
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var session = require('express-session');

/// FILES ///
var passport = require('./services/passport.js');
var userCtrl = require('./controllers/userCtrl.js');


////////////////////


var app = express();
var port = config.port;

app.use(bodyParser.json());
app.use(express.static(__dirname + "/../public"));

app.use(session({
    secret: config.secret,
    resave: true,
    saveUninitialized: true
  }));


/// PASSPORT ///
app.use(passport.initialize()); // must come before .session()
app.use(passport.session());


////// AUTH ENDPOINTS //////

/// USER ///
app.post('/api/user', userCtrl.addUser); //makes new user
app.get('/api/user', userCtrl.getUser);
app.get('/api/getCurrentUser', userCtrl.getCurrentUser);
//current user , goes to user controller, res.send(req.user) sends back current user
    //call endpoint in resolve(front end) to have 'admin only' pages and such.

/// LOGIN ///
app.post('/api/login', passport.authenticate( 'local-auth', {
  successRedirect: '/api/getCurrentUser'
  }
));

/// LOGOUT ///
app.get('/api/logout', function(req, res, next) {
  req.logout();
  return res.status(200).send("logged out");
});
