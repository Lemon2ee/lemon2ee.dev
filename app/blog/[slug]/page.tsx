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
    () =>
      import("@/posts/" + blogPostName + ".mdx")
        .then((mod) => mod.default)
        .then((mod) => {
          console.log(mod);
          return mod;
        }),
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
