"use client";

import Giscus from "@giscus/react";

export default function CommentSection() {
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
      theme="dark"
      lang="en"
      loading="lazy"
    />
  );
}
