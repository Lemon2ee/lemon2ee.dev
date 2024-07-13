export const Heading = {
  H1: ({ children }: any) => (
    <h1 className={"text-2xl font-bold"}>{children}</h1>
  ),
  H2: ({ children }: any) => (
    <h2 className={"text-xl font-bold"}>{children}</h2>
  ),
  H3: ({ children }: any) => (
    <h3 className={"text-lg font-bold"}>{children}</h3>
  ),
  H4: ({ children }: any) => (
    <h4 className={"text-md font-bold"}>{children}</h4>
  ),
  H5: ({ children }: any) => (
    <h5 className={"text-sm font-bold"}>{children}</h5>
  ),
  H6: ({ children }: any) => (
    <h6 className={"text-xs font-bold"}>{children}</h6>
  ),
};
