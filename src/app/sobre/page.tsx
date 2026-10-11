import type { Metadata } from "next";
import Link from "next/link";
import { Emblema } from "@/components/Emblema";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { asset } from "@/lib/asset";
import styles from "./sobre.module.css";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Quem faz a Atartear: macramé e velas artesanais feitos à mão.",
};

export default function Sobre() {
  return (
    <div className="tema-claro">
      <Header variante="claro" />
      <main>
        <section className={`container ${styles.intro}`}>
          <p className="rotulo">Sobre</p>
          <h1 className="titulo">Luz e trama, feitas à mão</h1>
          <p className="lead">
            A Atartear reúne dois ofícios que conversam com a luz: o macramé, que vive dela, e a vela, que a cria. [Texto
            de apresentação do artista: quem é, onde trabalha, como começou.]
          </p>
        </section>

        <section className={styles.dupla} aria-label="Os dois ofícios">
          <article className={`tema-claro ${styles.lado}`}>
            <div className={styles.fundo} style={{ backgroundImage: `url(${asset("/img/fundo-macrame.jpg")})` }} aria-hidden="true" />
            <div className={styles.texto}>
              <p className="rotulo">O macramé</p>
              <h2 className={styles.subtitulo}>Nó por nó</h2>
              <p>[Como as peças de macramé são feitas: fios, técnica, tempo de produção.]</p>
              <Link href="/macrame/" className="link-seta">
                Ver peças de macramé
              </Link>
            </div>
          </article>
          <article className={`tema-escuro ${styles.lado}`}>
            <div className={`${styles.fundo} ${styles.fundoVelas}`} style={{ backgroundImage: `url(${asset("/img/fundo-velas.jpg")})` }} aria-hidden="true" />
            <div className={styles.texto}>
              <p className="rotulo">As velas</p>
              <h2 className={styles.subtitulo}>Da argila à cera</h2>
              <p>
                Algumas velas nascem como esculturas em argila, modeladas pelo próprio artista, que depois viram molde
                para a cera. [Complementar com o processo.]
              </p>
              <Link href="/velas/" className="link-seta">
                Ver velas
              </Link>
            </div>
          </article>
        </section>

        <section className={`container ${styles.fecho}`}>
          <Emblema tamanho={72} espessura={4} />
          <p>[Frase de fechamento ou citação do artista.]</p>
          <Link href="/contato/" className="botao">
            Fale com a Atartear
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
