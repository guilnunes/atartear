# Roadmap

## Etapa 1: site público (atual)

- Next.js com exportação estática, publicado no GitHub Pages.
- Páginas: início (hero dividido), macramé, velas, página de cada peça, sobre, contato.
- Catálogo lido de `src/data/pecas.json` durante o build.
- Pedidos pelo WhatsApp, com mensagem já preenchida com o nome e o link da peça.

Pendências de conteúdo (procure por colchetes `[...]` no código):

- Contatos reais em `src/config/site.ts` (WhatsApp, Instagram, e-mail, cidade).
- Peças reais em `src/data/pecas.json`, com fotos em `public/img/`. Apagar as peças marcadas com `"exemplo": true`.
- Textos da página Sobre.

## Etapa 2: admin, banco e loja

Arquitetura pensada para a hospedagem compartilhada da HostGator (PHP + MySQL):

```
GitHub Pages (ou HostGator)      HostGator
┌──────────────────────┐        ┌───────────────────────────┐
│ site Next.js estático │──────▶│ api/ (PHP)                 │
│ + /admin (estático)   │  JSON │  ├─ pecas, imagens         │
└──────────────────────┘        │  ├─ pedidos                │
                                │  ├─ login do admin          │
                                │  └─ Mercado Pago + webhook  │
                                │ MySQL (db/schema.sql)       │
                                └───────────────────────────┘
```

Passos:

1. Criar o banco MySQL no cPanel e rodar `db/schema.sql`.
2. Escrever a API em PHP (pasta `api/` deste repositório, publicada na HostGator por FTP ou deploy do cPanel):
   - `GET /pecas`, `GET /pecas/{slug}` públicos.
   - `POST/PUT/DELETE /pecas`, upload de imagens: só com login de admin (sessão ou token).
   - `POST /checkout`: cria a preferência no Mercado Pago e devolve o link de pagamento.
   - `POST /webhook/mercadopago`: confirma o pagamento e atualiza pedido e estoque.
3. Trocar a implementação de `src/lib/catalog.ts` para buscar da API.
   - Opção A: buscar no build e disparar um novo deploy quando o admin salvar (site continua 100% estático e rápido).
   - Opção B: buscar no navegador (estoque sempre atualizado, sem novo deploy).
4. Criar `/admin` no próprio Next.js: login, lista de peças, formulário com upload de fotos, lista de pedidos.
5. Carrinho e checkout: carrinho no navegador, checkout pelo Mercado Pago Checkout Pro com Pix e cartão. Vendas só no Brasil (frete nacional).

Decisões em aberto: frete (tabela fixa, Melhor Envio ou Correios), domínio próprio, e se o site sai do GitHub Pages para a HostGator.

## Segredos

Nenhuma chave vai para este repositório (ele é público). O Access Token do Mercado Pago e as credenciais do MySQL ficam só no servidor da HostGator, num arquivo fora da pasta pública.
