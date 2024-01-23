export interface GetPopularTopicsDetails {
  topic_name: string;
  no_of_question: number;
}

export type GetPopularTopicsResponseClient = Array<GetPopularTopicsDetails>;
