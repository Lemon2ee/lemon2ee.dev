import dynamic from "next/dynamic";
import { MDXProps } from "mdx/types";
import React from "react";

export default async function Blog({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const blogPostName = params.slug;
  const Blog: React.ComponentType<MDXProps> = dynamic(
    () => import("@/posts/" + blogPostName + ".mdx"),
    {
      ssr: true,
    },
  );

  return (
    <article className={"prose pt-4 prose-custom dark:prose-invert"}>
      <Blog />
    </article>
  );
}
