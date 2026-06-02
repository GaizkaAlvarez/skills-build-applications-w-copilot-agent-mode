import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';

const seedDatabase = async () => {
  try {
    await connectDatabase();
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
};

seedDatabase();
