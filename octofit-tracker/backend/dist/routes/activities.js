"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// GET all activities
router.get('/', (req, res) => {
    res.json({ message: 'Get all activities' });
});
// GET activity by ID
router.get('/:id', (req, res) => {
    res.json({ message: `Get activity ${req.params.id}` });
});
// POST create activity
router.post('/', (req, res) => {
    res.json({ message: 'Create activity' });
});
// PUT update activity
router.put('/:id', (req, res) => {
    res.json({ message: `Update activity ${req.params.id}` });
});
// DELETE activity
router.delete('/:id', (req, res) => {
    res.json({ message: `Delete activity ${req.params.id}` });
});
exports.default = router;
