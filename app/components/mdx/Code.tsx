import { highlight } from 'sugar-high'

// Find a better way of pre-process this on the server side
// import "./code.css";
import "./code.css";
// this part of the website uses a custom theme css, so we need to adapt the dark theme differently (i.e. directly
// in the css file)
// right now I think this is not a bad way of implementing this, because we can modify the theme easily
export function Code({ children, ...props }: any) {
  const highlightedCode = highlight(children);
  return (
    <code dangerouslySetInnerHTML={{ __html: highlightedCode }} {...props} />
  );
}
