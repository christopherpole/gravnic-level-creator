var express = require('express');
var LevelController = require('./level/controller');
var db = require('./db');

var app = express();

app.use('/levels', LevelController);

module.exports = app;