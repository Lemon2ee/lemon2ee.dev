import type { MDXComponents } from "mdx/types";
import { Heading } from "@/app/components/mdx/Heading";
import Paragraph from "@/app/components/mdx/Paragraph";
import {
  CustomOrderedList,
  CustomUnorderedList,
} from "@/app/components/mdx/List";
import { Code } from "@/app/components/mdx/Code";
import { RoundedImage } from "@/app/components/mdx/Image";

// must not be exported with default
// will cause `Attempted import error: 'useMDXComponents' is not exported from 'next-mdx-import-source-file' (imported
// as '_provideComponents').`
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
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
    ...components,
  };
}
