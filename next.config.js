const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  experimental: {
    serverComponentsExternalPackages: ["shiki", "vscode-oniguruma"],
  },
  images: {
    domains: ["raw.githubusercontent.com", "flowbite.s3.amazonaws.com", "github.com"],
  },
  // Optionally, add any other Next.js config below
};

module.exports = withMDX(nextConfig);
