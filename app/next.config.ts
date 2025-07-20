import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    styledComponents: true   // enables the SWC transform + SSR
  }
};

export default nextConfig;
