import {ReviewCard} from '@/app/components/review/reviewCard';
import GitHubApi, {IssueItem} from "@/utils/githubApi";

function parseReviewBody(body: string) {
    const lines = body.split('\n');
    const rating = parseFloat(lines[0]);
    const imageUrl = lines[1].match(/\(([^)]+)\)/)?.[1] || '';
    const content = lines.slice(3).join('\n').trim().replace(/\n/g, '<br>');
    return { rating, imageUrl, content };
}

export default async function ReviewPage() {
    const gitHubApiInstance = await GitHubApi.getInstance();
    const gameReviews = gitHubApiInstance.getGithubIssuesByCat("game-review");

    return (
        <div>
            {gameReviews.map((review: IssueItem) => {
                const { rating, imageUrl, content } = parseReviewBody(review.body);
                return (
                    <ReviewCard
                        key={review.id}
                        title={review.title}
                        content={content}
                        imageUrl={imageUrl}
                        rating={rating}
                    />
                );
            })}
        </div>
    );
}