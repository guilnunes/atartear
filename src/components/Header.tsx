"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Emblema } from "./Emblema";
import styles from "./Header.module.css";

export type VarianteHeader = "dividido" | "claro" | "escuro";

const links = [
  { href: "/macrame/", rotulo: "Macramé" },
  { href: "/velas/", rotulo: "Velas" },
  { href: "/sobre/", rotulo: "Sobre" },
  { href: "/contato/", rotulo: "Contato" },
];

export function Header({ variante }: { variante: VarianteHeader }) {
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    if (!aberto) return;
    const fechar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", fechar);
    return () => window.removeEventListener("keydown", fechar);
  }, [aberto]);

  const botaoMenu = (
    <button
      type="button"
      className={styles.botaoMenu}
      aria-label="Abrir menu"
      aria-expanded={aberto}
      aria-controls="menu-movel"
      onClick={() => setAberto(true)}
    >
      <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 8h16M4 16h16" />
      </svg>
    </button>
  );

  return (
    <>
      {variante === "dividido" ? (
        <header className={`${styles.header} ${styles.dividido}`}>
          <nav aria-label="Principal" className={styles.navDividida}>
            <div className={styles.metadeClara}>
              <Link href="/macrame/">Macramé</Link>
              <Link href="/sobre/">Sobre</Link>
            </div>
            <div className={styles.metadeEscura}>
              <Link href="/velas/">Velas</Link>
              <Link href="/contato/">Contato</Link>
            </div>
          </nav>
          <div className={styles.soMovel}>{botaoMenu}</div>
        </header>
      ) : (
        <header className={`${styles.header} ${styles.barra} tema-${variante}`}>
          <div className={`container ${styles.barraInterna}`}>
            <Link href="/" className={styles.marca} aria-label="Atartear, página inicial">
              <Emblema tamanho={32} espessura={5} />
              <span>Atartear</span>
            </Link>
            <nav aria-label="Principal" className={styles.navBarra}>
              {links.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.rotulo}
                </Link>
              ))}
            </nav>
            <div className={styles.soMovel}>{botaoMenu}</div>
          </div>
        </header>
      )}

      {aberto && (
        <div id="menu-movel" className={`${styles.menuMovel} tema-escuro`} role="dialog" aria-modal="true" aria-label="Menu">
          <button type="button" className={styles.fechar} aria-label="Fechar menu" onClick={() => setAberto(false)}>
            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <nav aria-label="Menu móvel" className={styles.navMovel}>
            <Link href="/" onClick={() => setAberto(false)}>
              Início
            </Link>
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setAberto(false)}>
                {l.rotulo}
              </Link>
            ))}
          </nav>
          <Emblema tamanho={56} espessura={4} className={styles.emblemaMenu} />
        </div>
      )}
    </>
  );
}
