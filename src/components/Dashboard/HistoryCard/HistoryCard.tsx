import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { cn } from "@/lib/utils";
import { RocketIcon } from "@radix-ui/react-icons";
import { GetSummaryListClient, GetSummaryListResponseClient } from "@/src/apis/models/response/GetSummaryListResponseClient";
import { nextFetch } from "@/src/apis/fetch";
import { ApiRoutes } from "@/src/apis/routes.enum";
import Link from "next/link";

const HistoryCard: React.FC = async () => {
  const response: GetSummaryListResponseClient = await nextFetch(ApiRoutes.getSummaryList, { next: { revalidate: 0 } });

  const getScoreElement = (value: number) => {
    return (
      <div className={cn("inline-flex items-center text-base font-semibold text-gray-900", { "text-green-500": value >= 80, "text-red-500": value < 40 })}>
        <RocketIcon className="mr-1" /> {value}%
      </div>
    );
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>History</CardTitle>
        <CardDescription>Check out your previous quizez</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
          {response.map((item: GetSummaryListClient) => (
            <li key={item._id} className=" [&:not(:first-child)]:py-3 first:pb-3">
              <Link href="#">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white capitalize">{item.topic_name}</p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">No of question {item.no_of_question}</p>
                  </div>
                  {getScoreElement(item.score)}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default HistoryCard;
