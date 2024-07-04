import { ReviewCard } from "@/app/components/review/reviewCard";
import GitHubApi, { IssueItem } from "@/utils/githubApi";
import { parseReviewBody } from "@/utils/utils";
import CommentSection from "@/app/components/comment/giscus";
import { Metadata } from "next";

type Props = {
  params: {
    category: string;
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = params.slug;
  const gitHubApiInstance = await GitHubApi.getInstance();
  const blogContent = await gitHubApiInstance.fetchIssueBySlug(slug);

  return {
    title: blogContent.title,
  };
}

export async function generateStaticParams() {
  const gitHubApiInstance = await GitHubApi.getInstance();
  const blogsMetadata: IssueItem[] =
    gitHubApiInstance.getGithubIssuesByCat("reviews");
  const slugList: { slug: string }[] = blogsMetadata.map((blog) => ({
    slug: blog.slug,
  }));

  return slugList;
}

export default async function ReviewPage({ params }: Props) {
  const gitHubApiInstance = await GitHubApi.getInstance();
  const reviewItem = await gitHubApiInstance.fetchIssueBySlug(params.slug);
  const { rating, bar_bg_color, bar_color, imageUrl, content } =
    parseReviewBody(reviewItem.body);
  return (
    <>
      <ReviewCard
        key={reviewItem.id}
        title={reviewItem.title}
        content={content}
        imageUrl={imageUrl}
        rating={rating}
        bar_bg_color={bar_bg_color}
        bar_color={bar_color}
      />
      <CommentSection />
    </>
  );
}
