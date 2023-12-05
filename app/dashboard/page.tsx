import { nextFetch } from "@/src/apis/fetch";
import React from "react";

const Dashboard: React.FC = async () => {
  const list = await nextFetch("/test" as any);

  return (
    <div>
      <ul>
        {list.status.map((v: any, index: any) => (
          <li key={index}>{v}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
