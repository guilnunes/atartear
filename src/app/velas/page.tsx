import type { Metadata } from "next";
import { PaginaCategoria } from "@/components/PaginaCategoria";

export const metadata: Metadata = {
  title: "Velas",
  description: "Velas artesanais e esculturais feitas à mão pela Atartear.",
};

export default function Velas() {
  return <PaginaCategoria categoria="velas" />;
}
