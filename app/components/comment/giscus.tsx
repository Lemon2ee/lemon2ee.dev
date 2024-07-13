"use client";

import Giscus from "@giscus/react";

export const isDarkModePreferred = () => {
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return false; // Default to false if window is undefined (e.g., during SSR)
};

export default function CommentSection() {
  const isDark = isDarkModePreferred();
  return (
    <Giscus
      id="comments"
      repo="Lemon2ee/lemon2ee.dev"
      repoId="R_kgDOK8PX4w"
      category="Announcements"
      categoryId="DIC_kwDOK8PX484Cgdqa"
      mapping="title"
      term="Welcome to @giscus/react component!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={isDark ? "dark" : "light"}
      lang="en"
    />
  );
}
