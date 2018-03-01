const mongoose = require('mongoose');
const winston = require('winston');

//  Connect to the DB
mongoose.connect(`mongodb://${process.env.DB_ADDRESS}/${process.env.DB_NAME}`)
  .then(() => winston.info('MongoDB connection succesful'))
  .catch(err => winston.error(err));

module.exports = mongoose;
