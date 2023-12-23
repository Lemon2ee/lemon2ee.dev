export function CustomUnorderedList({ children }: any) {
  return (
    <ul className="list-outside list-disc marker:text-black dark:marker:text-amber-50 dark:text-amber-50">
      {children}
    </ul>
  );
}

export function CustomOrderedList({ children }: any) {
  return (
    <ul className="list-outside list-decimal marker:text-black dark:marker:text-amber-50 dark:text-amber-50">
      {children}
    </ul>
  );
}
