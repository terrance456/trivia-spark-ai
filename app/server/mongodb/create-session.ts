import { TopicsDB } from "./schema/topics.schema";
import { QuestionDB, QuestionSchema } from "./schema/questions.schema";
import { AnswersDB, AnswersSchema } from "./schema/answers.schema";
import { QuestionsSessionsDB, QuestionsSessionsSchema, SessionQuestionList } from "./schema/questions-session.schema";
import { Types } from "mongoose";

export async function generateQuestionSession(topic: TopicsDB, userEmail: string) {
  const questions = await QuestionSchema.find({ topic_id: topic._id });
  const answers: Array<AnswersDB> = [];
  const answersPromise: Array<Promise<AnswersDB[]>> = [];

  questions.forEach(async (question: QuestionDB) => {
    answersPromise.push(AnswersSchema.find({ question_id: question._id }));
  });

  answers.push(...(await Promise.all(answersPromise)).flat());

  const formattedQuestionAnswers: Array<SessionQuestionList> = questions.reduce((prev: Array<SessionQuestionList>, { _id, question_title, correct_asnwer_id }: QuestionDB) => {
    const filteredAnswer: Array<AnswersDB> = answers.filter((v: AnswersDB) => v.question_id.equals(_id));
    const details: SessionQuestionList = {
      question_id: _id,
      question_title,
      answer_id: filteredAnswer.find((v: AnswersDB) => v.metadata.index === correct_asnwer_id)?._id as Types.ObjectId,
      answers: filteredAnswer.map(({ _id, answer_title }) => ({ _id, answer_title })),
      completed: false,
      user_answer_id: null,
    };
    prev.push(details);
    return prev;
  }, []);

  const sessionDBDetails: Omit<QuestionsSessionsDB, "_id"> = {
    started_at: Date.now() + 3 * 1000, // offeset response time
    topic_id: topic._id,
    topic_name: topic.topic_name,
    questions: formattedQuestionAnswers,
    completed: false,
    user_id: userEmail,
    created_at: Date.now(),
  };
  const session = await new QuestionsSessionsSchema(sessionDBDetails).save();

  return {
    _id: session._id,
    started_at: sessionDBDetails.started_at,
    topic_name: sessionDBDetails.topic_name,
    topic_id: sessionDBDetails.topic_id,
    question_id: formattedQuestionAnswers[0].question_id,
  };
}
