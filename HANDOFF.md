# JHPCS PoolTech Ecosystem — Documento de Transição e Estado da Arte (HANDOFF.md)

Este documento registra o estado exato da arte da plataforma JHPCS, incluindo a arquitetura de ambientes, rotas operacionais ativas, credenciais de teste, integrações de infraestrutura e próximos passos críticos.

---

## 1. Status Geral do Projeto

| Workspace | Diretório | Status | Versão / Saúde |
| :--- | :--- | :--- | :--- |
| **JHPCS Core & Web SaaS** | `c:\JHPCS` | **100% Homologado** | `v6.10` (Score de Auditoria: 100/100, 83 páginas compilando) |
| **JHPCS Campo (PWA Móvel)** | `c:\JHPCS-campo` | **Aguardando Refatoração** | Planejado para execução via roteiro pericial homologado |

---

## 2. Serviços & Integrações Homologadas

### 2.1. Cloudflare R2 (Storage S3-Compatible)
- **Bucket Principal:** `jhpcs-fotos-inspecoes`
- **Finalidade:** Armazenamento de alta performance para fotos de antes/depois das piscinas, evidências de fitas de teste e PDFs periciais.
- **Configuração:** Egress zero, permissão de leitura pública via CDN e upload autenticado via AWS SDK v3 no backend.
- **Variáveis de Ambiente:** Definidas no `.env.local` e documentadas no `.env.example`.

### 2.2. Supabase (PostgreSQL 15 & Auth)
- **Multi-Tenancy:** Isolamento total via `tenant_id` e políticas RLS (Row Level Security).
- **Módulos Ativos:** Gestão de Tenants, Substratos de Piscinas, Contratos Financeiros, Histórico de Inspeções Físico-Químicas e Selos de Conformidade Sanitária.

### 2.3. Evolution API (WhatsApp Multi-Instância)
- **Instâncias de Tenants:** Cada assinante dos planos Solo, Fleet, Facility e Retail pode conectar seu próprio número de WhatsApp via QR Code (`/api/whatsapp/connect`).
- **Instância Corporativa Master:** Controlada pela diretoria da Jhoston (`jhoston_corporate_master`) gerenciada no painel do Super Administrador (`MasterGovernanceHub.tsx`).

---

## 3. Rotas Operacionais Chave no Core

| Rota | Descrição Operacional | Acesso / Perfil |
| :--- | :--- | :--- |
| `/trade/balcao` | Diagnóstico express de química de água no balcão de lojas com geração imediata de QR Code PIX para compra de reagentes. | Retail (Lojas) |
| `/logbook-sanitario` | Caderno sanitário digital em conformidade com as exigências da Anvisa e NBR 10.818 com validação de Geofencing GPS (50 metros). | Facility (Hotéis/Condomínios) |
| `/financeiro` | Gestão de contratos de manutenção recorrente, fluxo de caixa e cálculo automatizado de comissões por piscina (bloqueado para Facility). | Solo, Fleet, Enterprise |
| `/plaqueta-nfc` | Gerador vetorial SVG de alta resolução na escala 1:1 com corte e marcação para gravação a laser CNC em plaquetas de aço inox cirúrgico. | Todos / Operação |
| `/selo` & `/selo/[id]` | Selo público de conformidade química e sanitária com widget embed em tempo real para sites de condomínios, resorts e hotéis. | Público / Todos |
| `/garantia-jhoston` | Central de autoridade de revestimentos monolíticos e consulta pública de autenticidade de certificados com QR Code pericial. | Público / Institucional |
| `/onboarding` | Fluxo de autocadastro com busca automática de CNPJ na Receita Federal e checkout de planos com cartão em standby. | Público / Novos Clientes |

---

## 4. Credenciais dos Ambientes Demo (com Auto-Reset no Logout)

O sistema possui 5 perfis pré-configurados que podem ser acessados diretamente pela Navbar ou via login convencional. O logout limpa o estado de demonstração:

| Ambiente | E-mail de Demonstração | Senha | Perfil Operacional | Módulos Ativos |
| :--- | :--- | :--- | :--- | :--- |
| **Solo** | `teste.solo@teste.com` | `teste123` | Tratador Autônomo | PWA Offline, ISL Básico, WhatsApp Próprio, Financeiro Simples |
| **Frota** | `teste.frota@teste.com` | `teste123` | Gestor de Manutenção (Fleet) | Rotas GPS, Geofencing 50m, Baixa no Veículo, Comissões |
| **Facility** | `teste.facility@teste.com` | `teste123` | Governança Hotel/Condomínio | Logbook Anvisa, Selo NBR 10.818, Notificação WhatsApp Síndico |
| **Loja** | `teste.loja@teste.com` | `teste123` | Balcão de Loja (Retail) | Balcão Rápido, Prescrição Estequiométrica, Checkout PIX |
| **Jhoston** | `teste.jhoston@teste.com` | `teste123` | Construtora / Perícia (Enterprise) | Governança Master, Garantia Decenal, Perícia Forense ISL |

---

## 5. Próxima Ação Crítica Pendente

### Refatoração do PWA de Campo (`c:\JHPCS-campo`)
- **Objetivo:** Adequar a base legada do aplicativo móvel de campo à nova arquitetura unificada do Core v6.10.
- **Roteiro de Execução:** Seguir rigorosamente as etapas descritas no laudo técnico executivo [public/RELATORIO_REFATORACAO_PWA_CAMPO.pdf](file:///c:/JHPCS/public/RELATORIO_REFATORACAO_PWA_CAMPO.pdf).
- **Principais Entregas no Campo:**
  1. Conexão direta com os endpoints de autenticação e inspeção do Core (`/api/auth/pwa-login`, `/api/maintenance/submit`).
  2. Implementação do cache offline de leitura/escrita com sincronização em background.
  3. Captura com compressão automática WebP e upload direto ao Cloudflare R2.
  4. Validação obrigatória de Geofencing GPS (50m) para check-in e encerramento de visitas.

---

## 6. Governança de Documentação & Suporte ao Usuário

Toda e qualquer evolução técnica no ecossistema JHPCS deve manter a documentação viva e sincronizada nos seguintes pontos de contato:

1. **Changelog Vivo:** [`ACOMPANHAMENTO_EVOLUCAO_SISTEMA.md`](file:///c:/JHPCS/ACOMPANHAMENTO_EVOLUCAO_SISTEMA.md) — histórico cronológico de cada versão, sprints, melhorias e correções implementadas.
2. **Roadmap Estratégico:** [`ROADMAP.md`](file:///c:/JHPCS/ROADMAP.md) — evolução dos módulos e status das sprints estratégicas (Concluídas, Em Curso e Planejadas).
3. **Guia e Central de Ajuda do Cliente:** `/guia-cliente` — manual interativo dentro da plataforma para operadores de campo, síndicos e gerentes.
4. **Manuais, Laudos e Compêndios Técnicos:**
   - Laudo Pericial de Estabilidade, Segurança & Benchmarking: `public/LAUDO_ESTABILIDADE_SISTEMA_JHPCS.pdf` (gerado via `scripts/run-system-audit.mjs` com testes de banco, rotas, caos e benchmarking concorrencial).
   - Relatório de Refatoração de Campo: `public/RELATORIO_REFATORACAO_PWA_CAMPO.pdf`
   - Revista Executiva / Compêndio de Treinamento: `/revista-executiva` e endpoints de PDF em `/api/pdf/*`.

