import React from "react";
import { Navbar } from "@/app/components/nav";

export default function BlogLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <body>
      <main className={"px-5 py-8 lg:py-20 mx-auto max-w-xl"}>
        <Navbar />
        {children}
      </main>
    </body>
  );
}
