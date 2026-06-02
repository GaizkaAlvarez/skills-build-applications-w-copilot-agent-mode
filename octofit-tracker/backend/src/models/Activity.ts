import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IActivity extends Document {
  userId: Types.ObjectId;
  type: string;
  duration: number;
  distance?: number;
  calories?: number;
  createdAt: Date;
}

const activitySchema = new Schema<IActivity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  distance: { type: Number },
  calories: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
