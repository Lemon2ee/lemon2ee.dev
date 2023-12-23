import dynamic from "next/dynamic";

export default async function Blog({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const blogPostName = params.slug;
  const Blog = dynamic(() => import("../../posts/" + blogPostName + ".mdx"), {
    ssr: true,
  });

  return (
    <article className={"prose pt-4 prose-custom dark:prose-invert"}>
      <Blog />
    </article>
  );
}
