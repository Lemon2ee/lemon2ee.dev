import dynamic from "next/dynamic";

export default async function Blog({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const blogPostName = params.slug;
  console.log("about to import the blog component");
  const Blog = dynamic(
    () =>
      import("@/public/posts/" + blogPostName + ".mdx").then(
        (mod) => mod.default,
      ),
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
