import Link from "next/link";
import { Catalogo } from "@/components/Catalogo";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { listarPecas } from "@/lib/catalog";
import styles from "./page.module.css";

export default async function Inicio() {
  const [macrame, velas] = await Promise.all([listarPecas("macrame"), listarPecas("velas")]);

  return (
    <>
      <Header variante="dividido" />
      <main>
        <Hero />

        <section className={`tema-claro ${styles.secao}`} aria-labelledby="destaques-macrame">
          <div className="container">
            <div className={styles.cabecalho}>
              <div>
                <p className="rotulo">Coleção</p>
                <h2 id="destaques-macrame" className={styles.titulo}>
                  Macramé
                </h2>
              </div>
              <Link href="/macrame/" className="link-seta">
                Ver todas
              </Link>
            </div>
            <Catalogo pecas={macrame.slice(0, 3)} />
          </div>
        </section>

        <section className={`tema-escuro ${styles.secao}`} aria-labelledby="destaques-velas">
          <div className="container">
            <div className={styles.cabecalho}>
              <div>
                <p className="rotulo">Coleção</p>
                <h2 id="destaques-velas" className={styles.titulo}>
                  Velas
                </h2>
              </div>
              <Link href="/velas/" className="link-seta">
                Ver todas
              </Link>
            </div>
            <Catalogo pecas={velas.slice(0, 3)} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
