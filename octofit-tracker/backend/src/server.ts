import express from 'express';
import { connectDatabase } from './config/database';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const app = express();
const PORT = 8000;

// Get API URL for Codespaces support
const getApiUrl = () => {
  if (process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-${PORT}.app.github.dev`;
  }
  return `http://localhost:${PORT}`;
};

// Middleware
app.use(express.json());

// Database Connection
connectDatabase();

// Routes
app.get('/', (req, res) => {
  const apiUrl = getApiUrl();
  res.json({ 
    message: 'OctoFit Tracker API',
    apiUrl: apiUrl
  });
});

// API Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// Start server
app.listen(PORT, () => {
  const apiUrl = getApiUrl();
  console.log(`Server running on ${apiUrl}`);
});
