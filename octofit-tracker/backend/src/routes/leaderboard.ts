import express, { Request, Response } from 'express';

const router = express.Router();

// GET leaderboard
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get leaderboard' });
});

// GET leaderboard by time range
router.get('/:timeRange', (req: Request, res: Response) => {
  res.json({ message: `Get leaderboard for ${req.params.timeRange}` });
});

export default router;
