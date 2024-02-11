"use client";
import React from "react";
import { GetAllQuizSummaryResponseClient, GetAllSummaryClient } from "@/src/apis/models/response/GetAllQuizSummaryResponseClient";
import { ColumnDef, SortDirection } from "@tanstack/react-table";
import { DataTable } from "@/src/components/DataTable/DataTable";
import { CaretDownIcon, CaretSortIcon, CaretUpIcon, RocketIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import Banner from "@/src/components/Banner/Banner";
import { useRouter } from "next/navigation";

interface SummaryListSectionProps {
  data: GetAllQuizSummaryResponseClient;
}

const SummaryListSection: React.FC<SummaryListSectionProps> = (props: SummaryListSectionProps) => {
  const router = useRouter();

  const handleSortingIcon = (value: SortDirection | boolean) => {
    switch (value) {
      case "asc": {
        return <CaretUpIcon className="h-4 w-4" />;
      }
      case "desc": {
        return <CaretDownIcon className="h-4 w-4" />;
      }
      default: {
        return <CaretSortIcon className="h-4 w-4" />;
      }
    }
  };

  const columns: ColumnDef<GetAllSummaryClient>[] = [
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <span className="flex items-center" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Date {handleSortingIcon(column.getIsSorted())}
          </span>
        );
      },
      cell: ({ row }) => {
        const currentDate: number = row.getValue("date");
        const intlDate = Intl.DateTimeFormat("en-GB", { dateStyle: "short" });
        return intlDate.format(currentDate);
      },
    },
    {
      accessorKey: "topic_name",
      header: ({ column }) => {
        return (
          <span className="flex items-center" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Topic {handleSortingIcon(column.getIsSorted())}
          </span>
        );
      },
      cell: ({ row }) => {
        return <span className="capitalize">{row.getValue("topic_name")}</span>;
      },
    },
    {
      accessorKey: "no_of_question",
      header: ({ column }) => {
        return (
          <span className="flex items-center" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            No of question {handleSortingIcon(column.getIsSorted())}
          </span>
        );
      },
    },
    {
      accessorKey: "score",
      header: ({ column }) => {
        return (
          <span className="flex items-center" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Score {handleSortingIcon(column.getIsSorted())}
          </span>
        );
      },
      cell: ({ row }) => {
        const currentScore: number = row.getValue("score");
        return (
          <div className={cn("inline-flex items-center", { "text-green-500": currentScore >= 80, "text-red-500": currentScore < 40 })}>
            <RocketIcon className="mr-1" /> {currentScore}%
          </div>
        );
      },
    },
  ];

  const onRowClick = (value: GetAllSummaryClient) => {
    router.push(`/summary?completion_id=${value._id}`);
  };

  return (
    <section className="container px-6 lg:px-16 py-8 pb-0 flex-1 flex flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">All summary</h2>
      </div>
      <div>{props.data.length > 0 ? <DataTable columns={columns} data={props.data} onRowClick={onRowClick} /> : <Banner variant="secondary">You dont have any completed quizzes.</Banner>}</div>
    </section>
  );
};

export default SummaryListSection;
