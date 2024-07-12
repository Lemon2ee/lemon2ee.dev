import type {
  MDXComponents,
  MDXRemoteOptions,
} from "next-mdx-remote-client/rsc";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { Heading } from "@/app/components/mdx/Heading";
import Paragraph from "@/app/components/mdx/Paragraph";
import { Code } from "@/app/components/mdx/Code";
import {
  CustomOrderedList,
  CustomUnorderedList,
} from "@/app/components/mdx/List";
import { RoundedImage } from "@/app/components/mdx/Image";
import GitHubApi, { IssueItem } from "@/utils/githubApi";
import CommentSection from "@/app/components/comment/giscus";
import { Metadata } from "next";
import CustomQuote from "@/app/components/mdx/Quote";

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
  blockquote: CustomQuote,
};

type Props = {
  params: { slug: string };
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
    gitHubApiInstance.getGithubIssuesByCat("blog");
  const slugList: { slug: string }[] = blogsMetadata.map((blog) => ({
    slug: blog.slug,
  }));

  return slugList;
}

export default async function Blog({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const options: MDXRemoteOptions = {
    mdxOptions: {
      // ...
    },
    parseFrontmatter: true,
  };

  const slug = params.slug;
  const gitHubApiInstance = await GitHubApi.getInstance();
  const blogContent = await gitHubApiInstance.fetchIssueBySlug(slug);

  const title = `# ${blogContent.title}`;
  const markdown = blogContent.body;
  const combined = `${title}\n${markdown}`;
  return (
    <>
      <article
        className={"mt-14 prose max-w-full prose-custom dark:prose-invert"}
      >
        <MDXRemote
          source={combined}
          options={options}
          components={components}
        />
      </article>
      <CommentSection />
    </>
  );
}
