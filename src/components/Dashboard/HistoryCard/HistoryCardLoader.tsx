import React from "react";
import { Card, CardHeader, CardContent } from "../../ui/card";
import { Skeleton } from "../../ui/skeleton";

const HistoryCardLoader: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-3 w-[65%]" />
      </CardHeader>
      <CardContent className="space-y-3">
        <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
          {Array(3)
            .fill(null)
            .map((_, index: number) => (
              <li key={index} className="[&:not(:first-child)]:py-3 first:pb-3">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="flex-1 min-w-0">
                    <Skeleton className="h-3 mb-2 w-[70%]" />
                    <Skeleton className="h-2 w-[50%]" />
                  </div>
                  <div className="inline-flex items-center">
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default HistoryCardLoader;
