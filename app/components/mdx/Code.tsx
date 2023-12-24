import {highlight} from "@/lib/shiki";
// this part of the website uses a custom theme css, so we need to adapt the dark theme differently (i.e. directly
// in the css file)
// right now I think this is not a bad way of implementing this, because we can modify the theme easily
export async function Code({children, ...props}: any) {
  const propsClassName = props['className'] || 'language-md'
  const language = propsClassName.split('language-')[1]
  const html = await highlight(
      children,
      'github-dark',
      language
  )
  return (
      <code dangerouslySetInnerHTML={{__html: html}} {...props} />
  );
}
