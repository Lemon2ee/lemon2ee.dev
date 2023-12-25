import React from "react";

export default function BlockContent({
  children,
  link,
}: {
  children: React.ReactNode;
  link?: string;
}) {
  return (
    <a
      key={link}
      href={link || "#"}
      className={
        "border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 " +
        "rounded flex items-center justify-between w-full no-underline hover:no-underline"
      }
    >
      {children}
    </a>
  );
}
