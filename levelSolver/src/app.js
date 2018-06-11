const express = require('express');
const morgan = require('morgan');
const winston = require('winston');

const SolveLevelController = require('./controllers/solveLevel');

winston.level = process.env.LOG_LEVEL;

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

app.use('/solveLevel', SolveLevelController);

module.exports = app;
