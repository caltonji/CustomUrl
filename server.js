var express = require('express');
var logger = require('morgan');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/StatBot');

//declare Models
var Url = require('./models/url');

//declare Routes
var routes = require('./routes/index');


var app = express();

app.use(logger('common'));


//configure routes
app.use('/', routes);


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

