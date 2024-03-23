import mongoose, { Schema, Types } from "mongoose";
import { CollectionName } from "../mongodb.enum";
import { SessionQuestionList } from "./questions-session.schema";

export type FinalSummaryQuestionAnswer = Omit<SessionQuestionList, "completed">;

export interface SummaryDB {
  _id: Types.ObjectId;
  questions: Array<FinalSummaryQuestionAnswer>;
  started_at: number;
  completed_at: number;
  topic_name: string;
  topic_id: string;
  score: number;
  user_id: string;
}

const summarySchema = new Schema<SummaryDB>(
  {
    questions: Array<FinalSummaryQuestionAnswer>,
    started_at: Number,
    completed_at: Number,
    topic_name: String,
    topic_id: String,
    score: Number,
    user_id: String,
  },
  { collection: "Summary" }
);

export const SummarySchema: mongoose.Model<SummaryDB> = mongoose?.models?.Summary || mongoose.model<SummaryDB>(CollectionName.SUMMARY, summarySchema);
