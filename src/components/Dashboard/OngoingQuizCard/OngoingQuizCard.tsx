import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { nextFetch } from "@/src/apis/fetch";
import { OngoingSessionResponseClient } from "@/src/apis/models/response/OngoingSessionResponseClient";
import { ApiRoutes } from "@/src/apis/routes.enum";
import { TimerIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import Banner from "../../Banner/Banner";
import ClientLink from "../../ClientLink/ClientLink";
import { remainingTimeForward } from "@/src/utils/timeUtil";

export const OngoingQuizCard: React.FC = async () => {
  const response: Array<OngoingSessionResponseClient> = await nextFetch(ApiRoutes.getOngoingSession);

  const genereteUrl = (value: OngoingSessionResponseClient) => {
    return `/question?topic_id=${value.topic_id}&session_id=${value.session_id}&question_id=${value.question_id}`;
  };

  const renderTime = (sessionTimeInMillis: number) => {
    const { minutes, seconds } = remainingTimeForward(sessionTimeInMillis);
    return (
      <>
        <TimerIcon className={cn("h-3 w-3 mr-2", { "text-yellow-500": minutes >= 8 })} />
        <time className={cn("text-xs", { "text-yellow-500 font-bold": minutes >= 8 })}>{`${String(minutes > 0 ? minutes : 0).padStart(2, "0")} : ${String(seconds > 0 ? seconds : 0).padStart(2, "0")}`}</time>
      </>
    );
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Ongoing Quizzes</CardTitle>
        <CardDescription>Complete your quizzes before it expires!</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          {response.length > 0 ? (
            <ul className="flex gap-y-4 flex-col">
              {response.map((v: OngoingSessionResponseClient) => (
                <li key={v.session_id}>
                  <ClientLink enableRefresh href={genereteUrl(v)} className="flex justify-between bg-slate-50 dark:bg-slate-800 p-3 rounded truncate">
                    <span className="capitalize text-sm text-slate-600 dark:text-slate-300 block w-[70%] truncate">{v.topic_name}</span>
                    <span className="text-accent-foreground flex items-center text-slate-600 dark:text-slate-300">{renderTime(v.started_at)}</span>
                  </ClientLink>
                </li>
              ))}
            </ul>
          ) : (
            <Banner variant="secondary">You dont have any going session at the moment. Generate more quizzes!</Banner>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
