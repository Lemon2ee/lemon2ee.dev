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
import gitHubApiInstance, {BlogItem} from "@/utils/githubApi";
import CommentSection from "@/app/blog/[slug]/comments";
import { Metadata, ResolvingMetadata } from 'next'

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
};

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
  // read route params
  const slug = params.slug
  const blogContent = await gitHubApiInstance.fetchIssueBySlug(slug);

  return {
    title: blogContent.title,
  }
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

  const slug = params.slug
  const blogContent = await gitHubApiInstance.fetchIssueBySlug(slug);

  const title = `# ${blogContent.title}`;
  const markdown = blogContent.body;
  const combined = `${title}\n${markdown}`;
  return (
      <>
        <article className={"prose pt-4 max-w-full prose-custom dark:prose-invert"}>
          <MDXRemote source={combined} options={options} components={components}/>
        </article>
        <CommentSection/>
      </>
  );
}
