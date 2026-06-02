"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Workout_1 = require("../models/Workout");
const router = express_1.default.Router();
// GET all workouts
router.get('/', async (req, res) => {
    try {
        const workouts = await Workout_1.Workout.find().populate('userId');
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
// GET workout by ID
router.get('/:id', async (req, res) => {
    try {
        const workout = await Workout_1.Workout.findById(req.params.id).populate('userId');
        if (!workout) {
            res.status(404).json({ error: 'Workout not found' });
            return;
        }
        res.json(workout);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
// POST create workout
router.post('/', async (req, res) => {
    try {
        const workout = new Workout_1.Workout(req.body);
        await workout.save();
        res.status(201).json(workout);
    }
    catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
// PUT update workout
router.put('/:id', async (req, res) => {
    try {
        const workout = await Workout_1.Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!workout) {
            res.status(404).json({ error: 'Workout not found' });
            return;
        }
        res.json(workout);
    }
    catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
// DELETE workout
router.delete('/:id', async (req, res) => {
    try {
        const workout = await Workout_1.Workout.findByIdAndDelete(req.params.id);
        if (!workout) {
            res.status(404).json({ error: 'Workout not found' });
            return;
        }
        res.json({ message: 'Workout deleted' });
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
exports.default = router;
