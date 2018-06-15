const mongoose = require('mongoose');
const winston = require('winston');
mongoose.Promise = require('bluebird');

//  Tile schema
const TileSchema = new mongoose.Schema({
  position: { type: Number, required: true },
  selectedTileId: { type: String, required: true },
});

TileSchema.set('toJSON', {
  transform: (doc, ret) => {
    const rtn = { ...ret };
    delete rtn._id;
    return rtn;
  },
});

//  Level schema
const LevelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tiles: {
    type: [TileSchema],
    required: true,
  },
  stars: {
    type: [Number],
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
  solution: {
    type: mongoose.Schema.Types.Mixed,
    default: undefined,
  },
  maxMoves: {
    type: Number,
    default: undefined,
  },
});

LevelSchema.post('save', level => {
  winston.info(`Created level with the id of ${level._id}`);
});

LevelSchema.post('remove', level => {
  winston.info(`Removed level with the id of ${level._id}`);
});

LevelSchema.set('toJSON', {
  transform: (doc, ret) => {
    const rtn = { ...ret };

    rtn.id = rtn._id;
    delete rtn._id;
    delete rtn.__v;

    return rtn;
  },
});

module.exports = mongoose.model('Level', LevelSchema);
