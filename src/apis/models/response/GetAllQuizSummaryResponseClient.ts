export interface GetAllSummaryClient {
  _id: string;
  topic_name: string;
  no_of_question: number;
  score: number;
  date: number;
}

export type GetAllQuizSummaryResponseClient = Array<GetAllSummaryClient>;
