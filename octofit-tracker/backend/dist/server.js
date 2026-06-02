"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const app = (0, express_1.default)();
const PORT = 8000;
// Get API URL for Codespaces support
const getApiUrl = () => {
    if (process.env.CODESPACE_NAME) {
        return `https://${process.env.CODESPACE_NAME}-${PORT}.app.github.dev`;
    }
    return `http://localhost:${PORT}`;
};
// Middleware
app.use(express_1.default.json());
// Database Connection
(0, database_1.connectDatabase)();
// Routes
app.get('/', (req, res) => {
    const apiUrl = getApiUrl();
    res.json({
        message: 'OctoFit Tracker API',
        apiUrl: apiUrl
    });
});
// API Routes
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
// Start server
app.listen(PORT, () => {
    const apiUrl = getApiUrl();
    console.log(`Server running on ${apiUrl}`);
});
