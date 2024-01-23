import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../ui/card";
import { GetPopularTopicsResponseClient } from "@/src/apis/models/response/GetPopularTopicsResponseClient";
import { nextFetch } from "@/src/apis/fetch";
import { ApiRoutes } from "@/src/apis/routes.enum";
import PopularTopicList from "./PopularTopicList";

const PopularTopicCard: React.FC = async () => {
  const response: GetPopularTopicsResponseClient = await nextFetch(ApiRoutes.getPopularTopics);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Popular Quizzes</CardTitle>
        <CardDescription>Top 10 quizzes, try them out!</CardDescription>
      </CardHeader>
      <CardContent>
        <PopularTopicList list={response} />
      </CardContent>
    </Card>
  );
};

export default PopularTopicCard;
