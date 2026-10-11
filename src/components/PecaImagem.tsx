import { asset } from "@/lib/asset";
import type { Peca } from "@/lib/types";
import { Emblema } from "./Emblema";
import styles from "./PecaImagem.module.css";

// Primeira foto da peça, ou um espaço reservado discreto quando ainda não há foto.
export function PecaImagem({ peca, prioridade = false }: { peca: Peca; prioridade?: boolean }) {
  const imagem = peca.imagens[0];
  if (imagem) {
    return (
      <img
        src={asset(imagem.src)}
        alt={imagem.alt}
        className={styles.imagem}
        loading={prioridade ? "eager" : "lazy"}
        width={900}
        height={1200}
      />
    );
  }
  return (
    <div className={styles.vazio} role="img" aria-label={`${peca.nome}: foto em breve`}>
      <Emblema tamanho={64} espessura={4} />
      <span>Foto em breve</span>
    </div>
  );
}
