/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Let the CDN / Netlify compress responses. Turning this off avoids
   * net::ERR_CONTENT_DECODING_FAILED when gzip/brotli is applied twice (origin +
   * edge) and the browser cannot decode the body.
   */
  compress: false,
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
