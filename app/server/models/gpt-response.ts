export interface GPTQuestionDetails {
  question_title: string;
  answers: Array<string>;
  correct_answer: number;
}

export interface GPTQuestionResponse {
  questions: Array<GPTQuestionDetails>;
}
