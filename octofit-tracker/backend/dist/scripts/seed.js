"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../config/database");
const User_1 = require("../models/User");
const Team_1 = require("../models/Team");
const Activity_1 = require("../models/Activity");
const Workout_1 = require("../models/Workout");
const Leaderboard_1 = require("../models/Leaderboard");
/**
 * Seed the octofit_db database with test data
 */
const seedDatabase = async () => {
    try {
        await (0, database_1.connectDatabase)();
        console.log('Connected to database, starting seed...');
        // Clear existing collections
        await User_1.User.deleteMany({});
        await Team_1.Team.deleteMany({});
        await Activity_1.Activity.deleteMany({});
        await Workout_1.Workout.deleteMany({});
        await Leaderboard_1.Leaderboard.deleteMany({});
        console.log('Cleared existing collections');
        // Create teams
        const teams = await Team_1.Team.insertMany([
            { name: 'Fitness Warriors', description: 'A team dedicated to fitness excellence' },
            { name: 'Marathon Runners', description: 'For long distance running enthusiasts' },
            { name: 'Yoga Masters', description: 'Mindfulness and flexibility group' }
        ]);
        console.log('Teams created:', teams.length);
        // Create users
        const users = await User_1.User.insertMany([
            { name: 'Alice Johnson', email: 'alice@example.com', teamId: teams[0]._id },
            { name: 'Bob Smith', email: 'bob@example.com', teamId: teams[0]._id },
            { name: 'Charlie Brown', email: 'charlie@example.com', teamId: teams[1]._id },
            { name: 'Diana Prince', email: 'diana@example.com', teamId: teams[2]._id },
            { name: 'Ethan Hunt', email: 'ethan@example.com', teamId: teams[1]._id }
        ]);
        console.log('Users created:', users.length);
        // Create activities
        const activities = await Activity_1.Activity.insertMany([
            { userId: users[0]._id, type: 'Running', duration: 45, distance: 8.5, calories: 650 },
            { userId: users[0]._id, type: 'Cycling', duration: 60, distance: 25, calories: 800 },
            { userId: users[1]._id, type: 'Swimming', duration: 30, distance: 1.2, calories: 400 },
            { userId: users[2]._id, type: 'Running', duration: 90, distance: 15, calories: 1200 },
            { userId: users[3]._id, type: 'Yoga', duration: 60, calories: 300 },
            { userId: users[4]._id, type: 'Cycling', duration: 75, distance: 30, calories: 1000 }
        ]);
        console.log('Activities created:', activities.length);
        // Create workouts
        const workouts = await Workout_1.Workout.insertMany([
            { userId: users[0]._id, name: 'Morning Run', exercises: ['Warm-up', 'Running', 'Cool-down'], duration: 45, difficulty: 'Medium' },
            { userId: users[1]._id, name: 'Strength Training', exercises: ['Push-ups', 'Squats', 'Deadlifts'], duration: 60, difficulty: 'Hard' },
            { userId: users[2]._id, name: 'Marathon Training', exercises: ['Long-distance running'], duration: 120, difficulty: 'Hard' },
            { userId: users[3]._id, name: 'Yoga Flow', exercises: ['Asanas', 'Breathing exercises', 'Meditation'], duration: 60, difficulty: 'Medium' },
            { userId: users[4]._id, name: 'HIIT Workout', exercises: ['Burpees', 'Jump squats', 'Mountain climbers'], duration: 30, difficulty: 'Hard' }
        ]);
        console.log('Workouts created:', workouts.length);
        // Create leaderboard entries
        const leaderboardEntries = await Leaderboard_1.Leaderboard.insertMany([
            { userId: users[0]._id, userName: 'Alice Johnson', score: 2450, rank: 1, period: 'weekly' },
            { userId: users[1]._id, userName: 'Bob Smith', score: 2100, rank: 2, period: 'weekly' },
            { userId: users[2]._id, userName: 'Charlie Brown', score: 1950, rank: 3, period: 'weekly' },
            { userId: users[3]._id, userName: 'Diana Prince', score: 1800, rank: 4, period: 'weekly' },
            { userId: users[4]._id, userName: 'Ethan Hunt', score: 1650, rank: 5, period: 'weekly' }
        ]);
        console.log('Leaderboard entries created:', leaderboardEntries.length);
        console.log('Database seeded successfully!');
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
    finally {
        await mongoose_1.default.disconnect();
        console.log('Database connection closed');
    }
};
seedDatabase();
