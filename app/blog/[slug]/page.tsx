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

  const Test: MDXContent = (await import("@/posts/" + blogPostName + ".mdx"))
    .default;

  return (
    <article className={"prose pt-4 prose-custom dark:prose-invert"}>
      <Test />
    </article>
  );
}
