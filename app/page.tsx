import React from "react";
import HistoryCard from "@/src/components/Dashboard/HistoryCard/HistoryCard";
import { OngoingQuizCard } from "@/src/components/Dashboard/OngoingQuizCard/OngoingQuizCard";
import QuestionGenerateForm from "@/src/components/Dashboard/QuestionGenerateForm/QuestionGenerateForm";
import CardError from "@/src/components/Dashboard/CardError/CardError";
import AsyncComponent from "@/src/components/AsyncComponent/AsyncComponent";
import CardLoader from "@/src/components/Dashboard/CardLoader/CardLoader";
import HistoryCardLoader from "@/src/components/Dashboard/HistoryCard/HistoryCardLoader";

export default async function Home() {
  return (
    <section className="container px-6 lg:px-16 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-dashboard gap-6 flex-1">
      <div className="col-start-1 sm:col-end-3 md:col-end-3">
        <QuestionGenerateForm />
      </div>
      <div className="min-h-[250px] sm:col-start-1 sm:col-end-3 md:row-end-3 md:col-start-1 md:col-end-3 lg:row-span-2 lg:col-auto">
        <CardLoader />
      </div>
      <div className="min-h-[250px]">
        <AsyncComponent loader={<HistoryCardLoader />} errorComponent={<CardError text="history" />}>
          <HistoryCard />
        </AsyncComponent>
      </div>
      <div className="min-h-[250px]">
        <AsyncComponent loader={<CardLoader />} errorComponent={<CardError text="ongoing session" />}>
          <OngoingQuizCard />
        </AsyncComponent>
      </div>
    </section>
  );
}
