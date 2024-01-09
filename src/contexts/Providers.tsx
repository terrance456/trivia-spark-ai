import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";
import React, { PropsWithChildren } from "react";

const ThemeProvider = dynamic(() => import("@/src/contexts/ThemeProvider"), { ssr: false, loading: () => <div className="p-5">Loading...</div> });

const Providers: React.FC<any> = ({ children }: PropsWithChildren<any>) => {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;
