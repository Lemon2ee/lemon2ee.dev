export function CustomUnorderedList({ children }: any) {
  return <ul className="list-inside list-disc overflow-hidden">{children}</ul>;
}

export function CustomOrderedList({ children }: any) {
  return <ol className="list-outside list-decimal overflow-hidden">{children}</ol>;
}

export function CustomLI({ children }: any) {
  return <li className={"text-ellipsis"}>{children}</li>;
}
