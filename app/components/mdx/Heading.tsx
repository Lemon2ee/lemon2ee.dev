export const Heading = {
  H1: ({ children }: any) => (
    <h1 className={"text-2xl font-bold"}>{children}</h1>
  ),
  H2: ({ children }: any) => (
    <h2 className={"text-xl font-bold"}>{children}</h2>
  ),
  H3: ({ children }: any) => (
    <h2 className={"text-lg font-bold"}>{children}</h2>
  ),
  H4: ({ children }: any) => (
    <h2 className={"text-md font-bold"}>{children}</h2>
  ),
  H5: ({ children }: any) => (
    <h2 className={"text-sm font-bold"}>{children}</h2>
  ),
  H6: ({ children }: any) => (
    <h2 className={"text-xs font-bold"}>{children}</h2>
  ),
};
