import mongoose, { Schema, Types } from "mongoose";
import { CollectionName } from "../mongodb.enum";

export interface AnswersDB {
  _id: Types.ObjectId;
  answer_title: string;
  question_id: Types.ObjectId;
  topic_id: Types.ObjectId;
  created_at: number;
  metadata: { index: string };
}

export interface AnswerT {
  _id: Types.ObjectId;
  answer_title: string;
}

const answersSchema = new Schema<AnswersDB>(
  {
    answer_title: String,
    question_id: Schema.Types.ObjectId,
    topic_id: Schema.Types.ObjectId,
    created_at: Number,
    metadata: { index: String },
  },
  { collection: "Answers" }
);

export const AnswersSchema: mongoose.Model<AnswersDB> = mongoose?.models?.Answers || mongoose.model<AnswersDB>(CollectionName.ANSWERS, answersSchema);
