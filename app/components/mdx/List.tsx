export function CustomUnorderedList({ children }: any) {
  return <ul className="list-inside list-disc">{children}</ul>;
}

export function CustomOrderedList({ children }: any) {
  return <ul className="list-outside list-decimal">{children}</ul>;
}
