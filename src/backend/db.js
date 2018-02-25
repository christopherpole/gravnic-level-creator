var mongoose = require('mongoose');

//  Connect to the DB
mongoose.connect('mongodb://localhost/gravnic-level-creator')
  .then(() =>  console.log('MongoDB connection succesful'))
  .catch((err) => console.error(err));

module.exports = mongoose;