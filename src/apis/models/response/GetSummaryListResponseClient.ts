export interface GetSummaryListClient {
  _id: string;
  topic_name: string;
  no_of_question: number;
  score: number;
}

export type GetSummaryListResponseClient = Array<GetSummaryListClient>;
