const express = require('express');
const bodyParser = require('body-parser');
const Level = require('./model');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/', (req, res) => {
  Level.create({
    name: req.body.name,
    tiles: req.body.tiles,
  }, (err, level) => {
    if (err) {
      return res
        .status(500)
        .send('There was a problem adding the information to the database.');
    }

    return res.status(200).send(level);
  });
});

router.get('/', (req, res) => {
  Level.find({}, (err, levels) => {
    if (err) {
      return res
        .status(500)
        .send('There was a problem finding the levels.');
    }

    return res.status(200).send(levels);
  });
});

module.exports = router;
