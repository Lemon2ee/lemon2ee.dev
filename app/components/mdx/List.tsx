export function CustomUnorderedList({ children }: any) {
  return <ul className="list-inside list-disc">{children}</ul>;
}

export function CustomOrderedList({ children }: any) {
  return <ul className="list-outside list-decimal">{children}</ul>;
}

export function CustomLI({ children }: any) {
  return <li className={"text-ellipsis overflow-hidden"}>{children}</li>;
}
