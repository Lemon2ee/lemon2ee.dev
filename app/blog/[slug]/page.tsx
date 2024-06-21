import {MetaData} from "@/types/blog";
import {fetchAllMetaData} from "@/lib/blogPostApi";
import {MDXRemote} from "next-mdx-remote-client/rsc";
import type {MDXRemoteOptions, MDXComponents} from "next-mdx-remote-client/rsc";
import {Heading} from "@/app/components/mdx/Heading";
import Paragraph from "@/app/components/mdx/Paragraph";
import {Code} from "@/app/components/mdx/Code";
import {CustomOrderedList, CustomUnorderedList} from "@/app/components/mdx/List";
import {RoundedImage} from "@/app/components/mdx/Image";


export async function generateStaticParams() {
    const blogPostsMeta: MetaData[] = fetchAllMetaData();
    return blogPostsMeta.map((post) => ({slug: post.slug}));
}

const components: MDXComponents = {
    h1: Heading.H1,
    h2: Heading.H2,
    h3: Heading.H3,
    h4: Heading.H4,
    h5: Heading.H5,
    h6: Heading.H6,
    p: Paragraph,
    code: Code,
    ul: CustomUnorderedList,
    ol: CustomOrderedList,
    Image: RoundedImage,
}

const fetchIssue = async (issueNum: String) => {
    const url = `https://api.github.com/repos/${process.env.GITHUB_USER || ""}/${process.env.GITHUB_REPO || ""}/issues/${issueNum}`;
    const header_body = {
        'Accept': 'application/vnd.github.raw+json',
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28'
    }
    const response = await fetch(url, {
        method: 'GET',
        cache: 'no-store',
        headers: header_body
    },);

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
};

export default async function Blog({
                                       params,
                                   }: {
    params: {
        slug: string;
    };
}) {
    const blogIssueNum = params.slug;
    // const Blog = dynamic(() => import("@/_posts/" + blogPostName + ".mdx"));
    const res = await fetchIssue(blogIssueNum)
    const options: MDXRemoteOptions = {
        mdxOptions: {
            // ...
        },
        parseFrontmatter: true,
    };

    const title = `# ${res.title}`
    const markdown = res.body
    const combined = `${title}\n${markdown}`;
    return (
        <article className={"prose pt-4 prose-custom dark:prose-invert"}>
            <MDXRemote
                source={combined}
                options={options}
                components={components}
            />
        </article>
    )

    // return (
    //   <article className={"prose pt-4 prose-custom dark:prose-invert"}>
    //     <Blog />
    //   </article>
    // );
}
