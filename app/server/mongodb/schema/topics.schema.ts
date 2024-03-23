import mongoose, { Schema, Types } from "mongoose";
import { CollectionName } from "../mongodb.enum";

export interface TopicsDB {
  _id: Types.ObjectId;
  topic_name: string;
  created_at: Date;
  no_of_question: number;
  counts: number;
}

const topicsSchema = new Schema<TopicsDB>(
  {
    topic_name: String,
    created_at: Date,
    no_of_question: Number,
    counts: Number,
  },
  { collection: "Topics" }
);

export const TopicsSchema: mongoose.Model<TopicsDB> = mongoose?.models?.Topics || mongoose.model<TopicsDB>(CollectionName.TOPICS, topicsSchema);
