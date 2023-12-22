import { ObjectId } from "mongodb";
import { Answer } from "./answer";
import { Question } from "./question";

export interface QuestionsSession {
  _id: ObjectId;
  started_at: number;
  topic_name: string;
  topic_id: ObjectId;
  next_question_id: ObjectId | null;
  prev_question_id: ObjectId | null;
  question: Question;
  answers: Array<Answer>;
}

export interface OngoingSessionDetails {
  question_id: string;
  topic_id: string;
  session_id: string;
  topic_name: string;
  no_of_question: number;
  started_at: number;
}
