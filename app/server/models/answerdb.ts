import { ObjectId } from "mongodb";
import { Answer } from "./answer";

export interface AnswerDB {
  _id: ObjectId;
  answer_title: string;
  question_id: ObjectId;
  topic_id: ObjectId;
  created_at: number;
  metadata: { index: string };
}
