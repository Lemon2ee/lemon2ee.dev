import { codeToHtml } from 'shiki'


export async function highlight(code: string, lang: string) {
  return codeToHtml(code, {
    lang: lang,
    themes: {
      light: "solarized-light",
      dark: "dracula",
    },
  });
}
