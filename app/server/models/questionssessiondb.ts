import { ObjectId } from "mongodb";
import { Answer } from "./answer";

export interface SessionQuestionList {
  question_id: ObjectId;
  question_title: string;
  completed: boolean;
  user_answer_id: ObjectId | null;
  answer_id: ObjectId;
  answers: Array<Answer>;
}

export interface QuestionsSessionDB {
  _id: ObjectId;
  started_at: number;
  topic_id: ObjectId;
  topic_name: string;
  questions: Array<SessionQuestionList>;
  completed: boolean;
  user_id: string;
  created_at: number;
}
