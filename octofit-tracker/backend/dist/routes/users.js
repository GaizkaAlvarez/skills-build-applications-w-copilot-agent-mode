"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// GET all users
router.get('/', (req, res) => {
    res.json({ message: 'Get all users' });
});
// GET user by ID
router.get('/:id', (req, res) => {
    res.json({ message: `Get user ${req.params.id}` });
});
// POST create user
router.post('/', (req, res) => {
    res.json({ message: 'Create user' });
});
// PUT update user
router.put('/:id', (req, res) => {
    res.json({ message: `Update user ${req.params.id}` });
});
// DELETE user
router.delete('/:id', (req, res) => {
    res.json({ message: `Delete user ${req.params.id}` });
});
exports.default = router;
