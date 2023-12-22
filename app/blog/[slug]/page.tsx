import dynamic from "next/dynamic";

export default async function Blog({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const blogPostName = params.slug;
  const MyComponent = dynamic(
    () => import("@/_posts/" + blogPostName + ".mdx"),
  );
  return (
    <div className={"prose"}>
      <MyComponent />
    </div>
  );
}
