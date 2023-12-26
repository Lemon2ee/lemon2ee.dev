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
