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

app.use('/levels', LevelController);

module.exports = app;
