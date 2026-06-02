import express, { Request, Response } from 'express';

const router = express.Router();

// GET all workouts
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get all workouts' });
});

// GET workout by ID
router.get('/:id', (req: Request, res: Response) => {
  res.json({ message: `Get workout ${req.params.id}` });
});

// POST create workout
router.post('/', (req: Request, res: Response) => {
  res.json({ message: 'Create workout' });
});

// PUT update workout
router.put('/:id', (req: Request, res: Response) => {
  res.json({ message: `Update workout ${req.params.id}` });
});

// DELETE workout
router.delete('/:id', (req: Request, res: Response) => {
  res.json({ message: `Delete workout ${req.params.id}` });
});

export default router;
