import React from "react";
import { nextFetch } from "@/src/apis/fetch";
import { ApiRoutes } from "@/src/apis/routes.enum";
import { GetQuizSummaryResponseClient } from "@/src/apis/models/response/GetQuizSummaryResponseClient";
import SummarySection from "./components/SummarySection";

interface QuestionPageSearchParams {
  completion_id: string;
}

const SummaryPage = async ({ searchParams: { completion_id } }: { searchParams: QuestionPageSearchParams }) => {
  const response: GetQuizSummaryResponseClient = await nextFetch(ApiRoutes.getQuizSummary.replace("{completion_id}", completion_id) as ApiRoutes, { method: "GET" });
  return <SummarySection details={response} />;
};

export default SummaryPage;
