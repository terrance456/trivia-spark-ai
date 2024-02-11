"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/src/components/ui/card";

export default function SummaryListError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.log(error);
  }, [error]);

  return (
    <section className="container px-6 lg:px-16 pb-0 flex-1 flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Something went wrong!</CardTitle>
          <CardDescription>We apologize for the inconvenience, please try again later</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={() => reset()}>
            Retry
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
