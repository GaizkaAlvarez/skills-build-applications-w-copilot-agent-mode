import express, { Request, Response } from 'express';

const router = express.Router();

// GET all activities
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get all activities' });
});

// GET activity by ID
router.get('/:id', (req: Request, res: Response) => {
  res.json({ message: `Get activity ${req.params.id}` });
});

// POST create activity
router.post('/', (req: Request, res: Response) => {
  res.json({ message: 'Create activity' });
});

// PUT update activity
router.put('/:id', (req: Request, res: Response) => {
  res.json({ message: `Update activity ${req.params.id}` });
});

// DELETE activity
router.delete('/:id', (req: Request, res: Response) => {
  res.json({ message: `Delete activity ${req.params.id}` });
});

export default router;
