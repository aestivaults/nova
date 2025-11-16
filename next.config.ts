import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  experimental: {
    webpackBuildWorker: true,
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "source.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "flagcdn.com", pathname: "/**" },
      { protocol: "https", hostname: "usapi.hottask.com", pathname: "/**" },
      { protocol: "https", hostname: "api.dicebear.com", pathname: "/**" },
      { protocol: "https", hostname: "randomuser.me", pathname: "/**" },
      {
        protocol: "https",
        hostname: "dletkeefpyeofynyhuys.supabase.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "qpootvejwyvxnhdapckl.supabase.co",
        pathname: "/**",
      },
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
