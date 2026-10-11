import Link from "next/link";
import { linkInstagram, linkWhatsApp, site } from "@/config/site";
import { Emblema } from "./Emblema";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={`${styles.footer} tema-escuro`}>
      <div className={`container ${styles.grade}`}>
        <div className={styles.marca}>
          <Emblema tamanho={56} espessura={4} />
          <div>
            <p className={styles.nome}>Atartear</p>
            <p className={styles.sub}>Macramé · Velas</p>
          </div>
        </div>

        <nav aria-label="Rodapé" className={styles.coluna}>
          <p className="rotulo">Navegar</p>
          <Link href="/macrame/">Macramé</Link>
          <Link href="/velas/">Velas</Link>
          <Link href="/sobre/">Sobre</Link>
          <Link href="/contato/">Contato</Link>
        </nav>

        <div className={styles.coluna}>
          <p className="rotulo">Contato</p>
          <a href={linkWhatsApp("Olá! Vim pelo site da Atartear.")} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <a href={linkInstagram()} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
      </div>
      <div className={`container ${styles.base}`}>
        <p>© {new Date().getFullYear()} Atartear. Feito à mão.</p>
      </div>
    </footer>
  );
}
