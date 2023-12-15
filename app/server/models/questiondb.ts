import { ObjectId } from "mongodb";

export interface QuestionDB {
  _id: ObjectId;
  question_title: string;
  topic_id: ObjectId;
  correct_asnwer_id: string;
  created_at: number;
}
