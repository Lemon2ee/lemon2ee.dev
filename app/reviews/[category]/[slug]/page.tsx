import { ReviewCard } from "@/app/components/review/reviewCard";
import GitHubApi, { IssueItem } from "@/utils/githubApi";
import { filterReviewByContentType, parseReviewBody } from "@/utils/utils";
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

export async function generateStaticParams({
  params: { category },
}: {
  params: { category: string };
}) {
  const gitHubApiInstance = await GitHubApi.getInstance();
  const blogsMetadata: IssueItem[] =
    gitHubApiInstance.getGithubIssuesByCat("review");
  const filteredReviews = filterReviewByContentType(blogsMetadata, category);
  const slugList: { slug: string }[] = filteredReviews.map((blog) => ({
    slug: blog.slug,
  }));
  console.log({
    category: category,
    slugList: slugList
  })

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
