import GitHubApi, { IssueItem } from "@/utils/githubApi";
import {filterReviewByContentType, parseReviewBody} from "@/utils/utils";
import Image from "next/image";
import Link from 'next/link'

type Props = {
    params: {
        category: string,
    };
};


export default async function ReviewPage({ params }: Props) {
    const gitHubApiInstance = await GitHubApi.getInstance();
    const reviews = gitHubApiInstance.getGithubIssuesByCat("review");
    const filteredReviews = filterReviewByContentType(reviews, params.category);

    return (
        <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
            {filteredReviews.map((review: IssueItem) => {
                const parsedReview = parseReviewBody(review.body);
                const headerImgUrl = parsedReview.headerImgUrl;
                return (
                    <Link href={`/reviews/${params.category}/${review.slug}`} key={review.slug}>
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
