import type { Metadata } from "next";
import { PaginaCategoria } from "@/components/PaginaCategoria";

export const metadata: Metadata = {
  title: "Macramé",
  description: "Peças de macramé tramadas à mão pela Atartear.",
};

export default function Macrame() {
  return <PaginaCategoria categoria="macrame" />;
}
