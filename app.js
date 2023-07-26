var express = require('express');
var path = require('path');

var indexRouter = require('./routes/index');

var app = express();

app.use('/', indexRouter);
app.use("/xml", express.static(path.join(__dirname, 'public')));

app.disable('x-powered-by');

module.exports = app;
