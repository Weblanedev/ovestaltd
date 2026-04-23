/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/partner", destination: "/sell", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.dummyjson.com", pathname: "/**" },
      { protocol: "https", hostname: "i.dummyjson.com", pathname: "/**" },
      { protocol: "https", hostname: "placehold.co", pathname: "/**" },
    ],
  },
};

export default nextConfig;
