import express, { Request, Response } from 'express';

const router = express.Router();

// GET all teams
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get all teams' });
});

// GET team by ID
router.get('/:id', (req: Request, res: Response) => {
  res.json({ message: `Get team ${req.params.id}` });
});

// POST create team
router.post('/', (req: Request, res: Response) => {
  res.json({ message: 'Create team' });
});

// PUT update team
router.put('/:id', (req: Request, res: Response) => {
  res.json({ message: `Update team ${req.params.id}` });
});

// DELETE team
router.delete('/:id', (req: Request, res: Response) => {
  res.json({ message: `Delete team ${req.params.id}` });
});

export default router;
