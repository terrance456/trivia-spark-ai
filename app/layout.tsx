import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/src/styles/globals.scss";
import Providers from "@/src/contexts/Providers";

const inter = Inter({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "Trivia Spark Ai",
  description: "Welcome to Trivia Spark Ai",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
