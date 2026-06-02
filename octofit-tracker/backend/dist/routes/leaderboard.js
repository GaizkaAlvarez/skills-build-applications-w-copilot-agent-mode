"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Leaderboard_1 = require("../models/Leaderboard");
const router = express_1.default.Router();
// GET leaderboard (weekly by default)
router.get('/', async (req, res) => {
    try {
        const leaderboard = await Leaderboard_1.Leaderboard.find({ period: 'weekly' })
            .sort({ rank: 1 })
            .populate('userId');
        res.json(leaderboard);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
// GET leaderboard by time range
router.get('/:timeRange', async (req, res) => {
    try {
        const period = req.params.timeRange;
        const leaderboard = await Leaderboard_1.Leaderboard.find({ period })
            .sort({ rank: 1 })
            .populate('userId');
        res.json(leaderboard);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
exports.default = router;
