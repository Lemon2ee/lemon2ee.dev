export function isSingleLine(str: string): boolean {
  return !/\r\n|\n/.test(str);
}