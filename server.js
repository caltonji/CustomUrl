var express = require('express');
var logger = require('morgan');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

mongoose.connect('mongodb://localhost:27017/CustomUrl');

//declare Models
var Url = require('./models/url');

//declare Routes
var urlsRoute = require('./api/urls');

var app = express();

// files will show up without the /public publicly
app.use("/", express.static("public"));

app.use(logger('common'));
app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

//configure routes
app.use('/', urlsRoute);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//TODO: add a user facing error handler

app.listen(8081, function () {
  console.log("Started server on 8081");
});

