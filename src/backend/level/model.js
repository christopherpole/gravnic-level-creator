var mongoose = require('mongoose');

//  Level schema
var LevelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tiles: { type: Array, required: true },
});

module.exports = mongoose.model('Level', LevelSchema);
