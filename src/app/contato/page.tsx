import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { linkInstagram, linkWhatsApp, site } from "@/config/site";
import styles from "./contato.module.css";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a Atartear para encomendas, dúvidas e peças sob medida.",
};

const canais = [
  {
    rotulo: "WhatsApp",
    valor: "Conversar agora",
    detalhe: "Pedidos, encomendas e dúvidas sobre as peças.",
    href: linkWhatsApp("Olá! Vim pelo site da Atartear."),
    externo: true,
  },
  {
    rotulo: "Instagram",
    valor: site.instagram,
    detalhe: "Novas peças e bastidores do ateliê.",
    href: linkInstagram(),
    externo: true,
  },
  {
    rotulo: "E-mail",
    valor: site.email,
    detalhe: "Para parcerias e pedidos maiores.",
    href: `mailto:${site.email}`,
    externo: false,
  },
];

export default function Contato() {
  return (
    <div className="tema-escuro">
      <Header variante="escuro" />
      <main className={`container ${styles.contato}`}>
        <section className={styles.topo}>
          <p className="rotulo">Contato</p>
          <h1 className="titulo">Fale com a Atartear</h1>
          <p className="lead">Encomendas, peças sob medida ou só uma dúvida: escolha o canal que preferir.</p>
        </section>

        <ul className={styles.canais}>
          {canais.map((c) => (
            <li key={c.rotulo}>
              <a href={c.href} className={styles.canal} {...(c.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <span className="rotulo">{c.rotulo}</span>
                <span className={styles.valor}>{c.valor}</span>
                <span className={styles.detalhe}>{c.detalhe}</span>
              </a>
            </li>
          ))}
        </ul>

        <p className={styles.local}>{site.cidade}</p>
      </main>
      <Footer />
    </div>
  );
}
