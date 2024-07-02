import {ReviewCard} from '@/app/components/review/reviewCard';
import GitHubApi, {IssueItem} from "@/utils/githubApi";

function parseReviewBody(body: string) {
    const lines = body.split('\n');
    const rating = parseFloat(lines[0].split('=')[1]);
    const bar_bg_color = lines[1].split('=')[1];
    const bar_color = lines[2].split('=')[1];
    const imageUrl = lines[3].match(/\(([^)]+)\)/)?.[1] || '';
    const content = lines.slice(5).join('\n').trim().replace(/\n/g, '<br>');
    return { rating, bar_bg_color, bar_color, imageUrl, content };
}


export default async function ReviewPage() {
    const gitHubApiInstance = await GitHubApi.getInstance();
    const gameReviews = gitHubApiInstance.getGithubIssuesByCat("game-review");

    return (
        <div>
            {gameReviews.map((review: IssueItem) => {
                const { rating, bar_bg_color, bar_color, imageUrl, content } = parseReviewBody(review.body);
                return (
                    <ReviewCard
                        key={review.id}
                        title={review.title}
                        content={content}
                        imageUrl={imageUrl}
                        rating={rating}
                        bar_bg_color={bar_bg_color}
                        bar_color={bar_color}
                    />
                );
            })}
        </div>
    );
}