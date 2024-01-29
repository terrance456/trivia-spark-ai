import React, { ReactNode } from "react";

export interface DetailsTableValue {
  label: string | ReactNode;
  value: string | ReactNode;
}

interface DetailsTableProps {
  list: Array<DetailsTableValue>;
}

const DetailsTable: React.FC<DetailsTableProps> = (props: DetailsTableProps) => {
  return (
    <div>
      {props.list.map((item: DetailsTableValue, index: number) => (
        <div key={index} className="flex justify-between items-center px-3 py-2 [&:nth-child(odd)]:bg-slate-50 dark:[&:nth-child(odd)]:bg-slate-800 text-slate-500 dark:text-slate-300">
          {React.isValidElement(item.label) ? item.label : <span className="text-sm">{item.label}</span>}
          {React.isValidElement(item.value) ? item.value : <span className="text-sm capitalize">{item.value}</span>}
        </div>
      ))}
    </div>
  );
};

export default DetailsTable;
