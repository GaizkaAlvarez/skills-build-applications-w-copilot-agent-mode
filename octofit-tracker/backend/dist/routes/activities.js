"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Activity_1 = require("../models/Activity");
const router = express_1.default.Router();
// GET all activities
router.get('/', async (req, res) => {
    try {
        const activities = await Activity_1.Activity.find().populate('userId');
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
// GET activity by ID
router.get('/:id', async (req, res) => {
    try {
        const activity = await Activity_1.Activity.findById(req.params.id).populate('userId');
        if (!activity) {
            res.status(404).json({ error: 'Activity not found' });
            return;
        }
        res.json(activity);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
// POST create activity
router.post('/', async (req, res) => {
    try {
        const activity = new Activity_1.Activity(req.body);
        await activity.save();
        res.status(201).json(activity);
    }
    catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
// PUT update activity
router.put('/:id', async (req, res) => {
    try {
        const activity = await Activity_1.Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!activity) {
            res.status(404).json({ error: 'Activity not found' });
            return;
        }
        res.json(activity);
    }
    catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
// DELETE activity
router.delete('/:id', async (req, res) => {
    try {
        const activity = await Activity_1.Activity.findByIdAndDelete(req.params.id);
        if (!activity) {
            res.status(404).json({ error: 'Activity not found' });
            return;
        }
        res.json({ message: 'Activity deleted' });
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
exports.default = router;
