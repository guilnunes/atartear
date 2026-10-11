import Link from "next/link";
import { formatarPreco } from "@/lib/catalog";
import type { Peca } from "@/lib/types";
import { PecaImagem } from "./PecaImagem";
import styles from "./Catalogo.module.css";

export function Catalogo({ pecas }: { pecas: Peca[] }) {
  if (pecas.length === 0) {
    return <p className={styles.vazio}>Novas peças em breve.</p>;
  }
  return (
    <ul className={styles.grade}>
      {pecas.map((peca, i) => (
        <li key={peca.id}>
          <Link href={`/pecas/${peca.slug}/`} className={styles.card}>
            <div className={styles.foto}>
              <PecaImagem peca={peca} prioridade={i < 3} />
              {peca.estoque === 0 && <span className={styles.selo}>Esgotada</span>}
            </div>
            <div className={styles.info}>
              <h2 className={styles.nome}>{peca.nome}</h2>
              <p className={styles.preco}>{formatarPreco(peca.precoCentavos)}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
