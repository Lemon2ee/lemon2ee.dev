import type { MDXComponents } from "next-mdx-remote-client/rsc";
import { Heading } from "@/app/components/mdx/Heading";
import Paragraph from "@/app/components/mdx/Paragraph";
import { Code } from "@/app/components/mdx/Code";
import {
  CustomLI,
  CustomOrderedList,
  CustomUnorderedList,
} from "@/app/components/mdx/List";
import { RoundedImage } from "@/app/components/mdx/Image";
import CustomQuote from "@/app/components/mdx/Quote";

export const components: MDXComponents = {
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
  img: RoundedImage,
  blockquote: CustomQuote,
  li: CustomLI,
};
