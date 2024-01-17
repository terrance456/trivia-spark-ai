import React, { ReactNode } from "react";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

interface AsyncComponentProps {
  errorComponent: ReactNode;
  loader: ReactNode;
  children: ReactNode | ReactNode[];
}

const AsyncComponent: React.FC<AsyncComponentProps> = ({ errorComponent, loader, children }: AsyncComponentProps) => {
  return (
    <ErrorBoundary errorComponent={errorComponent}>
      <React.Suspense fallback={loader}>{children}</React.Suspense>
    </ErrorBoundary>
  );
};

export default AsyncComponent;
