"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Team_1 = require("../models/Team");
const router = express_1.default.Router();
// GET all teams
router.get('/', async (req, res) => {
    try {
        const teams = await Team_1.Team.find();
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
// GET team by ID
router.get('/:id', async (req, res) => {
    try {
        const team = await Team_1.Team.findById(req.params.id);
        if (!team) {
            res.status(404).json({ error: 'Team not found' });
            return;
        }
        res.json(team);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
// POST create team
router.post('/', async (req, res) => {
    try {
        const team = new Team_1.Team(req.body);
        await team.save();
        res.status(201).json(team);
    }
    catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
// PUT update team
router.put('/:id', async (req, res) => {
    try {
        const team = await Team_1.Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!team) {
            res.status(404).json({ error: 'Team not found' });
            return;
        }
        res.json(team);
    }
    catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
// DELETE team
router.delete('/:id', async (req, res) => {
    try {
        const team = await Team_1.Team.findByIdAndDelete(req.params.id);
        if (!team) {
            res.status(404).json({ error: 'Team not found' });
            return;
        }
        res.json({ message: 'Team deleted' });
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
exports.default = router;
