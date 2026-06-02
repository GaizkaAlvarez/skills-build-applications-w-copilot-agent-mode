"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// GET all teams
router.get('/', (req, res) => {
    res.json({ message: 'Get all teams' });
});
// GET team by ID
router.get('/:id', (req, res) => {
    res.json({ message: `Get team ${req.params.id}` });
});
// POST create team
router.post('/', (req, res) => {
    res.json({ message: 'Create team' });
});
// PUT update team
router.put('/:id', (req, res) => {
    res.json({ message: `Update team ${req.params.id}` });
});
// DELETE team
router.delete('/:id', (req, res) => {
    res.json({ message: `Delete team ${req.params.id}` });
});
exports.default = router;
