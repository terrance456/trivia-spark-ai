import { cn } from "@/lib/utils";
import { AnswerClient, QuestionClient } from "@/src/apis/models/response/GetQuestionResponseClient";
import React from "react";

interface QuestionAnswerProps {
  questionNo: number;
  question: QuestionClient;
  answers: Array<AnswerClient>;
  selectedAnswer?: string;
  correctAnswer?: string;
  viewMode?: boolean;
  onChangeAnswer?: (answer: string) => void;
  disabled?: boolean;
  className?: string;
}

const answerIdLabelMapper = ["A", "B", "C", "D"];

const QuestionAnswer: React.FC<QuestionAnswerProps> = ({ question, answers, questionNo, selectedAnswer, correctAnswer, viewMode, disabled, className, onChangeAnswer }: QuestionAnswerProps) => {
  return (
    <div className={cn(className)}>
      <p className={cn("mx-auto mb-10", { "max-w-[600px] text-start": viewMode, "sm:w-[80%] max-w-[850px] text-center": !viewMode })}>
        <span className="mr-2">{questionNo + 1})</span>
        {question.title}
      </p>
      <div>
        {answers.map((answer: AnswerClient, index: number) => (
          <div
            onClick={() => {
              !viewMode && !disabled && onChangeAnswer?.(answer._id);
            }}
            className={cn("mx-auto max-w-[600px] p-5 border border-slate-400 dark:border-slate-600 rounded-md mb-5 last-of-type:mb-0 transition ease-in-out cursor-pointer", {
              "cursor-auto": viewMode,
              "hover:bg-gray-700 hover:text-slate-200 dark:hover:bg-gray-300 dark:hover:text-slate-950": !disabled && !viewMode && answer._id !== selectedAnswer,
              "bg-slate-200 cursor-not-allowed dark:bg-slate-600 dark:text-slate-200": disabled,
              "bg-primary dark:bg-primary text-slate-200  dark:text-slate-950": answer._id === selectedAnswer && !viewMode,
              "dark:bg-red-900 bg-red-500 text-slate-50": answer._id === selectedAnswer && viewMode,
              "dark:bg-green-800 bg-green-500 text-slate-50": answer._id === correctAnswer,
            })}
            key={answer._id}
          >
            <span className="mr-3">{answerIdLabelMapper[index]})</span>
            {answer.answer_title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionAnswer;
