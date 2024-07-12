import React from "react";
import { Navbar } from "@/app/components/nav";
import {reviewNavItems} from "@/utils/utils";

export default function ReviewsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Include shared UI here e.g. a header or sidebar */}
      <Navbar navItems={reviewNavItems} className={"-ml-[8px] mt-5 mb-8"} />
      {children}
    </>
  );
}
