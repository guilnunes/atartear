// Camada de acesso ao catálogo.
//
// Etapa 1 (agora): lê src/data/pecas.json no momento do build.
// Etapa 2: estas funções passam a buscar na API da HostGator
// (ver docs/ROADMAP.md). As páginas só falam com este arquivo,
// então a troca acontece aqui e em nenhum outro lugar.

import dados from "@/data/pecas.json";
import type { Categoria, Peca } from "./types";

const pecas = dados as Peca[];

export async function listarPecas(categoria?: Categoria): Promise<Peca[]> {
  const lista = categoria ? pecas.filter((p) => p.categoria === categoria) : pecas;
  // Destaques primeiro, depois disponíveis, depois esgotadas.
  return [...lista].sort(
    (a, b) =>
      Number(b.destaque) - Number(a.destaque) ||
      Number(b.estoque > 0) - Number(a.estoque > 0) ||
      a.id - b.id,
  );
}

export async function buscarPeca(slug: string): Promise<Peca | undefined> {
  return pecas.find((p) => p.slug === slug);
}

export function formatarPreco(centavos: number | null): string {
  if (centavos === null) return "Preço sob consulta";
  return (centavos / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
