# Atartear

Site da Atartear: macramé e velas artesanais, feitos à mão.

Publicado em: https://guilnunes.github.io/atartear/

## Como rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # gera o site estático em out/
```

## Estrutura

| Caminho | O que tem |
| --- | --- |
| src/app/ | Páginas: início, macramé, velas, peças, sobre, contato |
| src/components/ | Header, hero, catálogo, rodapé, emblema |
| src/data/pecas.json | Catálogo de peças (etapa 1) |
| src/lib/catalog.ts | Única porta de acesso ao catálogo; na etapa 2 passa a ler da API |
| src/config/site.ts | Contatos e endereço do site |
| public/img/ | Fotos |
| db/schema.sql | Banco MySQL da etapa 2 (admin e loja) |
| docs/ROADMAP.md | Próximas etapas |

## Como cadastrar uma peça (etapa 1)

1. Coloque a foto em `public/img/` (proporção 3:4, por exemplo 900x1200).
2. Adicione um item em `src/data/pecas.json` com `slug` único, `categoria` (`macrame` ou `velas`), preço em centavos (`null` = sob consulta) e estoque.
3. Faça commit na `main`: o GitHub Actions publica sozinho.

## Identidade visual

| Nome | Hex | Uso |
| --- | --- | --- |
| Linho | #F2EEE6 | Fundo do lado claro |
| Fio | #2B2620 | Texto e logo no lado claro |
| Noite | #0E1013 | Fundo do lado escuro |
| Cera | #F6E7CC | Texto no lado escuro |
| Creme do logo | #F7EECD | Logo sobre o lado escuro |
| Chama | #E3A456 | Único acento, links no lado escuro |

Fontes: Cormorant Garamond (nome e títulos) e Jost (textos).
