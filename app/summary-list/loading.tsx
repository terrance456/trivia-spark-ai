import React from "react";
import { Skeleton } from "@/src/components/ui/skeleton";

const SummaryListLoader: React.FC = () => {
  return (
    <section className="container px-6 lg:px-16 py-8 pb-0 flex-1 flex flex-col">
      <div className="mb-7">
        <Skeleton className="w-[170px] h-6" />
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <Skeleton className="h-6 w-[100px] ml-auto mb-3" />
        </div>
        {Array(5)
          .fill(null)
          .map((_, index: number) => (
            <div key={index} className="flex justify-between gap-10">
              <Skeleton className="h-6 w-[25%] sm:w-[20%]" />
              <Skeleton className="h-6 w-[25%] sm:w-[45%]" />
              <Skeleton className="h-6 w-[25%] sm:w-[20%]" />
              <Skeleton className="h-6 w-[25%] sm:w-[15%]" />
            </div>
          ))}
      </div>
      <div className="mt-5 flex justify-end">
        <Skeleton className="h-6 w-[80px] mr-3" />
        <Skeleton className="h-6 w-[50px]" />
      </div>
    </section>
  );
};

export default SummaryListLoader;
