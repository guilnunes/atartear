// Prefixa caminhos de arquivos em /public com o basePath do deploy.
// O next/link já faz isso sozinho; imagens e fundos em CSS não.
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
