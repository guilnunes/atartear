import Link from "next/link";
import { asset } from "@/lib/asset";
import { Emblema } from "./Emblema";
import styles from "./Hero.module.css";

function Seta() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className={styles.hero} aria-label="Atartear: macramé e velas">
      <div className={`${styles.metade} ${styles.clara} tema-claro`}>
        <div className={`${styles.fundo} ${styles.fundoMacrame}`} style={{ backgroundImage: `url(${asset("/img/fundo-macrame.jpg")})` }} aria-hidden="true" />
        <div className={`${styles.veu} ${styles.veuClaro}`} aria-hidden="true" />
        <div className={styles.conteudo}>
          <p className="rotulo">Coleção · Macramé</p>
          <p className={styles.frase}>Peças tramadas à mão, nó por nó, para casas que gostam de luz natural.</p>
          <Link href="/macrame/" className="link-seta">
            Conhecer o macramé <Seta />
          </Link>
        </div>
      </div>

      <div className={`${styles.metade} ${styles.escura} tema-escuro`}>
        <div className={`${styles.fundo} ${styles.fundoVelas}`} style={{ backgroundImage: `url(${asset("/img/fundo-velas.jpg")})` }} aria-hidden="true" />
        <div className={`${styles.veu} ${styles.veuEscuro}`} aria-hidden="true" />
        <div className={styles.conteudo}>
          <p className="rotulo">Coleção · Velas</p>
          <p className={styles.frase}>Velas feitas à mão para os fins de tarde e as noites longas.</p>
          <Link href="/velas/" className="link-seta">
            Conhecer as velas <Seta />
          </Link>
        </div>
      </div>

      <div className={styles.vinheta} aria-hidden="true" />

      <div className={styles.logo}>
        <div className={styles.emblema}>
          <Emblema tamanho={168} className={styles.emblemaClaro} />
          <Emblema tamanho={168} className={styles.emblemaEscuro} titulo="Emblema Atartear" />
        </div>
        <div className={styles.nome}>
          <h1 className={styles.nomeClaro}>Atartear</h1>
          <p className={styles.nomeEscuro} aria-hidden="true">
            Atartear
          </p>
        </div>
        <div className={styles.assinatura}>
          <span className={styles.assinaturaClara}>Macramé</span>
          <span className={styles.assinaturaEscura}>Velas</span>
        </div>
      </div>
    </section>
  );
}
