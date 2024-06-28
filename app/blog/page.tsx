import Link from "next/link";
import { humanReadableDate } from "@/lib/utils";
import gitHubApiInstance, { BlogItem } from "@/utils/githubApi";

export default async function Blog() {
  const blogsMetadata = await gitHubApiInstance.getAllGithubIssues();

  return (
    <div>
      {blogsMetadata.map((post: BlogItem) => (
        <Link key={post.title} href={`/blog/${post.slug}`}>
          <div className={"py-4"}>
            <h1 className={"text-base font-bold"}>{post.title}</h1>
            <p className={"text-gray-500 text-sm py-1"}>
              {humanReadableDate(post.updated_at)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
