import React from "react";
import {Navbar} from "@/app/components/nav";

const navItems = {
  "/reviews/game": {
    name: "game",
  },
  "/reviews/anime": {
    name: "anime",
  },
  "/reviews/movie": {
    name: "movie",
  },
};

export default function ReviewsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Include shared UI here e.g. a header or sidebar */}
      <Navbar navItems={navItems} />
      {children}
    </>
  );
}
