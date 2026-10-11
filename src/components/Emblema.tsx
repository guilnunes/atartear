// Emblema da Atartear: quatro círculos entrelaçados, redesenhados em vetor
// a partir do logo original. A cor vem de `currentColor`.

interface Props {
  tamanho?: number;
  espessura?: number;
  className?: string;
  titulo?: string;
}

export function Emblema({ tamanho = 48, espessura = 3, className, titulo }: Props) {
  return (
    <svg
      width={tamanho}
      height={tamanho}
      viewBox="-4 -4 268 268"
      className={className}
      role={titulo ? "img" : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
    >
      <g fill="none" stroke="currentColor" strokeWidth={espessura}>
        <circle cx="130" cy="80" r="80" />
        <circle cx="80" cy="130" r="80" />
        <circle cx="180" cy="130" r="80" />
        <circle cx="130" cy="180" r="80" />
      </g>
    </svg>
  );
}
