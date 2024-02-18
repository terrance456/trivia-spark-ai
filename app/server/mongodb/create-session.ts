import { QuestionsSessionDB, SessionQuestionList } from "../models/questionssessiondb";
import { QuestionDB } from "../models/questiondb";
import { MongoClient, ObjectId, WithId } from "mongodb";
import { AnswerDB } from "../models/answerdb";
import { TopicDB } from "../models/topicdb";
import { CollectionName, DBName } from "./mongodb.enum";

export async function generateQuestionSession(topic: TopicDB, userEmail: string, mongoClient: MongoClient) {
  const questions = await mongoClient.db(DBName.TRIVIA_SPARK_AI).collection<QuestionDB>(CollectionName.QUESTIONS).find({ topic_id: topic._id }).toArray();
  const answers: Array<AnswerDB> = [];
  const answersPromise: Array<Promise<WithId<AnswerDB>[]>> = [];

  questions.forEach(async (question: QuestionDB) => {
    answersPromise.push(mongoClient.db(DBName.TRIVIA_SPARK_AI).collection<AnswerDB>(CollectionName.ANSWERS).find({ question_id: question._id }).toArray());
  });

  answers.push(...(await Promise.all(answersPromise)).flat());

  const formattedQuestionAnswers: Array<SessionQuestionList> = questions.reduce((prev: Array<SessionQuestionList>, { _id, question_title, correct_asnwer_id }: WithId<QuestionDB>) => {
    const filteredAnswer: Array<AnswerDB> = answers.filter((v: AnswerDB) => v.question_id.equals(_id));
    const details: SessionQuestionList = {
      question_id: _id,
      question_title,
      answer_id: filteredAnswer.find((v: AnswerDB) => v.metadata.index === correct_asnwer_id)?._id as ObjectId,
      answers: filteredAnswer.map(({ _id, answer_title }) => ({ _id, answer_title })),
      completed: false,
      user_answer_id: null,
    };
    prev.push(details);
    return prev;
  }, []);

  const sessionDBDetails: Omit<QuestionsSessionDB, "_id"> = {
    started_at: Date.now() + 3 * 1000, // offeset response time
    topic_id: topic._id,
    topic_name: topic.topic_name,
    questions: formattedQuestionAnswers,
    completed: false,
    user_id: userEmail,
    created_at: Date.now(),
  };
  const session = await mongoClient.db(DBName.TRIVIA_SPARK_AI).collection(CollectionName.QUESTIONSSESSIONS).insertOne(sessionDBDetails);

  return {
    _id: session.insertedId,
    started_at: sessionDBDetails.started_at,
    topic_name: sessionDBDetails.topic_name,
    topic_id: sessionDBDetails.topic_id,
    question_id: formattedQuestionAnswers[0].question_id,
  };
}
