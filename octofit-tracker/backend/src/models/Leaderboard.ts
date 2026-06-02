import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: Types.ObjectId;
  userName: string;
  score: number;
  rank: number;
  period: string;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  score: { type: Number, required: true, default: 0 },
  rank: { type: Number },
  period: { type: String, enum: ['daily', 'weekly', 'monthly'], default: 'weekly' },
  updatedAt: { type: Date, default: Date.now }
});

export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
