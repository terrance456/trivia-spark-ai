import { Types } from "mongoose";
import { GPTQuestionDetails, GPTQuestionResponse } from "../models/gpt-response";
import { TopicsSchema } from "./schema/topics.schema";
import { QuestionDB, QuestionSchema } from "./schema/questions.schema";
import { AnswersDB, AnswersSchema } from "./schema/answers.schema";

export async function insertTopicToDB(topic: string, no_of_question: number) {
  return new TopicsSchema({ topic_name: topic.toLocaleLowerCase(), created_at: Date.now(), no_of_question, counts: 1 }).save();
}

export async function insertQuestionToDB(data: GPTQuestionResponse, topic_id: Types.ObjectId) {
  const newQuestions: Array<Omit<QuestionDB, "_id">> = data.questions.map(({ correct_answer, question_title }) => ({ question_title, topic_id, created_at: Date.now(), correct_asnwer_id: String(correct_answer) }));
  return QuestionSchema.insertMany(newQuestions);
}

export async function insertAnswerToDB(data: GPTQuestionResponse, question_ids: Types.ObjectId[], topic_id: Types.ObjectId) {
  const newAnswers: Array<Omit<AnswersDB, "_id">> = data.questions.flatMap((value: GPTQuestionDetails, questionIndex: number) =>
    value.answers.map((answer: string, answerIndex: number) => ({ answer_title: answer, topic_id, created_at: Date.now(), question_id: question_ids[questionIndex], metadata: { index: String(answerIndex) } }))
  );
  return AnswersSchema.insertMany(newAnswers);
}

export async function updateTopicCount(topic_id: Types.ObjectId) {
  return TopicsSchema.updateOne({ _id: topic_id }, { $inc: { counts: 1 } });
}
