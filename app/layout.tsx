import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "@/src/styles/globals.scss";
import Providers from "@/src/contexts/Providers";
import { cn } from "@/lib/utils";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Trivia Spark Ai",
  description: "Welcome to Trivia Spark Ai",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
