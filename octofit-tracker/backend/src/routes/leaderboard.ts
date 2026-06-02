import express, { Request, Response } from 'express';
import { Leaderboard } from '../models/Leaderboard';

const router = express.Router();

// GET leaderboard (weekly by default)
router.get('/', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find({ period: 'weekly' })
      .sort({ rank: 1 })
      .populate('userId');
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// GET leaderboard by time range
router.get('/:timeRange', async (req: Request, res: Response) => {
  try {
    const period = req.params.timeRange as 'daily' | 'weekly' | 'monthly';
    const leaderboard = await Leaderboard.find({ period })
      .sort({ rank: 1 })
      .populate('userId');
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

export default router;
