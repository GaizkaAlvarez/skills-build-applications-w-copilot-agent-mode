import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 8000;
const MONGODB_URL = 'mongodb://localhost:27017/octofit-tracker';

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGODB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'OctoFit Tracker API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
