import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database';
import { getApiUrl, getAllowedOrigin } from './utils/environment';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const app = express();
const PORT = 8000;

// CORS Configuration
const allowedOrigin = getAllowedOrigin();
app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));

// Middleware
app.use(express.json());

// Database Connection
connectDatabase();

// Routes
app.get('/', (req, res) => {
  const apiUrl = getApiUrl(PORT);
  res.json({ 
    message: 'OctoFit Tracker API',
    apiUrl: apiUrl,
    environment: process.env.CODESPACE_NAME ? 'Codespaces' : 'localhost'
  });
});

// API Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  const apiUrl = getApiUrl(PORT);
  const environment = process.env.CODESPACE_NAME ? 'Codespaces' : 'localhost';
  console.log(`\n🚀 OctoFit Tracker API Server Started`);
  console.log(`Environment: ${environment}`);
  console.log(`API URL: ${apiUrl}`);
  console.log(`CORS Origin: ${allowedOrigin}`);
  console.log(`Available endpoints:`);
  console.log(`  GET  ${apiUrl}/`);
  console.log(`  GET  ${apiUrl}/health`);
  console.log(`  GET  ${apiUrl}/api/users`);
  console.log(`  GET  ${apiUrl}/api/teams`);
  console.log(`  GET  ${apiUrl}/api/activities`);
  console.log(`  GET  ${apiUrl}/api/leaderboard`);
  console.log(`  GET  ${apiUrl}/api/workouts\n`);
});
