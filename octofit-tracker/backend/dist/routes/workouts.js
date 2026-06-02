"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// GET all workouts
router.get('/', (req, res) => {
    res.json({ message: 'Get all workouts' });
});
// GET workout by ID
router.get('/:id', (req, res) => {
    res.json({ message: `Get workout ${req.params.id}` });
});
// POST create workout
router.post('/', (req, res) => {
    res.json({ message: 'Create workout' });
});
// PUT update workout
router.put('/:id', (req, res) => {
    res.json({ message: `Update workout ${req.params.id}` });
});
// DELETE workout
router.delete('/:id', (req, res) => {
    res.json({ message: `Delete workout ${req.params.id}` });
});
exports.default = router;
