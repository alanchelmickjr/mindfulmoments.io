import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Weather } from "@/components/Weather";
import { cn } from "@/utils";

export const metadata: Metadata = {
  title: "MindfulMoments.io",
  description: "A Self Awareness Mental Health App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          "flex flex-col min-h-screen"
        )}
      >
        <Nav />
        <Weather />
        {children}
      </body>
    </html>
  );
}
