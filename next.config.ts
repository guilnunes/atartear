import type { NextConfig } from "next";

// No GitHub Pages o site fica em https://guilnunes.github.io/atartear/,
// então o build de produção usa o prefixo /atartear. Quando houver domínio
// próprio, basta definir NEXT_PUBLIC_BASE_PATH="" no workflow de deploy.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
