// Modelo de dados das peças. Espelha a tabela `pecas` de db/schema.sql,
// para que a troca do JSON pela API da etapa 2 não mude as páginas.

export type Categoria = "macrame" | "velas";

export interface Imagem {
  src: string; // caminho em /public ou URL absoluta
  alt: string;
}

export interface Peca {
  id: number;
  slug: string;
  nome: string;
  categoria: Categoria;
  resumo: string;
  descricao: string;
  /** Preço em centavos. null = "sob consulta". */
  precoCentavos: number | null;
  /** Unidades em estoque. Peças únicas têm 1. */
  estoque: number;
  destaque: boolean;
  medidas: string | null;
  materiais: string | null;
  imagens: Imagem[];
  /** Marca peças fictícias usadas só para testar o layout. */
  exemplo?: boolean;
}

export const nomesCategoria: Record<Categoria, string> = {
  macrame: "Macramé",
  velas: "Velas",
};
