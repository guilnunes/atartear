import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/jost/400.css";
import "@fontsource/jost/500.css";
import "./globals.css";
import { site } from "@/config/site";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: { default: "Atartear · Macramé e velas artesanais", template: "%s · Atartear" },
  description: site.descricao,
  icons: { icon: asset("/favicon.svg") },
  openGraph: {
    title: "Atartear",
    description: site.descricao,
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e1013",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
