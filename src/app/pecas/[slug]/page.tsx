import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PecaImagem } from "@/components/PecaImagem";
import { linkWhatsApp, site } from "@/config/site";
import { buscarPeca, formatarPreco, listarPecas } from "@/lib/catalog";
import { nomesCategoria } from "@/lib/types";
import styles from "./peca.module.css";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const pecas = await listarPecas();
  return pecas.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const peca = await buscarPeca((await params).slug);
  if (!peca) return {};
  return { title: peca.nome, description: peca.resumo };
}

export default async function PaginaPeca({ params }: Params) {
  const peca = await buscarPeca((await params).slug);
  if (!peca) notFound();

  const tema = peca.categoria === "macrame" ? "claro" : "escuro";
  const disponivel = peca.estoque > 0;
  const mensagem = `Olá! Tenho interesse na peça "${peca.nome}" que vi no site da Atartear: ${site.url}/pecas/${peca.slug}/`;

  return (
    <div className={`tema-${tema}`}>
      <Header variante={tema} />
      <main className={`container ${styles.peca}`}>
        <nav aria-label="Caminho" className={styles.caminho}>
          <Link href={`/${peca.categoria}/`}>{nomesCategoria[peca.categoria]}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{peca.nome}</span>
        </nav>

        <div className={styles.grade}>
          <div className={styles.galeria}>
            <PecaImagem peca={peca} prioridade />
          </div>

          <div className={styles.info}>
            <p className="rotulo">{nomesCategoria[peca.categoria]}</p>
            <h1 className={styles.nome}>{peca.nome}</h1>
            <p className={styles.preco}>{formatarPreco(peca.precoCentavos)}</p>
            <p className={styles.descricao}>{peca.descricao}</p>

            <div className={styles.acoes}>
              {disponivel ? (
                <a className="botao" href={linkWhatsApp(mensagem)} target="_blank" rel="noopener noreferrer">
                  Pedir pelo WhatsApp
                </a>
              ) : (
                <a className="botao" href={linkWhatsApp(`Olá! A peça "${peca.nome}" vai ter nova unidade?`)} target="_blank" rel="noopener noreferrer">
                  Esgotada · Avise-me
                </a>
              )}
              <span className="botao botao-contorno" aria-disabled="true">
                Compra online em breve
              </span>
            </div>

            <dl className={styles.detalhes}>
              {peca.medidas && (
                <div>
                  <dt>Medidas</dt>
                  <dd>{peca.medidas}</dd>
                </div>
              )}
              {peca.materiais && (
                <div>
                  <dt>Materiais</dt>
                  <dd>{peca.materiais}</dd>
                </div>
              )}
              <div>
                <dt>Disponibilidade</dt>
                <dd>{disponivel ? (peca.estoque === 1 ? "Peça única" : `${peca.estoque} unidades`) : "Esgotada"}</dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
