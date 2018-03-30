const winston = require('winston');
require('dotenv').config();

const app = require('./app');

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  winston.info(`Express server listening on port ${port}`);
});

module.exports = server;
