import Link from "next/link";
import {humanReadableDate} from "@/lib/utils";

export interface BlogItem {
    url: string;
    id: string;
    title: string;
    tag: string;
    created_at: string;
    updated_at: string;
    number: string;
}

function filterDataItems(data: any[]): BlogItem[] {
    return data.map(item => {
        return {
            url: item.url,
            id: item.id,
            number: item.number,
            title: item.title,
            tag: item.tag || [],
            created_at: item.created_at,
            updated_at: item.updated_at
        };
    });
}

function sortBlogItemsByUpdatedAt(items: BlogItem[]): BlogItem[] {
    return items.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
}

const fetchPullRequests = async () => {
    const url = `https://api.github.com/repos/${process.env.GITHUB_USER || ""}/${process.env.GITHUB_REPO || ""}/issues`;
    const header_body = {
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28'
    }
    const response = await fetch(url, {
        method: 'GET',
        cache: 'no-store',
        headers: header_body
    }, );

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    const res_json = await response.json();
    return sortBlogItemsByUpdatedAt(filterDataItems(res_json));
};

export default async function Blog() {
    const blogsMetadata = await fetchPullRequests();

    return (
        <div>
            {blogsMetadata.map((post: BlogItem) => (
                <Link key={post.title} href={`/blog/${post.number}`}>
                    <div className={"py-4"}>
                        <h1 className={"text-base font-bold"}>{post.title}</h1>
                        <p className={"text-gray-500 text-sm py-1"}>{humanReadableDate(post.updated_at)}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
