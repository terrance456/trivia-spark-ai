import { GPTQuestionDetails, GPTQuestionResponse } from "../models/gpt-response";

export function validateGPTOutput(data: GPTQuestionResponse) {
  // check question length
  if (data.questions && data.questions?.length < 4) {
    return false;
  }
  // check question title length
  if (data.questions.some((v: GPTQuestionDetails) => v?.question_title?.length < 1)) {
    return false;
  }
  // check answers length
  if (data.questions.some((v: GPTQuestionDetails) => v?.answers?.length < 4)) {
    return false;
  }
  // check if for invalid correct answer
  if (data.questions.some((v: GPTQuestionDetails) => !v.answers[v.correct_answer])) {
    return false;
  }
  return true;
}
