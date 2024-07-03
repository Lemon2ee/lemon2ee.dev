export function isSingleLine(str: string): boolean {
  return !/\r\n|\n/.test(str);
}

export const humanReadableDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  });
};

export function parseReviewBody(body: string) {
  const lines = body.split("\n");
  const rating = parseFloat(lines[0].split("=")[1]);
  const bar_bg_color = lines[1].split("=")[1];
  const bar_color = lines[2].split("=")[1];
  const headerImgUrl = lines[3].match(/\(([^)]+)\)/)?.[1] || "";
  const imageUrl = lines[4].match(/\(([^)]+)\)/)?.[1] || "";
  const content = lines.slice(6).join("\n").trim().replace(/\n/g, "<br>");
  return { rating, bar_bg_color, bar_color, headerImgUrl, imageUrl, content };
}
