import mongoose, { Schema, Types } from "mongoose";
import { CollectionName } from "../mongodb.enum";
import { AnswerT } from "./answers.schema";
import { QuestionT } from "./questions.schema";

export interface SessionQuestionList {
  question_id: Types.ObjectId;
  question_title: string;
  completed: boolean;
  user_answer_id: Types.ObjectId | null;
  answer_id: Types.ObjectId;
  answers: Array<AnswerT>;
}

export interface QuestionsSessionsDB {
  _id: Types.ObjectId;
  started_at: number;
  topic_id: Types.ObjectId;
  topic_name: string;
  questions: Array<SessionQuestionList>;
  completed: boolean;
  user_id: string;
  created_at: number;
}

export interface QuestionsSession {
  _id: Types.ObjectId;
  started_at: number;
  topic_name: string;
  topic_id: Types.ObjectId;
  next_question_id: Types.ObjectId | null;
  prev_question_id: Types.ObjectId | null;
  question: QuestionT;
  answers: Array<AnswerT>;
}

export interface OngoingSessionDetails {
  question_id: string;
  topic_id: string;
  session_id: string;
  topic_name: string;
  no_of_question: number;
  started_at: number;
}

const questionsSessionsSchema = new Schema<QuestionsSessionsDB>(
  {
    started_at: Number,
    topic_id: Schema.Types.ObjectId,
    topic_name: String,
    questions: Array<SessionQuestionList>,
    completed: Boolean,
    user_id: String,
    created_at: Number,
  },
  { collection: "QuestionsSessions" }
);

export const QuestionsSessionsSchema: mongoose.Model<QuestionsSessionsDB> = mongoose?.models?.QuestionsSessions || mongoose.model<QuestionsSessionsDB>(CollectionName.QUESTIONSSESSIONS, questionsSessionsSchema);
