import React from "react";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { Skeleton } from "../../ui/skeleton";

const CardLoader = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-3 w-[65%]" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-8 w-full " />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </CardContent>
    </Card>
  );
};

export default CardLoader;
