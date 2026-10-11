// Dados de contato e da marca. Os valores entre colchetes são placeholders:
// troque pelos dados reais antes de publicar.
export const site = {
  nome: "Atartear",
  descricao: "Macramé e velas artesanais, feitos à mão.",
  // Endereço público do site, usado nas mensagens de WhatsApp.
  url: "https://guilnunes.github.io/atartear",
  // Número no formato internacional, só dígitos: 55 + DDD + número.
  whatsapp: "5500000000000",
  instagram: "[instagram]",
  email: "[email@atartear.com.br]",
  cidade: "[Cidade, UF]",
} as const;

export function linkWhatsApp(mensagem: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

export function linkInstagram(): string {
  return `https://instagram.com/${site.instagram.replace(/^@/, "")}`;
}
