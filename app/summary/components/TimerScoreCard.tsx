import React from "react";
import { TimerIcon } from "@radix-ui/react-icons";
import { completedTime, formatTimeString } from "@/src/utils/timeUtil";

interface TimerScoreCardProps {
  startTime: number;
  endTime: number;
}

const TimerScoreCard: React.FC<TimerScoreCardProps> = (props: TimerScoreCardProps) => {
  const { minutes, seconds } = completedTime(props.startTime, props.endTime);

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow p-6 h-full">
      <p className="font-semibold text-sm mb-3 flex items-center">
        <TimerIcon className="mr-1 h-4 w-4" />
        Time taken
      </p>
      <h2 className="text-2xl font-bold">
        {formatTimeString(minutes)} : {formatTimeString(seconds)} minutes
      </h2>
      <p className="text-muted-foreground text-sm">Total time to complete your challenge</p>
    </div>
  );
};

export default TimerScoreCard;
