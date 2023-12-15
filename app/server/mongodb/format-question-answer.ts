import { ObjectId } from "mongodb";
import { GPTQuestionDetails, GPTQuestionResponse } from "../models/gpt-response";
import { QuestionDB } from "../models/questiondb";
import { mongoClient } from "./connection";
import { AnswerDB } from "../models/answerdb";

export async function insertTopicToDB(topic: string) {
  return mongoClient.db("trivia-spark-ai").collection("Topics").insertOne({ topic_name: topic.toLocaleLowerCase(), created_at: Date.now() });
}

export async function insertQuestionToDB(data: GPTQuestionResponse, topic_id: ObjectId) {
  const newQuestions: Array<Omit<QuestionDB, "_id">> = data.questions.map(({ correct_answer, question_title }) => ({ question_title, topic_id, created_at: Date.now(), correct_asnwer_id: String(correct_answer) }));
  return mongoClient.db("trivia-spark-ai").collection("Questions").insertMany(newQuestions);
}

export async function insertAnswerToDB(data: GPTQuestionResponse, question_ids: Record<string, ObjectId>, topic_id: ObjectId) {
  const newAnswers: Array<Omit<AnswerDB, "_id">> = data.questions.flatMap((value: GPTQuestionDetails, questionIndex: number) =>
    value.answers.map((answer: string, answerIndex: number) => ({ answer_title: answer, topic_id, created_at: Date.now(), question_id: question_ids[String(questionIndex)], metadata: { index: String(answerIndex) } }))
  );
  return mongoClient.db("trivia-spark-ai").collection("Answers").insertMany(newAnswers);
}
