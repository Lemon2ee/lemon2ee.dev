import type { Highlighter } from "shikiji";
import { bundledLanguages, getHighlighter } from "shikiji";

let highlighter: Highlighter;

export async function highlight(code: string, lang: string) {
  if (!highlighter) {
    console.log("Initializing highlighter")
    highlighter = await getHighlighter({
      langs: Object.keys(bundledLanguages),
      themes: ["dracula", "solarized-light"],
    });
  }

  console.log("Starting to highlight code")
  return highlighter.codeToHtml(code, {
    lang: lang,
    themes: {
      light: "solarized-light",
      dark: "dracula",
    },
  });
}
