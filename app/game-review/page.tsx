import GitHubApi, { IssueItem } from "@/utils/githubApi";
import {parseReviewBody} from "@/utils/utils";
import Image from "next/image";
import Link from 'next/link'

export default async function ReviewPage() {
  const gitHubApiInstance = await GitHubApi.getInstance();
  const gameReviews = gitHubApiInstance.getGithubIssuesByCat("game-review");

  return (
    <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
      {gameReviews.map((review: IssueItem) => {
        const parsedReview = parseReviewBody(review.body);
        const headerImgUrl = parsedReview.headerImgUrl;
        return (
          <Link href={`/game-review/${review.slug}`} key={review.slug}>
            <Image
                height={215}
                width={460}
                src={headerImgUrl}
                alt={review.title}
                style={{objectFit:"cover"}}
            />
          </Link>
        );
      })}
    </div>
  );
}
