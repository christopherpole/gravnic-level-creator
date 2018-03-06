const mongoose = require('mongoose');
const winston = require('winston');
mongoose.Promise = require('bluebird');

//  Level schema
const LevelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tiles: {
    type: [{
      position: { type: Number, required: true },
      selectedTileId: { type: Number, required: true },
    }],
    required: true,
  },
});

LevelSchema.post('save', (level) => {
  winston.info(`Created level with the id of ${level._id}`);
});

LevelSchema.post('remove', (level) => {
  winston.info(`Removed level with the id of ${level._id}`);
});

module.exports = mongoose.model('Level', LevelSchema);
