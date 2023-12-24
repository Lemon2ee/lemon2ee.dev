import dynamic from "next/dynamic";
import { MetaData } from "@/types/blog";
import { fetchAllMetaData } from "@/lib/blogPostApi";

export async function generateStaticParams() {
  const blogPostsMeta: MetaData[] = fetchAllMetaData();
  return blogPostsMeta.map((post) => ({ slug: post.slug }));
}

export default async function Blog({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const blogPostName = params.slug;
  const Blog = dynamic(() => import("@/_posts/" + blogPostName + ".mdx"));
  return (
    <article className={"prose pt-4 prose-custom dark:prose-invert"}>
      <Blog />
    </article>
  );
}
