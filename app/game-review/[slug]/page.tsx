import { ReviewCard } from "@/app/components/review/reviewCard";
import GitHubApi from "@/utils/githubApi";
import {parseReviewBody} from "@/utils/utils";
import CommentSection from "@/app/components/comment/giscus";

export default async function Blog({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const slug = params.slug;
  const gitHubApiInstance = await GitHubApi.getInstance();
  const reviewItem = await gitHubApiInstance.fetchIssueBySlug(slug);
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
