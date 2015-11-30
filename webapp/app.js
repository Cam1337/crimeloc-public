var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


//var mysql_orm = require("./database/orm");
var routes = require('./routes/index');

var dust = require('adaro').dust({cache: false})
//dust.dust.helpers = require('./helpers/dust')

var app = express();

// view engine setup
app.engine('dust', dust)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', "dust");

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(mysql_orm)


app.use('/', routes);

// catch 404 and forward to error handler
require("./helpers/error_handlers")(app)


module.exports = app;
