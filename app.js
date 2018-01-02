var express     = require('express');
var path        = require('path');
var bodyParser  = require('body-parser');
var http        = require('http');
var config      = require('config');

var app         = express();

var apis        = require('./routes/apis');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/apis', apis);
app.set('port', config.port || 8081);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;
http.createServer(app).listen(app.get('port'), function () {});