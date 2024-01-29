import { AnswerClient } from "./GetQuestionResponseClient";

export interface GetQuizSummaryQuestionDetails {
  question_id: string;
  question_title: string;
  user_answer_id: string;
  answer_id: string;
  answers: Array<AnswerClient>;
}

export interface GetQuizSummaryResponseClient {
  _id: string;
  questions: Array<GetQuizSummaryQuestionDetails>;
  started_at: number;
  completed_at: number;
  topic_name: string;
  topic_id: string;
  score: number;
}
