// import type { Highlighter, Lang, Theme } from "shiki";
// import { getHighlighter, renderToHtml } from "shiki";
//
// let highlighter: Highlighter;
//
// export async function highlight(code: string, theme: Theme, lang: Lang) {
//   if (!highlighter) {
//     highlighter = await getHighlighter({
//       langs: [lang],
//       theme: theme,
//     });
//   }
//
//   const tokens = highlighter.codeToThemedTokens(code, lang, theme, {
//     includeExplanation: false,
//   });
//
//   return renderToHtml(tokens, { bg: "transparent" });
// }

import type { Highlighter } from "shikiji";
import { bundledLanguages, getHighlighter } from "shikiji";

let highlighter: Highlighter;

export async function highlight(code: string, lang: string) {
  if (!highlighter) {
    highlighter = await getHighlighter({
      langs: Object.keys(bundledLanguages),
      themes: ["dracula", "solarized-light"],
    });
  }

  return highlighter.codeToHtml(code, {
    lang: lang,
    themes: {
      light: "solarized-light",
      dark: "dracula",
    },
  });
}
