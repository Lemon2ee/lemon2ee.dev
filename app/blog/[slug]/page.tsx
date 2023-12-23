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
  const Blog = dynamic(() => import("@/posts/" + blogPostName + ".mdx"), {
    loading: () => <p>Loading...</p>,
  });
  console.log("finished loading");

  return (
    <article className={"prose pt-4 prose-custom dark:prose-invert"}>
      <Blog />
    </article>
  );
}
