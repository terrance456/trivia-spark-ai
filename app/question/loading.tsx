import { Skeleton } from "@/src/components/ui/skeleton";
import React from "react";

const QuestionAnswerLoader: React.FC = () => {
  return (
    <section className="container px-6 lg:px-16 pb-0 flex-1 flex flex-col">
      <div className="flex justify-end mt-4">
        <Skeleton className="h-4 w-14 mb-2" />
      </div>
      <div className="mt-14 flex-1">
        <div>
          <Skeleton className="mx-auto sm:w-[80%] max-w-[850px] h-5 mb-10" />
          <div>
            {Array(4)
              .fill(null)
              .map((_, index: number) => (
                <Skeleton className="mx-auto max-w-[600px] h-16 rounded-md mb-5" key={index} />
              ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between sm:flex-row flex-col bg-background py-5 sm:py-8 sticky bottom-0 left-0">
        <Skeleton className="sm:w-[150px] h-9 mb-3 sm:mb-0" />
        <Skeleton className="sm:w-[150px] h-9" />
      </div>
    </section>
  );
};

export default QuestionAnswerLoader;
