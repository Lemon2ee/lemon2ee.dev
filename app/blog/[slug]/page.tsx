import dynamic from "next/dynamic";
import { MDXContent } from "mdx/types";

export default async function Blog({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const blogPostName = params.slug;
  // const Blog = dynamic(() => import("@/posts/" + blogPostName + ".mdx"), {
  //   ssr: true,
  // });

  const Blog = await fetch("/posts/" + blogPostName + ".mdx").then((res) =>
    res.text(),
  );

  const MDX = Blog as unknown as MDXContent;

  return (
    <article className={"prose pt-4 prose-custom dark:prose-invert"}>
      <MDX />
    </article>
  );
}
