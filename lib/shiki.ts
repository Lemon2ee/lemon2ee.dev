// import type {Highlighter, Lang, Theme} from 'shiki'
// import {getHighlighter, renderToHtml} from 'shiki'
// import langDetect from "@/lib/langDetect";
//
//
// let highlighter: Highlighter
// export async function highlight(code: string, theme: Theme) {
//     const lang = await langDetect(code)
//     console.log(lang)
//     if (!highlighter) {
//         highlighter = await getHighlighter({
//             langs: [lang],
//             theme: theme
//         })
//     }
//
//     const tokens = highlighter.codeToThemedTokens(code, lang, theme, {
//         includeExplanation: false
//     })
//     return renderToHtml(tokens, {bg: 'transparent'})
// }

import type { Highlighter, Lang, Theme } from "shiki";
import { getHighlighter, renderToHtml } from "shiki";

let highlighter: Highlighter;

export async function highlight(code: string, theme: Theme, lang: Lang) {
  if (!highlighter) {
    highlighter = await getHighlighter({
      langs: [lang],
      theme: theme,
    });
  }

  const tokens = highlighter.codeToThemedTokens(code, lang, theme, {
    includeExplanation: false,
  });
  return renderToHtml(tokens, { bg: "transparent" });
}
