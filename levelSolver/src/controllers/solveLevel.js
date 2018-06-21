import express from 'express';
import { findQuickestSolution } from '../solver';

const router = express.Router();

router.get('/:gameState', (req, res) => {
  const solution = findQuickestSolution(JSON.parse(req.params.gameState), process.env.MAX_MOVES);

  return res.status(200).send({ solution, maxMoves: parseInt(process.env.MAX_MOVES, 10) });
});

module.exports = router;
