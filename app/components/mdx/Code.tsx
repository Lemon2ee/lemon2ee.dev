import hljs from "highlight.js";
// Find a better way of pre-process this on the server side
import "highlight.js/styles/atom-one-dark.css";

export function Code({ children }: any) {
  const highlightedCode = hljs.highlightAuto(children).value;
  return <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />;
}
