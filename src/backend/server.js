require('dotenv').config();
const winston = require('winston');

const app = require('./app');

const port = process.env.BACKEND_PORT || 3000;

const server = app.listen(port, () => {
  winston.info(`Express server listening on port ${port}`);
});

module.exports = server;
