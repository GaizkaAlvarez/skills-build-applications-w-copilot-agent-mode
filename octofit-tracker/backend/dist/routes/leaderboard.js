"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// GET leaderboard
router.get('/', (req, res) => {
    res.json({ message: 'Get leaderboard' });
});
// GET leaderboard by time range
router.get('/:timeRange', (req, res) => {
    res.json({ message: `Get leaderboard for ${req.params.timeRange}` });
});
exports.default = router;
