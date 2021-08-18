var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var fs = require('fs');
var session = require('express-session');
var passport = require('passport');
var swaggerUi = require('swagger-ui-express');
var yaml = require('js-yaml');
var moment = require('moment');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
// configs
require('dotenv').config({
  path: `./env-files/${process.env.ENV || 'dev'}.env`,
});

// profiling for the servers
console.log('current env:', process.env.ENV);
global.APPDIR = path.resolve(__dirname).toString();
global.CONFIGS = require('./configs/config.json');
var swaggerDoc = yaml.safeLoad(fs.readFileSync('./configs/swagger.yaml'));

//correcting swagger host and base path
(function () {
  console.log("updating swagger");
  swaggerDoc.host = process.env.BASEURL + ':' + process.env.PORT;
  swaggerDoc.basePath = '/v' + process.env.VERSION + '/';
})();

// connect mongodb
require('./models/dbConnections');

var app = express();

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SECRETKEY,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(flash());

console.log("here")
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// initialise the passport session
require('./services/passportAuthenticate')(passport);
app.use(passport.initialize());
app.use(passport.session());

// request cros
app.use(function (req, res, next) {
  res.locals = { siteUrl: process.env.WEBURL, moment: moment, sess: req.user, configs: global.CONFIGS };
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,authToken,Authorization,Content-Type,Accept");
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});

console.log("version", process.env.VERSION)

// routes
app.use('/v' + process.env.VERSION + '/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/v' + process.env.VERSION + '/', require('./routes/api.js'));
app.use('/api', require('./routes/api.js'));
app.use('/admin', require('./routes/admin'));
app.use('/admin/driver', require('./routes/driverRoute'));
app.use('/admin/customer', require('./routes/customerRoute'));
app.use('/admin/master', require('./routes/masterRoute'));
app.use('/admin/support', require('./routes/supportRoute'));
app.use('/admin/rating', require('./routes/ratingReviewRoute'));
app.use('/admin/fileupload/', require('./routes/fileUploaderRoute'));

// route to handle all angular requests
app.get('*', function (req, res) {
  res.render('error/404', {
    title: "Page Not Found"
  })
});



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  })
});

module.exports = app;
