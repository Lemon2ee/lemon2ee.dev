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
  /**
   * Detects if the code block contains a pre tag and would replace the class with shiki to ensure code highlight
   * would function normally
   */
  // Regular expression to find the pre tag and its content
  const preTagRegex = /<pre[^>]*>((.|\n|\r\n)*)<\/pre>/;

  // Match the pre tag and its content
  const match = htmlString.match(preTagRegex);

  if (match && match[1]) {
    // Modify the code tag within the matched content
    return match[1].replace(/<code([^>]*)>/, (match, group1) => {
      if (group1.includes("class=")) {
        // If class attribute exists, append "shiki" to it
        return match.replace(/class="([^"]*)"/, 'class="$1 shiki"');
      } else {
        // If class attribute doesn't exist, add class="shiki"
        return '<code class="shiki break-all"' + group1 + ">";
      }
    });
  }

  return htmlString;
}
