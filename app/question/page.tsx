import React from "react";
import { nextFetch } from "@/src/apis/fetch";
import { GetQuestionResponseClient } from "@/src/apis/models/response/GetQuestionResponseClient";
import { ApiRoutes } from "@/src/apis/routes.enum";
import QuestionAnswerSection from "./components/QuestionAnswerSection";

interface QuestionPageSearchParams {
  topic_id: string;
  session_id: string;
  question_id: string;
}

const QuestionPage = async ({ searchParams }: { searchParams: QuestionPageSearchParams }) => {
  const response: GetQuestionResponseClient = await nextFetch(ApiRoutes.getQuestion, { headers: { "Content-type": "application/json" }, method: "POST", body: JSON.stringify(searchParams) });
  return <QuestionAnswerSection details={response} />;
};

export default QuestionPage;
