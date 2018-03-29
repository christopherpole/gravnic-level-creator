const express = require('express');
const bodyParser = require('body-parser');
const winston = require('winston');
const Level = require('../models/level');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/', (req, res) => {
  Level.create(
    {
      name: req.body.name,
      tiles: req.body.tiles,
    },
    (err, level) => {
      if (err) {
        winston.error(err.message);

        return res.status(500).send(err.message);
      }

      return res.status(201).send(level);
    },
  );
});

router.get('/', (req, res) => {
  Level.find({}, (err, levels) => {
    if (err) {
      winston.error(err.message);

      return res.status(500).send(err.message);
    }

    return res.status(200).send(levels);
  });
});

router.get('/:levelId', (req, res) => {
  Level.findById(req.params.levelId, (err, level) => {
    if (err) {
      winston.error(err.message);

      return res.status(500).send(err.message);
    }

    if (!level) {
      return res.status(404).send();
    }

    return res.status(200).json(level);
  });
});

//  Technically a PATCH but whatever
router.put('/:levelId', (req, res) => {
  Level.findByIdAndUpdate(
    req.params.levelId,
    req.body,
    { upsert: false, new: true },
    (err, level) => {
      if (err) {
        winston.error(err.message);

        return res.status(500).send(err.message);
      }

      if (!level) {
        return res.status(404).send();
      }

      return res.status(200).json(level);
    },
  );
});

router.delete('/:levelId', (req, res) => {
  Level.findByIdAndRemove(req.params.levelId, (err, level) => {
    if (err) {
      winston.error(err.message);

      return res.status(500).send(err.message);
    }

    if (!level) {
      return res.status(404).send();
    }

    return res.status(204).send();
  });
});

module.exports = router;
