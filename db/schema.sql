-- Atartear: esquema do banco MySQL (etapa 2, hospedagem HostGator).
-- Ainda não está em uso: na etapa 1 o catálogo vem de src/data/pecas.json.
-- Os campos de `pecas` espelham o tipo Peca em src/lib/types.ts.
-- Requer MySQL 5.7+ ou MariaDB 10.2+ (JSON e utf8mb4).

SET NAMES utf8mb4;

-- Peças à venda -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pecas (
  id             INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug           VARCHAR(120)  NOT NULL UNIQUE,
  nome           VARCHAR(160)  NOT NULL,
  categoria      ENUM('macrame', 'velas') NOT NULL,
  resumo         VARCHAR(280)  NOT NULL DEFAULT '',
  descricao      TEXT          NOT NULL,
  preco_centavos INT UNSIGNED  NULL,          -- NULL = preço sob consulta
  estoque        INT UNSIGNED  NOT NULL DEFAULT 1,
  destaque       TINYINT(1)    NOT NULL DEFAULT 0,
  publicado      TINYINT(1)    NOT NULL DEFAULT 0,  -- rascunho até publicar no admin
  medidas        VARCHAR(160)  NULL,
  materiais      VARCHAR(255)  NULL,
  peso_gramas    INT UNSIGNED  NULL,          -- para cálculo de frete
  criado_em      TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_pecas_categoria (categoria, publicado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS peca_imagens (
  id       INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  peca_id  INT UNSIGNED NOT NULL,
  arquivo  VARCHAR(255) NOT NULL,             -- caminho no servidor de arquivos
  alt      VARCHAR(255) NOT NULL DEFAULT '',
  ordem    SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  FOREIGN KEY (peca_id) REFERENCES pecas(id) ON DELETE CASCADE,
  INDEX idx_imagens_peca (peca_id, ordem)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Pedidos (Mercado Pago, com Pix) -------------------------------------------
CREATE TABLE IF NOT EXISTS pedidos (
  id                  INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  codigo              CHAR(10)     NOT NULL UNIQUE,   -- código curto mostrado ao cliente
  status              ENUM('aguardando_pagamento', 'pago', 'em_preparo', 'enviado', 'entregue', 'cancelado', 'reembolsado')
                      NOT NULL DEFAULT 'aguardando_pagamento',
  canal               ENUM('site', 'whatsapp', 'instagram') NOT NULL DEFAULT 'site',
  cliente_nome        VARCHAR(160) NOT NULL,
  cliente_email       VARCHAR(190) NOT NULL,
  cliente_telefone    VARCHAR(30)  NULL,
  cliente_cpf         VARCHAR(14)  NULL,      -- exigido pelo Mercado Pago em alguns meios
  entrega_cep         CHAR(9)      NULL,
  entrega_endereco    VARCHAR(255) NULL,
  entrega_numero      VARCHAR(20)  NULL,
  entrega_complemento VARCHAR(120) NULL,
  entrega_bairro      VARCHAR(120) NULL,
  entrega_cidade      VARCHAR(120) NULL,
  entrega_uf          CHAR(2)      NULL,
  subtotal_centavos   INT UNSIGNED NOT NULL,
  frete_centavos      INT UNSIGNED NOT NULL DEFAULT 0,
  total_centavos      INT UNSIGNED NOT NULL,
  mp_preference_id    VARCHAR(80)  NULL,      -- preferência do Checkout Pro
  mp_payment_id       VARCHAR(40)  NULL,      -- pagamento confirmado via webhook
  mp_metodo           VARCHAR(40)  NULL,      -- pix, credit_card, etc.
  observacoes         TEXT         NULL,
  criado_em           TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_pedidos_status (status, criado_em)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS pedido_itens (
  id                    INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  pedido_id             INT UNSIGNED NOT NULL,
  peca_id               INT UNSIGNED NULL,
  nome_peca             VARCHAR(160) NOT NULL,   -- cópia do nome no momento da compra
  preco_unit_centavos   INT UNSIGNED NOT NULL,
  quantidade            INT UNSIGNED NOT NULL DEFAULT 1,
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
  FOREIGN KEY (peca_id) REFERENCES pecas(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Notificações recebidas do Mercado Pago, guardadas cruas para auditoria.
CREATE TABLE IF NOT EXISTS mp_notificacoes (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  tipo         VARCHAR(40)  NOT NULL,
  recurso_id   VARCHAR(60)  NOT NULL,
  payload      JSON         NOT NULL,
  processada   TINYINT(1)   NOT NULL DEFAULT 0,
  recebida_em  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_mp_recurso (recurso_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Acesso ao admin -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS admins (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email        VARCHAR(190) NOT NULL UNIQUE,
  senha_hash   VARCHAR(255) NOT NULL,          -- password_hash() do PHP
  nome         VARCHAR(120) NOT NULL,
  criado_em    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
