import mongoose, { Schema, Types } from "mongoose";
import { CollectionName } from "../mongodb.enum";

export interface QuestionT {
  _id: Types.ObjectId;
  title: string;
}

export interface QuestionDB {
  _id: Types.ObjectId;
  question_title: string;
  topic_id: Types.ObjectId;
  correct_asnwer_id: string;
  created_at: number;
}

const questionSchema = new Schema<QuestionDB>(
  {
    question_title: String,
    topic_id: Schema.Types.ObjectId,
    correct_asnwer_id: String,
    created_at: Number,
  },
  { collection: "Questions" }
);

export const QuestionSchema: mongoose.Model<QuestionDB> = mongoose?.models?.Questions || mongoose.model<QuestionDB>(CollectionName.QUESTIONS, questionSchema);
