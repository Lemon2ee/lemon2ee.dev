import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Navbar } from "@/app/components/nav";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata: Metadata = {
  title: "Yizhou Wang",
  description: "This is where I document things",
};

const cx = (...classes: string[]) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cx(GeistSans.variable, GeistMono.variable)}>
      <body
        className={"px-5 py-8 lg:py-20 mx-auto max-w-3xl subpixel-antialiased"}
      >
        <Navbar />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
