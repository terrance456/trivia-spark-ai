import { ObjectId } from "mongodb";
import { SessionQuestionList } from "./questionssessiondb";

export type FinalSummaryQuestionAnswer = Omit<SessionQuestionList, "completed">;

export interface SummaryDB {
  _id: ObjectId;
  questions: Array<FinalSummaryQuestionAnswer>;
  started_at: number;
  completed_at: number;
  topic_name: string;
  topic_id: string;
  score: number;
  user_id: string;
}
