import React from "react";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { Skeleton } from "../../ui/skeleton";

const PopularTopicCardLoader = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-3 w-[65%]" />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
          {Array(10)
            .fill(null)
            .map((_, index: number) => (
              <div key={index} className="flex items-center cursor-pointer py-3">
                <Skeleton className="mr-3 h-7 w-7" />
                <div className="w-full">
                  <Skeleton className="h-3 mb-2 w-[70%]" />
                  <Skeleton className="h-2 w-[50%]" />
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularTopicCardLoader;
