import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IWorkout extends Document {
  userId: Types.ObjectId;
  name: string;
  exercises: string[];
  duration: number;
  difficulty: string;
  createdAt: Date;
}

const workoutSchema = new Schema<IWorkout>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  exercises: [{ type: String }],
  duration: { type: Number, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
