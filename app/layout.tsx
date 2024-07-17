import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Navbar } from "@/app/components/nav";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Footer from "@/app/components/footer";

export const metadata: Metadata = {
  title: "Lemon2ee",
};

const cx = (...classes: string[]) => classes.filter(Boolean).join(" ");

const navItems = {
  "/": {
    name: "about me",
  },
  "/profile": {
    name: "profile",
  },
  "/blog": {
    name: "blog",
  },
  "/reviews/game": {
    name: "reviews",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cx(GeistSans.variable, GeistMono.variable)}>
      <body className={"min-h-screen flex-col flex items-center justify-center"}>
        <main className={
          "px-5 py-10 lg:py-16 mx-auto max-w-3xl w-full subpixel-antialiased mb-auto"
        }>
          <Navbar navItems={navItems} className={"-ml-[8px] tracking-tight"} />
          {children}
        </main>

        <Footer/>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
