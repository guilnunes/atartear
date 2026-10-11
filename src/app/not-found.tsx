import Link from "next/link";
import { Emblema } from "@/components/Emblema";
import { Header } from "@/components/Header";

export default function NaoEncontrado() {
  return (
    <div className="tema-escuro" style={{ minHeight: "100vh" }}>
      <Header variante="escuro" />
      <main
        className="container"
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, padding: "120px 16px", textAlign: "center" }}
      >
        <Emblema tamanho={72} espessura={4} />
        <h1 className="titulo">Página não encontrada</h1>
        <p className="lead">Esta peça ou página não existe mais, ou o endereço mudou.</p>
        <Link href="/" className="link-seta">
          Voltar ao início
        </Link>
      </main>
    </div>
  );
}
