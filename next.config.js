const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  experimental: {
    serverComponentsExternalPackages: ["shiki", "vscode-oniguruma"],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'flowbite.s3.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'shared.cloudflare.steamstatic.com',
        pathname: '/**',
      },
    ],
  },
  // Optionally, add any other Next.js config below
};

module.exports = withMDX(nextConfig);
