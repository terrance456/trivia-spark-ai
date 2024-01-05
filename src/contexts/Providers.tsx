import dynamic from "next/dynamic";
import React, { PropsWithChildren } from "react";

const ThemeProvider = dynamic(() => import("@/src/contexts/ThemeProvider"), { ssr: false, loading: () => <p>Loading Component...</p> });

const Providers: React.FC<any> = ({ children }: PropsWithChildren<any>) => {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </>
  );
};

export default Providers;
