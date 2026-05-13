/** @type {import('next').NextConfig} */
// Static export config — produces a fully-static site in `out/` on `next build`.
// `NEXT_PUBLIC_BASE_PATH` is set in CI to the repo name (e.g. `/sizzle`) so the
// app works under `https://<user>.github.io/<repo>/`. Locally it's empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    // Required for static export — Next.js's image optimizer doesn't ship.
    // Unsplash already serves resized variants via query params; we pass those
    // through unchanged.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
