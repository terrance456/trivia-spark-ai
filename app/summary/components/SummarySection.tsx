"use client";
import React from "react";
import { GetQuizSummaryQuestionDetails, GetQuizSummaryResponseClient } from "@/src/apis/models/response/GetQuizSummaryResponseClient";
import QuestionAnswer from "@/app/question/components/QuestionAnswer";
import AchievementCard from "./AchievementCard";
import TimerScoreCard from "./TimerScoreCard";
import AccuracyScoreCard from "./AccuracyScoreCard";
import Confetti from "@/src/components/Confetti/Confetti";

interface SummarySectionProps {
  details: GetQuizSummaryResponseClient;
}

const SummarySection: React.FC<SummarySectionProps> = ({ details }: SummarySectionProps) => {
  return (
    <section className="container px-6 lg:px-16 py-8 pb-0 flex-1 flex flex-col">
      <div className="mb-7">
        <h2 className="text-2xl font-bold">Summary</h2>
      </div>
      <div className="grid md:grid-cols-2 md:grid-rows-summary gap-4 lg:mx-auto lg:w-[80%]">
        <div className="md:row-start-1 md:row-end-3">
          <AchievementCard score={details.score} />
        </div>
        <div>
          <AccuracyScoreCard details={details} />
        </div>
        <div>
          <TimerScoreCard startTime={details.started_at} endTime={details.completed_at} />
        </div>
      </div>
      <h2 className="text-xl font-semibold my-10 lg:mx-auto lg:w-[80%]">Questions</h2>
      <div>
        {details.questions?.map((question: GetQuizSummaryQuestionDetails, index: number) => (
          <QuestionAnswer
            className="py-7 first-of-type:pt-0"
            questionNo={index}
            key={question.question_id}
            selectedAnswer={question.user_answer_id}
            answers={question.answers}
            viewMode
            correctAnswer={question.answer_id}
            question={{ _id: question.question_id, title: question.question_title }}
          />
        ))}
      </div>
      <Confetti />
    </section>
  );
};

export default SummarySection;
