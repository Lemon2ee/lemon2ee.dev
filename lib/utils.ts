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