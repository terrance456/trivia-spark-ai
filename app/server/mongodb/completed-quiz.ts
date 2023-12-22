import { WithId } from "mongodb";
import { QuestionsSessionDB, SessionQuestionList } from "../models/questionssessiondb";

export function formatCompletedQuiz(data: WithId<QuestionsSessionDB>, completed_at: number) {
  const { questions, started_at, topic_name, topic_id } = data;
  const formattedQuestions = questions.map(({ completed, ...item }: SessionQuestionList) => ({
    ...item,
  }));
  const answerAccuracy: number = questions.reduce((prev: number, current: SessionQuestionList) => {
    if (current.answer_id.equals(current.user_answer_id)) {
      prev++;
    }
    return prev;
  }, 0);
  const score: number = Number(((answerAccuracy / data.questions.length) * 100).toFixed(2));

  return {
    questions: formattedQuestions,
    started_at,
    completed_at,
    topic_name,
    topic_id,
    score,
  };
}
