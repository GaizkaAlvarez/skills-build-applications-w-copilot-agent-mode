"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const environment_1 = require("./utils/environment");
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const app = (0, express_1.default)();
const PORT = 8000;
// CORS Configuration
const allowedOrigin = (0, environment_1.getAllowedOrigin)();
app.use((0, cors_1.default)({
    origin: allowedOrigin,
    credentials: true
}));
// Middleware
app.use(express_1.default.json());
// Database Connection
(0, database_1.connectDatabase)();
// Routes
app.get('/', (req, res) => {
    const apiUrl = (0, environment_1.getApiUrl)(PORT);
    res.json({
        message: 'OctoFit Tracker API',
        apiUrl: apiUrl,
        environment: process.env.CODESPACE_NAME ? 'Codespaces' : 'localhost'
    });
});
// API Routes
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
// Start server
app.listen(PORT, () => {
    const apiUrl = (0, environment_1.getApiUrl)(PORT);
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
