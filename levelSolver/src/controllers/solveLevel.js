const express = require('express');
const gravnic = require('gravnic-game');

const router = express.Router();

router.get('/', (req, res) =>
  res.status(200).send({
    solved: true,
    solution: [gravnic.MOVE_DOWN, gravnic.MOVE_DOWN, gravnic.MOVE_LEFT, gravnic.MOVE_RIGHT],
    maxMoves: 10,
  }),
);

module.exports = router;
