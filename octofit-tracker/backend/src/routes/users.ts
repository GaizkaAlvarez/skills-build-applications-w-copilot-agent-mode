import express, { Request, Response } from 'express';

const router = express.Router();

// GET all users
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get all users' });
});

// GET user by ID
router.get('/:id', (req: Request, res: Response) => {
  res.json({ message: `Get user ${req.params.id}` });
});

// POST create user
router.post('/', (req: Request, res: Response) => {
  res.json({ message: 'Create user' });
});

// PUT update user
router.put('/:id', (req: Request, res: Response) => {
  res.json({ message: `Update user ${req.params.id}` });
});

// DELETE user
router.delete('/:id', (req: Request, res: Response) => {
  res.json({ message: `Delete user ${req.params.id}` });
});

export default router;
