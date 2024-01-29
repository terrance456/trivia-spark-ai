import { Skeleton } from "@/src/components/ui/skeleton";
import React from "react";

const SummaryLoader: React.FC = () => {
  return (
    <section className="container px-6 lg:px-16 py-8 pb-0 flex-1 flex flex-col">
      <div className="mb-7">
        <Skeleton className="w-[170px] h-6" />
      </div>
      <div className="grid md:grid-cols-2 md:grid-rows-summary gap-4 lg:mx-auto lg:w-[80%]">
        <div className="md:row-start-1 md:row-end-3">
          <Skeleton className="w-full h-[300px] sm:h-full" />
        </div>
        <div>
          <Skeleton className="w-full h-[100px] sm:h-[100px]" />
        </div>
        <div>
          <Skeleton className="w-full h-[100px] sm:h-full" />
        </div>
      </div>
      <h2 className="text-xl font-semibold my-10 lg:mx-auto lg:w-[80%]">
        <Skeleton className="w-[170px] h-5" />
      </h2>
      <div>
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
    </section>
  );
};

export default SummaryLoader;
