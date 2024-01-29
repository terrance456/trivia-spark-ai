import React from "react";
import { cn } from "@/lib/utils";
import { BarChartIcon } from "@radix-ui/react-icons";
import { GetQuizSummaryResponseClient } from "@/src/apis/models/response/GetQuizSummaryResponseClient";
import DetailsTable, { DetailsTableValue } from "@/src/components/DetailsTable/DetailsTable";
import { calculateAccuracy, completedTime } from "@/src/utils/timeUtil";

interface AccuracyScoreCardProps {
  details: GetQuizSummaryResponseClient;
}

const AccuracyScoreCard: React.FC<AccuracyScoreCardProps> = (props: AccuracyScoreCardProps) => {
  const { minutes } = completedTime(props.details.started_at, props.details.completed_at);
  const accuracy: number = calculateAccuracy(minutes, props.details.score);
  const statsList: Array<DetailsTableValue> = [
    {
      label: "Title",
      value: props.details.topic_name,
    },
    {
      label: "Score",
      value: <span className={cn("text-red-500 font-bold", { "text-green-500": props.details.score >= 80, "text-red-500": props.details.score < 40 })}>{props.details.score.toString()}%</span>,
    },
    {
      label: "Accuracy",
      value: <span className={cn("text-red-500 font-bold", { "text-green-500": accuracy >= 80, "text-red-500": accuracy < 40 })}>{accuracy}%</span>,
    },
  ];

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow h-full p-6">
      <p className="font-semibold text-sm mb-3 flex items-center">
        <BarChartIcon className="mr-1" /> Stats
      </p>
      <DetailsTable list={statsList} />
    </div>
  );
};

export default AccuracyScoreCard;
