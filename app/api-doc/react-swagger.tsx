"use client";

import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const DynamicSwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false,
  loading: () => <p>Loading Component...</p>,
});

type Props = {
  spec: Record<string, any>;
};

function ReactSwagger({ spec }: Props) {
  return <DynamicSwaggerUI spec={spec} />;
}

export default ReactSwagger;
