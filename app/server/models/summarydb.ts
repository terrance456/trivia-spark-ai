import { ObjectId } from "mongodb";

export interface QuestionsWithAnswers {
  question_id: string;
  question_title: string;
  actual_answer: { id: ObjectId; title: string };
  user_answer: { id: ObjectId; title: string };
}

export interface SummaryDB {
  _id: ObjectId;
  started_at: number;
  ended_at: number;
  question_with_answers: Array<QuestionsWithAnswers>;
  topic_id: ObjectId;
  topic_name: string;
  user_id: string;
  created_at: number;
}
