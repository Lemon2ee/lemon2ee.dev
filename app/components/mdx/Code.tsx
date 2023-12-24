import { highlight } from "@/lib/shiki";
import { isSingleLine } from "@/lib/utils";
import "./code.css";

export async function Code({ children, ...props }: any) {
  const propsClassName = props["className"] || "language-md";
  const language = propsClassName.split("language-")[1];
  let html = await highlight(children, language);
  if (isSingleLine(children)) {
    html = removePreTag(html);
  }

  // right now it would be pre->code->pre(shiki)->code(shiki), might be better to remove the pre tag
  return <code dangerouslySetInnerHTML={{ __html: html }} {...props} />;
}

function removePreTag(htmlString: string): string {
  // Regular expression to find the pre tag and its content
  const preTagRegex = /<pre[^>]*>((.|\n|\r\n)*)<\/pre>/;

  // Match the pre tag and its content
  const match = htmlString.match(preTagRegex);

  if (match && match[1]) {
    // Return only the content inside the pre tag
    return match[1];
  }

  return htmlString;
}
