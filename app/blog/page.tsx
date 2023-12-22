import Link from "next/link";
import { fetchAllMetaData } from "@/lib/blogPostApi";
import { MetaData } from "@/types/blog";

export default async function Blog() {
  const allBlogPosts: MetaData[] = await fetchAllMetaData();
  return (
    <div>
      {allBlogPosts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`}>
          <div className={"py-4"}>
            <h1 className={"text-base font-bold"}>{post.title}</h1>
            <p className={"text-gray-500 text-sm py-1"}>{post.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
