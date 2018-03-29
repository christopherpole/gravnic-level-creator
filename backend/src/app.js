const express = require('express');
const LevelController = require('./controllers/level');
const morgan = require('morgan');
const winston = require('winston');

winston.level = process.env.LOG_LEVEL;

require('./db');

const app = express();

app.use(
  morgan('tiny', {
    skip: () => !(process.env.MORGAN_LOGGING === 'ON'),
  }),
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/levels', LevelController);

module.exports = app;
