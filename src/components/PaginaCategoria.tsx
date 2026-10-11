import { listarPecas } from "@/lib/catalog";
import { nomesCategoria, type Categoria } from "@/lib/types";
import { Catalogo } from "./Catalogo";
import { Footer } from "./Footer";
import { Header } from "./Header";
import styles from "./PaginaCategoria.module.css";

const textos: Record<Categoria, string> = {
  macrame: "Peças tramadas à mão, nó por nó, para casas que gostam de luz natural.",
  velas: "Velas feitas à mão para os fins de tarde e as noites longas, incluindo velas esculturais moldadas a partir de peças em argila.",
};

// Macramé vive no lado claro da marca; velas, no lado escuro.
export async function PaginaCategoria({ categoria }: { categoria: Categoria }) {
  const tema = categoria === "macrame" ? "claro" : "escuro";
  const pecas = await listarPecas(categoria);

  return (
    <div className={`tema-${tema} ${styles.pagina}`}>
      <Header variante={tema} />
      <main>
        <section className={`container ${styles.topo}`}>
          <p className="rotulo">Coleção</p>
          <h1 className="titulo">{nomesCategoria[categoria]}</h1>
          <p className="lead">{textos[categoria]}</p>
        </section>
        <section className="container" aria-label={`Peças de ${nomesCategoria[categoria].toLowerCase()}`}>
          <Catalogo pecas={pecas} />
        </section>
      </main>
      <div className={styles.respiro} />
      <Footer />
    </div>
  );
}
