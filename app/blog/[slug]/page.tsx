import dynamic from "next/dynamic";

export function generateStaticParams() {
  return [{ slug: "test" }, { slug: "first-blog" }];
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
