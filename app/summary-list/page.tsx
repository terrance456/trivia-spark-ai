import React from "react";
import { nextFetch } from "@/src/apis/fetch";
import { GetAllQuizSummaryResponseClient } from "@/src/apis/models/response/GetAllQuizSummaryResponseClient";
import { ApiRoutes } from "@/src/apis/routes.enum";
import SummaryListSection from "./SummaryListSection";

const SummaryList: React.FC = async () => {
  const response: GetAllQuizSummaryResponseClient = await nextFetch(ApiRoutes.getAllQuizSummary, { method: "GET" });
  return <SummaryListSection data={response} />;
};

export default SummaryList;
