export interface QuestionClient {
  _id: string;
  title: string;
}

export interface AnswerClient {
  _id: string;
  answer_title: string;
}

export interface GetQuestionResponseClient {
  _id: string;
  started_at: number;
  topic_name: string;
  topic_id: string;
  next_question_id: string;
  prev_question_id: string;
  question: QuestionClient;
  answers: Array<AnswerClient>;
}
