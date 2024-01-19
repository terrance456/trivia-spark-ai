import { nextFetch } from "@/src/apis/fetch";
import { GetQuestionResponseClient } from "@/src/apis/models/response/GetQuestionResponseClient";
import { ApiRoutes } from "@/src/apis/routes.enum";
import React from "react";

interface QuestionPageSearchParams {
  topic_id: string;
  session_id: string;
  question_id: string;
}

const QuestionPage = async ({ searchParams }: { searchParams: QuestionPageSearchParams }) => {
  const response: GetQuestionResponseClient = await nextFetch(ApiRoutes.getQuestion, { headers: { "Content-type": "application/json" }, method: "POST", body: JSON.stringify(searchParams) });

  return (
    <div className="p-12">
      <p>{response.question.title}</p>
      answers:
      <ol>
        {response.answers?.map((value) => (
          <li key={value._id}>{value.answer_title}</li>
        ))}
      </ol>
    </div>
  );
};

export default QuestionPage;
