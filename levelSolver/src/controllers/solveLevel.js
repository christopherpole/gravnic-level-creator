import express from 'express';
import { findQuickestSolution } from '../solver';

const router = express.Router();

router.get('/:gameState', (req, res) => {
  const solution = findQuickestSolution(JSON.parse(req.params.gameState), 12);

  const obj = {
    solved: solution !== false,
  };

  if (solution) {
    obj.solution = solution;
  } else {
    obj.maxMoves = process.env.MAX_MOVES;
  }

  return res.status(200).send(obj);
});

module.exports = router;
