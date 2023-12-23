import dynamic from "next/dynamic";
import { MDXProps } from "mdx/types";
import React from "react";

export default function Blog({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const blogPostName = params.slug;
  let Blog: React.ComponentType<MDXProps>;
  try {
    Blog = dynamic(() => import("@/posts/" + blogPostName + ".mdx"), {
      ssr: false,
    });
  } catch (e) {
    return null;
  }

  return (
    <article className={"prose pt-4 prose-custom dark:prose-invert"}>
      <Blog />
    </article>
  );
}
