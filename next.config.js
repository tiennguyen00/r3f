/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [{ source: "/test", destination: "https://myapi/forTest" }]
  },
}

module.exports = nextConfig
