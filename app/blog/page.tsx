import Link from "next/link";
import { humanReadableDate } from "@/utils/utils";
import { IssueItem } from "@/utils/githubApi";
import GitHubApi from "@/utils/githubApi";

export default async function Blog() {
  const gitHubApiInstance = await GitHubApi.getInstance();
  const blogsMetadata = gitHubApiInstance.getGithubIssuesByCat("blog");

  return (
    <div>
      {blogsMetadata.map((post: IssueItem) => (
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
