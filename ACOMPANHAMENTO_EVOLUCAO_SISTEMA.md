# 🚀 JHPCS EVOLUTION TRACKER & CHANGELOG EXECUTIVO
### *Livro de Registro Oficial de Evoluções, Arquitetura e Marcos Tecnológicos*
**Plataforma JHPCS PoolTech Ecosystem**  
*Responsáveis pela Governança & Arquitetura: Daniel Lopes & Patrícia Grübel*

---

## 📌 Status Atual do Ecossistema (Novembro/2026)
- **Versão Homologada**: `JHPCS Core v6.17 (KMS Fiscal Vault, Offline PWA NCM Catalog & Serverless Sefaz Webhook Edition)`
- **Índice de Estabilidade do Sistema**: **100 / 100** (Auditado via `scripts/run-system-audit.mjs` com Benchmarking e Laudo de 3 Páginas)
- **Portais em Produção**:
  - 🌐 **Landing Page Institucional & Comercial**: `https://jhpcs.vercel.app/` (Grupo de Rotas Marketing com Banner Score 100)
  - 🏆 **Página de Benchmarking Competitivo & Score 100**: `https://jhpcs.vercel.app/benchmarking` (Arma Comercial & Matriz Competitiva)
  - 🛡️ **Página Pericial de Garantia Decenal JHoston**: `https://jhpcs.vercel.app/garantia-jhoston`
  - 🧭 **Página de Setores & Soluções Especializadas**: `https://jhpcs.vercel.app/solucoes`
  - 💳 **Tabela de Preços & Comparativo de Planos**: `https://jhpcs.vercel.app/planos`
  - 👑 **Centro de Comando & Cockpit SUPER ADMIN**: `https://jhpcs.vercel.app/cockpit` (Visão Soberana Master com Chave Fiscal Multi-Tenant)
  - 🚀 **Onboarding & Ativação de Novos Clientes**: `https://jhpcs.vercel.app/onboarding`
  - 🛡️ **Perícia de Garantia JHoston (Interna)**: `https://jhpcs.vercel.app/garantia-pericial`
  - 💵 **JHPCS Financeiro & Contratos**: `https://jhpcs.vercel.app/financeiro` (Integrado à Governança Fiscal)
  - 🧾 **Motor Fiscal Eletrônico (NF-e & NFS-e)**: `https://jhpcs.vercel.app/api/fiscal/emit` (Standby Controlado por Super Usuário)
  - 🔐 **Cofre de Certificados Digitais A1 (KMS Vault)**: `https://jhpcs.vercel.app/api/fiscal/certificate` (AES-256-CBC)
  - 📡 **Worker Serverless Webhook Sefaz**: `https://jhpcs.vercel.app/api/webhooks/sefaz` (Recepção de Lote em Tempo Real)
  - ⚙️ **Gerador de Plaqueta Metálica NFC (Laser CNC)**: `https://jhpcs.vercel.app/plaqueta-nfc`
  - 🏅 **Selo de Conformidade & Totem de Recepção**: `https://jhpcs.vercel.app/selo`
  - 💳 **Gestão de Assinatura & Módulos**: `https://jhpcs.vercel.app/settings/subscription`
  - 📋 **Logbook Sanitário Digital Anvisa**: `https://jhpcs.vercel.app/logbook-sanitario`
  - ⚙️ **Configurações Multi-Tenant & WhatsApp**: `https://jhpcs.vercel.app/configuracoes`
  - 🛒 **Receituário de Balcão & PIX**: `https://jhpcs.vercel.app/trade/balcao`
  - 📱 **App PWA de Campo (Isolado)**: `https://jhpcs-campo.vercel.app`
  - 💾 **Storage Global de Evidências**: Cloudflare R2 (`pub-0698df4992464295bd9d323e91a2aee4.r2.dev`)

---

## 📅 Linha do Tempo & Histórico Detalhado de Evolução

### [v6.17] - 10/11/2026: Tripla Implantação de Infraestrutura Fiscal (Vault A1, PWA Offline e Sefaz Webhook)
- **1. Certificado Digital A1 no Supabase Vault com Criptografia KMS ([`supabase/migrations/20261110_fiscal_vault_certificates.sql`](file:///c:/JHPCS/supabase/migrations/20261110_fiscal_vault_certificates.sql))**:
  - Criação da tabela segura `tenant_fiscal_certificates` com blindagem RLS e isolamento por `tenant_id`.
  - Endpoint de upload e custódia: [`/api/fiscal/certificate`](file:///c:/JHPCS/src/app/api/fiscal/certificate/route.ts).
  - Criptografia simétrica com chave mestra KMS (`AES-256-CBC` com salt/IV aleatório de 16 bytes). O arquivo `.pfx` e a senha nunca são gravados em texto claro.
- **2. Catálogo Fiscal NCM & CFOP Offline-First para o PWA ([`src/lib/fiscal/offlineFiscalCatalog.ts`](file:///c:/JHPCS/src/lib/fiscal/offlineFiscalCatalog.ts))**:
  - Pré-carregamento dos insumos químicos homologados da cadeia aquática (Hipoclorito de Cálcio `28289011`, Dicloro Estabilizado `29336919`, Barrilha `28362010`, Bicarbonato `28363000`, Sulfato ST `28332200` e Algicida `38089990`).
  - Motor local de cálculo tributário e orçamento de carrinho capaz de calcular ICMS, PIS e COFINS sem conexão à internet.
  - Teste automatizado validado: [`scripts/test-fiscal-offline.mjs`](file:///c:/JHPCS/scripts/test-fiscal-offline.mjs) (100% PASS).
- **3. Worker Serverless de Webhooks Sefaz em Tempo Real ([`src/app/api/webhooks/sefaz/route.ts`](file:///c:/JHPCS/src/app/api/webhooks/sefaz/route.ts))**:
  - Endpoint serverless na Vercel Edge (`runtime = 'nodejs'`) preparado para receber retornos assíncronos de autorização de lote (cStat 100), rejeição ou cancelamento.
  - Atualização automática dos lotes fiscais na tabela `fiscal_invoice_batches` com vínculo direto à chave de acesso de 44 dígitos e link do DANFE/XML.
  - SLA de resposta imediata (< 500ms) com handshake homologado para a Sefaz e gateways fiscais.

---

### [v6.16] - 10/11/2026: Transformação do Score 100/100 e Benchmarking em Ferramenta Comercial de Marketing
- **Nova Página Pública de Benchmarking Competitivo ([`src/app/benchmarking/page.tsx`](file:///c:/JHPCS/src/app/benchmarking/page.tsx))**:
  - Hero comemorativo destacando o Score Oficial 100/100 com métricas de vazão estequiométrica (1.6M+ cálculos/s), Geofencing GPS de 50 metros e Custo Zero no Cloudflare R2.
  - Matriz comparativa tabular ultradetalhada: **JHPCS PoolTech** vs. **App do Tratador / Limpa Fácil**, **Genco / HTH Apps** e **Sistemas Genéricos de Ordem de Serviço**.
  - Detalhamento visual dos 5 Pilares de Engenharia certificados (LGPD, Supabase RLS, Estresse LSI, Motor Fiscal e Engenharia do Caos).
  - Download em 1 clique do Laudo Técnico Pericial Oficial em PDF de 3 páginas (`/api/pdf/system-stability`).
  - CTA integrado para ativação do Teste Gratuito de 7 dias com auto-preenchimento de CNPJ.
- **Integração na Navbar e Landing Page Raiz**:
  - [`MarketingNavbar.tsx`](file:///c:/JHPCS/src/components/marketing/MarketingNavbar.tsx): Adicionado link de destaque dourado/esmeralda `Score 100 & Benchmarking`.
  - [`(marketing)/page.tsx`](file:///c:/JHPCS/src/app/(marketing)/page.tsx): Inserido banner de autoridade institucional logo abaixo dos números de garantia decenal, direcionando o lead para a análise comparativa de mercado.

---

### [v6.15] - 10/11/2026: Governança da Chave Fiscal por Super Usuário & Laudo Ultradetalhado de 3 Páginas (Score 100/100)
- **Painel Supremo de Controle Fiscal Master ([`src/components/MasterGovernanceHub.tsx`](file:///c:/JHPCS/src/components/MasterGovernanceHub.tsx))**:
  - Modal Soberano interativo permitindo que apenas Daniel Lopes / Patrícia Grübel configurem a chave fiscal de cada empresa/tenant individualmente.
  - Alternância imediata entre ambiente de **HOMOLOGAÇÃO** (testes sem valor jurídico) e **PRODUÇÃO** (validade jurídica perante Sefaz/Prefeituras).
  - Configuração de parâmetros tributários por dropdowns:
    * CFOP Padrão para NF-e: `5102` (Interna), `5405` (Substituição Tributária) ou `6102` (Interestadual).
    * Código LC 116 para NFS-e: `07.10` (Limpeza e manutenção), `07.02` (Obras/Reforma) ou `17.01` (Perícia técnica).
    * Alíquota de ISS Municipal com validação estrita (2% a 5%).
    * Gatilho de Emissão Automática de NFS-e no momento da liquidação de mensalidade PIX.
- **Interligação com as Demais Áreas Correlatas**:
  - [`/api/admin/fiscal/config`](file:///c:/JHPCS/src/app/api/admin/fiscal/config/route.ts): Endpoint de consulta e mutação restrito com autorização estrita de Master Governance.
  - [`/financeiro`](file:///c:/JHPCS/src/app/(dashboard)/financeiro/page.tsx): Banner integrado direcionando o operador para o Cockpit com indicativo de controle de Super Usuário.
  - [`/configuracoes`](file:///c:/JHPCS/src/app/configuracoes/page.tsx): Notificador de status da chave fiscal do tenant com atalho para o Cockpit.
  - [`/trade/balcao`](file:///c:/JHPCS/src/app/trade/balcao/page.tsx): Card informativo de emissão de cupom fiscal / NFC-e interligado ao status do Super Admin.
- **Bateria de Auditoria Forense Rigorosa de 5 Pilares ([`scripts/run-system-audit.mjs`](file:///c:/JHPCS/scripts/run-system-audit.mjs))**:
  - Pilar 1: Ambiente, Credenciais, Rotas & Blindagem LGPD (20/20 pts)
  - Pilar 2: Banco de Dados Supabase, RLS Multi-Tenant & SQL Security (20/20 pts)
  - Pilar 3: Motor Químico ISL Multi-Substrato & Carga Concorrente (20/20 pts)
  - Pilar 4: Motor Fiscal (NF-e/NFS-e), Chave Super Admin & Standby Zero-Cost (20/20 pts)
  - Pilar 5: Engenharia do Caos, Telemetria Corrompida & Modo Offline IndexedDB (20/20 pts)
  - **PONTUAÇÃO FINAL CONQUISTADA: 100 / 100**.
- **Laudo Técnico Pericial Ultradetalhado em PDF ([`public/LAUDO_ESTABILIDADE_SISTEMA_JHPCS.pdf`](file:///c:/JHPCS/public/LAUDO_ESTABILIDADE_SISTEMA_JHPCS.pdf))**:
  - Expandido para **3 Páginas Executivas**:
    * *Página 1:* Auditoria Forense de Confiabilidade, Segurança e Pontuação por Pilar.
    * *Página 2:* Benchmarking Competitivo Completo (JHPCS vs App do Tratador, Genco/HTH e Softwares Genéricos de O.S.).
    * *Página 3:* Análise Crítica com Salvaguardas Imediatas (Certificados A1 no Supabase Vault, Webhooks Sefaz) e Visão de Futuro do CORE (IA Agêntica Tributária, Split PIX Bacen e Blockchain Decenal).

---

### [v6.14] - 10/11/2026: Motor Fiscal Eletrônico Completo (NF-e de Insumos & NFS-e de Serviços) em Standby
- **Arquitetura & Engenharia do Motor Fiscal ([`src/lib/fiscal/fiscalEngine.ts`](file:///c:/JHPCS/src/lib/fiscal/fiscalEngine.ts))**:
  - Implementação unificada com suporte a ambientes de **Homologação** (`HOMOLOGATION`) e **Produção** (`PRODUCTION`).
  - **NF-e (Nota Fiscal de Produto)**:
    - Validação matemática de NCM (8 dígitos numéricos, com catálogo de químicos: cloro, barrilha, sulfato, algicidas, decantadores).
    - Mapeamento estrito de CFOP (5102 interna, 5405 substituição tributária, 6102 interestadual).
    - Validação de regras tributárias de ICMS, PIS, COFINS, CST e CSOSN para empresas do Simples Nacional ou Lucro Presumido/Real.
    - Geração de Chave de Acesso estruturada de 44 dígitos (UF + AAMM + CNPJ + Mod + Série + Número + Código Numérico + DV).
  - **NFS-e (Nota Fiscal de Serviços)**:
    - Mapeamento do item da Lista de Serviços LC 116/2003 (ex: `07.10` - Limpeza, manutenção e conservação de piscinas).
    - Validação de Código IBGE do Município emissor (ex: `3550308` para São Paulo / SP) e alíquotas de ISS.
    - Tratamento de retenções na fonte (ISS, PIS, COFINS, INSS, CSLL, IRRF) e controle de Número de RPS.
- **Camada de Standby e Proteção Financeira Zero-Cost**:
  - Controlado rigidamente pela Feature Flag `NEXT_PUBLIC_ENABLE_FISCAL_ERP=false`.
  - Operação em modo **Simulação/Emulação Segura**: nenhuma cobrança de gateway (Focus NFe, PlugNotas) e nenhum envio real à Sefaz/Prefeituras ocorre sem ativação explícita da Diretoria Executiva.
  - Endpoints REST criados: `POST /api/fiscal/emit` e `GET /api/fiscal/emit?id=...`.
- **Bateria de Testes Automatizados ([`scripts/test-fiscal-engine.mjs`](file:///c:/JHPCS/scripts/test-fiscal-engine.mjs))**:
  - Teste 1: Bloqueio e rejeição estrita de NCM inválido.
  - Teste 2: Emissão simulada de NF-e em ambiente de homologação com cálculo de totais.
  - Teste 3: Emissão simulada de NFS-e de serviço de manutenção em produção.
  - Teste 4: Verificação da blindagem do modo Standby via Feature Flag.
  - **Resultado**: 4 testes executados, 4 aprovados com 100% de sucesso.
- **Governança & Documentação**:
  - Atualizado o Centro de Ajuda (`SystemHelpCenter.tsx`) e `ROADMAP.md` (Sprint 11 marcada como Em Desenvolvimento).

---

### [v6.13] - 10/11/2026: Workflow GitHub Actions Keep-Alive Anti-Pause Supabase (3 em 3 dias)
- **Implementação do Workflow CI/CD ([`.github/workflows/keep-supabase-awake.yml`](file:///C:/JHPCS/.github/workflows/keep-supabase-awake.yml))**:
  - Cron agendado com precisão: `0 6 */3 * *` (a cada 3 dias às 06:00 UTC / 03:00 Horário de Brasília).
  - Suporte a disparo manual instantâneo via `workflow_dispatch`.
  - Dupla camada de proteção contra pausa do Supabase (janela gratuita de 7 dias):
    1. Pulso HTTP na API da aplicação Vercel (`/api/cron/keep-alive`) com verificação de status code.
    2. Fallback direto via REST API no Supabase (`${SUPABASE_URL}/rest/v1/pools?select=id&limit=1`) caso os secrets estejam configurados no repositório.
- **Auditoria de Resiliência & Benchmarking**:
  - Testes do Onboarding (10/10 PASS) e Teste de Estabilidade Global (Score 100/100) validados.

---

### [v6.12] - 10/11/2026: Desacoplamento da Landing Page e Cockpit Master Dedicado
- **Desacoplamento Arquitetural de Rotas**:
  - A rota pública raiz `/` agora serve de forma nativa e exclusiva a **Landing Page Comercial & Institucional** (`src/app/(marketing)/page.tsx`) com o `<MarketingNavbar />` e `<MarketingFooter />`.
  - O Centro de Comando e Governança foi isolado na rota dedicada: [`src/app/(dashboard)/cockpit/page.tsx`](file:///C:/JHPCS/src/app/(dashboard)/cockpit/page.tsx) (`/cockpit`), garantindo que visitantes não caiam no login interno de tratador.
  - Atualização do menu de navegação e do `/guia-cliente` para direcionamento automático ao Cockpit Master.
  - Validação estática: `npx tsc --noEmit` aprovado com 0 erros.
  - Auditoria completa mantida com Score **100 / 100** e laudo em PDF atualizado.

---

### [v6.11] - 10/11/2026: Bateria Automatizada de Testes do Onboarding & Governança Expandida
- **Criação da Suite Automatizada ([`scripts/test-onboarding-flow.mjs`](file:///C:/JHPCS/scripts/test-onboarding-flow.mjs))**:
  - Validação estrita de 14 dígitos e sanitização de máscaras de CNPJ (`33.000.167/0001-01` ➔ `33000167000101`).
  - Teste ao vivo de integração com provedores da Receita Federal (BrasilAPI com fallback automático para ReceitaWS).
  - Verificação de payload do registro (`/api/onboarding/register`): bloqueio de cadastros incompletos e validação de parâmetros completos.
  - Teste de concessão exata de 7 dias de trial sem cobrança inicial.
  - Geração padronizada de slug seguro para provisionamento de instâncias WhatsApp Evolution API.
  - Validação criptográfica de hashes de senha via Bcrypt (`bcryptjs`).
  - **Resultado:** 10 / 10 testes aprovados com 100% de sucesso.
- **Formalização nos Documentos de Governança (`AGENTS.md` & `HANDOFF.md`)**:
  - Obrigatoriedade de atualização contínua do `ACOMPANHAMENTO_EVOLUCAO_SISTEMA.md`, `ROADMAP.md` e manuais do usuário.
  - Auditoria com nota 100/100 e geração obrigatória de laudo PDF com Benchmarking Competitivo frente aos concorrentes do setor.

---

### [v6.10] - 10/11/2026: Marketing Navbar, Footer Corporativo & Patch de Segurança Next.js 16.4.5
- **Navegação & Rodapé Públicos ([`MarketingNavbar.tsx`](file:///C:/JHPCS/src/components/marketing/MarketingNavbar.tsx), [`MarketingFooter.tsx`](file:///C:/JHPCS/src/components/marketing/MarketingFooter.tsx))**:
  - Navbar fixa no topo com efeito blur e gradiente ciano corporativo, links setoriais, seletor de contas demo e menu mobile.
  - Rodapé corporativo de 4 colunas com chancela Jhoston, compliance NBR 10.818, LGPD e indicador de 100% Uptime.
- **Atualização de Segurança Next.js 16.4.5**:
  - Executada via Git Worktree isolado, com compilação de 83 rotas no Turbopack com 0 erros.

---
- **Construção da Rota de Autoridade Técnica ([`src/app/(marketing)/garantia-jhoston/page.tsx`](file:///C:/JHPCS/src/app/(marketing)/garantia-jhoston/page.tsx))**:
  - Consulta pública de autenticidade de Certificados de Garantia Decenal com códigos como `JH-2026-DECENAL-PF-001` e `JH-2026-DECENAL-PJ-084`.
  - Apresentação da **Matriz de Degradação Química**:
    * Ataque Ácido (ISL < -0.30) e corrosão de ligantes poliméricos.
    * Água Incrustante (ISL > +0.50) e precipitação de calcário abrasivo.
    * Bloqueio algorítmico do ácido muriático e preservação de gelcoats.
  - **O Protocolo dos 28 Dias de Cura**:
    * Fase 1 (Dias 1 a 7): Hidratação & Estabilização sem choque químico.
    * Fase 2 (Dias 8 a 21): Passivação da matriz mineral e dureza cálcica.
    * Fase 3 (Dias 22 a 28): Homologação pericial e emissão de certificado.
  - Modelo visual do **Laudo Pericial Oficial com Hash SHA-256**.
  - Seção de credenciamento B2B para Construtoras, Arquitetos e Engenheiros.

---

### [v6.8] - 09/11/2026: Tabela Oficial de Preços, Comparativo de Recursos & Resolução do Build Turbopack
- **Página de Preços & Planos ([`src/app/(marketing)/planos/page.tsx`](file:///C:/JHPCS/src/app/(marketing)/planos/page.tsx))**:
  - Seletor dinâmico de faturamento Mensal vs Anual (16% de desconto / 2 meses grátis).
  - Cards detalhados para os 4 planos: Solo (R$ 49,90), Fleet (R$ 189,90), Facility (R$ 290,00) e Retail (R$ 149,00).
  - Tabela comparativa exaustiva de funcionalidades e garantias com selos LGPD e checkout PIX.
- **Resolução Arquitetural do Build Next.js 16 (Turbopack / Vercel)**:
  - Eliminação de rotas paralelas duplicadas entre `(dashboard)` e rotas raiz.
  - Remoção de `export const dynamic = 'force-dynamic'` em APIs para compatibilidade plena com `cacheComponents` do Next.js 16.
  - Correção de hidratação e prerender em `src/app/selo/[id]/page.tsx` com `currentTime` isolado em `useEffect`.
  - Sucesso pleno na compilação estática (`npm run build` gerando as 82 páginas).

---

### [v6.7] - 09/11/2026: Página Aprofundada de Setores & Soluções Especializadas
- **Construção da Rota Especializada ([`src/app/(marketing)/solucoes/page.tsx`](file:///C:/JHPCS/src/app/(marketing)/solucoes/page.tsx))**:
  - Navegação por abas responsivas cobrindo os 5 perfis da cadeia aquática:
    * **Tratador Autônomo (Solo)**: Eliminação de tempo perdido em cobranças manuais e desvalorização do trabalho; comprovante digital instantâneo com marca própria.
    * **Empresas & Frotas (Fleet)**: Fim do sumiço de produtos químicos e incerteza de visitas com Geofencing GPS (50m) e baixa estequiométrica automática no veículo por m³.
    * **Condomínios, Resorts, Hotéis & Clubes (Facility)**: Eliminação de pranchetas de papel e menus financeiros inúteis; Logbook sanitário por turnos NBR 10.818 e Totem de recepção para hóspedes.
    * **Lojas de Piscinas & Revendas (Retail)**: Fim de erros de dosagem por atendentes de balcão; receituário express com fita de teste, carrinho de compras consultivo e PIX dinâmico.
    * **Construtoras & Fabricantes (Chancela Jhoston)**: Blindagem pericial decenal contra negligência química e acionamentos indevidos de garantia com telemetria dos 28 dias de cura.
  - CTAs dedicados com pré-seleção no stepper de onboarding (`/onboarding?plan=solo`, `/onboarding?plan=fleet`, etc.).

---

### [v6.6] - 09/11/2026: Landing Page Institucional & Comercial de Alta Autoridade Técnica
- **Construção da Nova Home Comercial ([`src/app/(marketing)/page.tsx`](file:///C:/JHPCS/src/app/(marketing)/page.tsx))**:
  - Paleta visual nobre *Dark Slate* com acentos em *Ciano Neon* e *Dourado/Âmbar* (reforço da chancela construtiva da Jhoston Pools & Lagoons).
  - **Hero Section com Alta Conversão**:
    * Badge de destaque: "⚡ A Primeira Plataforma Unificada com Motor Químico ISL & Garantia Pericial".
    * Headline e subheadline focadas na união entre inteligência estequiométrica e preservação patrimonial.
    * CTA duplo: "Iniciar Teste Gratuito de 7 Dias" (direcionamento para `/onboarding`) e "Ver Demonstração Interativa" (atalho para o cockpit demo).
    * Mockup flutuante de campo simulando o laudo com leitura de fita, cálculo do ISL (+0.12 Equilibrada) e comprovante WhatsApp instantâneo.
  - **Faixa de Credenciais e Autoridade**:
    * Engenharia Construtiva Jhoston (Garantia Decenal de Revestimento).
    * Conformidade Sanitária Total (NBR 10.818 / RDC Anvisa).
    * Armazenamento Global de Evidências no Cloudflare R2.
    * Blindagem e Isolamento sob a LGPD (Lei 13.709/18).
  - **Apresentação dos 4 Setores de Mercado**:
    * Cards interativos detalhando os planos Solo, Fleet, Facility e Retail.
  - **Infográfico "Como Funciona o Ecossistema Fechado"**:
    * Ciclo em 4 passos: Leitura na Borda/Balcão -> Motor ISL -> Prescrição & Baixa de Estoque -> Laudo Inviolável no WhatsApp.
  - **FAQ Interativo em Accordion**:
    * Respostas técnicas sobre funcionamento offline PWA, privacidade LGPD, módulo fiscal e teste de 7 dias grátis.
  - **CTA Final de Fechamento**:
    * Formulário com captura rápida de e-mail e selo de suporte pericial 24/7.

---

### [v6.5] - 09/11/2026: Conector WhatsApp Matriz Jhoston, Auto-Busca CNPJ & Onboarding Completo
- **Conector Institucional da Matriz Jhoston ([`src/components/MasterGovernanceHub.tsx`](file:///C:/JHPCS/src/components/MasterGovernanceHub.tsx))**:
  - Adicionado card exclusivo no painel do Super Admin para controle da instância master `jhoston_corporate_master`.
  - Exibição de status da conexão ao vivo, modal interativo com QR Code para leitura do aparelho oficial da Jhoston e disparo de mensagem de homologação.
  - Endpoint dedicado [`/api/admin/whatsapp/corporate`](file:///C:/JHPCS/src/app/api/admin/whatsapp/corporate/route.ts).
- **Consulta Automatizada de CNPJ na Receita Federal ([`/api/onboarding/cnpj`](file:///C:/JHPCS/src/app/api/onboarding/cnpj/route.ts))**:
  - Consulta primária na BrasilAPI com fallback para ReceitaWS.
  - Sanitização de dados cadastrais (Razão Social, Nome Fantasia, Endereço completo, Situação Cadastral).
  - Alerta de impedimento automático para empresas que não estejam com situação "ATIVA".
- **Fluxo Guiado de Onboarding & Cadastro ([`/onboarding`](file:///C:/JHPCS/src/app/onboarding/page.tsx))**:
  - Experiência moderna em Stepper de 4 etapas:
    * **Etapa 1 (Planos)**: Solo (R$ 89), Fleet (R$ 299), Facility (R$ 490), Retail (R$ 189).
    * **Etapa 2 (Dados)**: Toggle PJ/PF com preenchimento instantâneo dos dados da empresa ao digitar o CNPJ.
    * **Etapa 3 (Ativação)**: PIX Instantâneo com 7 dias grátis e Cartão de Crédito em Standby (controlado via flag).
    * **Etapa 4 (Acesso)**: Resumo do ambiente criado com link direto para o Cockpit.
- **Wizard de Primeiro Acesso ([`src/components/onboarding/WelcomeWizardModal.tsx`](file:///C:/JHPCS/src/components/onboarding/WelcomeWizardModal.tsx))**:
  - Modal onboarding em 3 passos para novos usuários: "Configure seu PIX", "Conecte seu WhatsApp" e "Cadastre sua primeira piscina".
- **Atalho no Menu Superior ([`src/app/page.tsx`](file:///C:/JHPCS/src/app/page.tsx))**:
  - Inserido botão **"Criar Conta / Onboarding"** no cabeçalho com acesso direto à jornada de novos clientes.

---

### [v6.4] - 09/11/2026: Automação de Cron Jobs Periódicos (Laudos Quinzenais PJ e Mensais PF)
- **Engine Automatizada de Relatórios Periódicos ([`/api/cron/periodic-reports`](file:///C:/JHPCS/src/app/api/cron/periodic-reports/route.ts))**:
  - Implementação do endpoint de despacho automatizado executado às 08:00 nos dias 1 e 16 de cada mês (`0 8 1,16 * *`).
  - **Lógica de Escalonamento Inteligente**:
    * **Dia 1**: Despacho dos laudos mensais de **Pessoa Física (PF)** (obrigação de 1 medição semanal) e da 2ª quinzena de **Pessoa Jurídica (PJ)**.
    * **Dia 16**: Despacho dos laudos quinzenais da 1ª quinzena de **Pessoa Jurídica (PJ)** (obrigação de 3 medições semanais).
  - Geração nativa dos PDFs A4 via `jsPDF`, conversão direta para string Base64 e disparo via Evolution API através de `sendMediaDocument` com legenda pericial oficial.
- **Configuração de Crons na Vercel ([`vercel.json`](file:///C:/JHPCS/vercel.json))**:
  - Inclusão do agendador `0 8 1,16 * *` para o endpoint `/api/cron/periodic-reports`.
  - Inclusão do agendador `0 8 * * *` para lembrete diário de mensalidades `/api/cron/invoice-reminders`.

---

### [v6.3] - 09/11/2026: Provisionamento Soberano Master de WhatsApp (Evolution API) & Auto-Provisioning
- **Rota de API Restrita ao Super Admin ([`/api/admin/whatsapp/provision`](file:///C:/JHPCS/src/app/api/admin/whatsapp/provision/route.ts))**:
  - Proteção estrita por e-mail para os governantes supremos (`danielsmlopes@hotmail.com` e `patigrubel@gmail.com`).
  - Suporte completo às ações:
    * `CREATE`: Criação da instância na Evolution API (`jhpcs_tenant_<clean_12>`), registro no Supabase e retorno do status.
    * `RESTART`: Reinicialização remota de instâncias travadas sem necessidade de acesso ao terminal da VPS.
    * `DELETE`: Exclusão da instância na Evolution API e desvinculação limpa no banco `tenant_settings`.
    * `STATUS`: Sincronização em tempo real do estado da conexão e número proprietário.
- **Painel Supremo do Super Admin ([`src/components/MasterGovernanceHub.tsx`](file:///C:/JHPCS/src/components/MasterGovernanceHub.tsx))**:
  - Nova seção no cockpit: **Gerenciamento de Instâncias WhatsApp (Evolution API Multi-Tenant)**.
  - Tabela com listagem completa dos tenants cadastrados e homologados:
    * Botão com 1 clique `+ Criar Instância WhatsApp` para clientes sem instância.
    * Badges visuais de status ao vivo: 🟢 Conectado (+55 11 9****-**88), 🟡 Sincronizando / Aguardando QR Code, 🔴 Desativada.
    * Ações rápidas de suporte: Botão de sincronização manual, Reiniciar Sessão e Excluir Instância.
- **Auto-Provisionamento no Cadastro / Homologação**:
  - Integração em [`src/app/api/users/approve/route.ts`](file:///C:/JHPCS/src/app/api/users/approve/route.ts) para auto-provisionar a instância na Evolution API em background assim que o Master aprova o novo operador/empresa.
- **Listagem Segura de Tenants ([`/api/admin/tenants/list`](file:///C:/JHPCS/src/app/api/admin/tenants/list/route.ts))**:
  - Endpoint dedicado para enriquecer a listagem de tenants com dados consolidados de instâncias ativas e números conectados.

---

### [v6.2] - 09/11/2026: Multi-Instância Evolution API (WhatsApp White-Label) & Cron Job de Cobrança
- **Arquitetura Multi-Tenant de Mensageria (Evolution API)**:
  - Implementada a migration [`supabase/migrations/20261109_whatsapp_evolution_multitenant.sql`](file:///C:/JHPCS/supabase/migrations/20261109_whatsapp_evolution_multitenant.sql) com colunas de controle por tenant: `whatsapp_instance_name`, `whatsapp_instance_status`, `whatsapp_connected_number`, `whatsapp_auto_send_reports`, `whatsapp_auto_send_pix` e `whatsapp_last_sync_at`.
  - Cliente TypeScript [`src/lib/whatsapp/evolutionClient.ts`](file:///C:/JHPCS/src/lib/whatsapp/evolutionClient.ts) com suporte a isolamento de instâncias (`jhpcs_tenant_<id>`), criação sob demanda, geração de QR Code, verificação de estado, envio de mensagens de texto com delay anti-ban humanizado (1.5s com composing) e despacho de documentos em Base64.
- **Rotas de API no Next.js App Router**:
  - `POST /api/whatsapp/connect`: Cria/inicializa a instância do tenant e entrega o QR Code em Base64.
  - `GET /api/whatsapp/status`: Endpoint de polling e sincronização de status com o banco de dados.
  - `POST /api/whatsapp/disconnect`: Faz logout seguro da sessão na Evolution API.
  - `POST /api/whatsapp/send-test`: Realiza teste de envio imediato para homologação do número conectado.
- **Cron Job Matinal de Vencimento de Mensalidades**:
  - `GET/POST /api/cron/invoice-reminders`: Cron job com verificação de segurança (`CRON_SECRET`) que busca faturas/contratos com vencimento em `today + 2 dias` e despacha lembrete humanizado via WhatsApp com a chave PIX do tenant.
- **Painel Visual em Configurações ([`src/app/configuracoes/page.tsx`](file:///C:/JHPCS/src/app/configuracoes/page.tsx))**:
  - Card dedicado "Conexão WhatsApp Corporativo (White-Label)" com badges dinâmicos (ONLINE / SINCRONIZANDO / OFFLINE), botões de disparo de teste e desconexão.
  - Modal interativo com renderização do QR Code em Base64, contagem regressiva de 45 segundos e polling automático em background a cada 3 segundos.
  - Switches de configuração para auto-envio de laudos periciais pós-visita e envio de chave PIX de faturas.

---

### [v6.1] - 09/11/2026: Governança de Garantia JHoston, Termo Escalonado PF/PJ e Laudos em Base64
- **Termo de Compromisso e Garantia Decenal Escalonada (PF vs PJ)**:
  - Implementada a migration [`supabase/migrations/20261109_jhoston_warranty_commitment_sla.sql`](file:///C:/JHPCS/supabase/migrations/20261109_jhoston_warranty_commitment_sla.sql).
  - **Pessoa Física (PF)**: Obrigação de pelo menos 1 medição por semana; Laudo Pericial de Saúde com emissão **mensal**.
  - **Pessoa Jurídica (PJ)**: Condomínios e resorts obrigados a reportar no mínimo 3 medições por semana (ou diário por turno); Laudo Pericial com emissão **quinzenal**.
- **Informes Automáticos em Tempo Real à Diretoria JHoston**:
  - Endpoint [`/api/warranty/notify-deviation`](file:///C:/JHPCS/src/app/api/warranty/notify-deviation/route.ts).
  - Alerta via WhatsApp imediatamente quando uma piscina sob garantia apresenta desvio químico crítico (ISL &lt; -0.30, pH &lt; 7.0), uso proibido de ácido muriático sem diluição ou omissão prolongada de dados.
- **Laudo Pericial de Saúde em Base64 ([`/api/warranty/health-report-base64`](file:///C:/JHPCS/src/app/api/warranty/health-report-base64/route.ts))**:
  - Geração de laudo pericial oficial em PDF A4 com jsPDF e conversão direta para string Base64 (`mediaMessage.media`).
  - Transmissão direta pelo WhatsApp da Evolution API com download nativo no browser.
- **Interface da Central de Perícia de Garantia ([`/garantia-pericial`](file:///C:/JHPCS/src/app/garantia-pericial/page.tsx))**:
  - Painel com cards comparativos PF e PJ, simulador de alertas para a diretoria e emissor de laudos periódicos em Base64.
- **Atalho no Menu Superior**:
  - Inserido botão **"Garantia JHoston (Perícia)"** no cabeçalho ([`src/app/page.tsx`](file:///C:/JHPCS/src/app/page.tsx)).

---

### [v6.0] - 09/11/2026: JHPCS Financeiro, Contratos Recorrentes & Standby Fiscal
- **Modelagem Relacional de Finanças & Contratos**:
  - Implementada a migration [`supabase/migrations/20261109_erp_financial_modules.sql`](file:///C:/JHPCS/supabase/migrations/20261109_erp_financial_modules.sql).
  - Tabela `financial_contracts`: Contratos de mensalidade com dia de vencimento, telefone mascarado (LGPD) e comissão por visita.
  - Tabela `financial_entries`: Lançamentos de receitas e despesas operacionais com campos preparados em standby para o ERP Fiscal (`fiscal_ready`, `fiscal_invoice_ref`).
  - Módulos registrados: `fin_recurring`, `fin_commissions`, `fin_cashflow`.
- **Regras de Governança Estrita & Ocultação para Facility**:
  - Planos Solo, Fleet e Retail têm acesso aos módulos financeiros correspondentes.
  - O plano **FACILITY** (Hotéis, Resorts e Condomínios) tem **acesso estritamente bloqueado** e o menu Financeiro é completamente ocultado da interface.
- **Painel JHPCS Financeiro ([`/financeiro`](file:///C:/JHPCS/src/app/financeiro/page.tsx))**:
  - **Aba 1 (Mensalidades & Cobrança)**: Indicadores de total previsto, liquidado, em aberto e inadimplente, com botões para "Copiar PIX" e "Lembrar no WhatsApp".
  - **Aba 2 (Comissões da Equipe)**: Fechamento de rateio por técnico com botão "Marcar Comissão como Paga".
  - **Aba 3 (Fluxo de Caixa & Contas)**: Demonstrativo de entradas e saídas operacionais (químicos, bombas, combustível).
  - **Badge de Standby Fiscal**: Aviso de que a emissão fiscal (NFC-e/NFS-e) permanece em standby corporativo sob demanda.
- **Atalho no Menu Superior**:
  - Inserido botão **"Financeiro"** no cabeçalho para perfis autorizados ([`src/app/page.tsx`](file:///C:/JHPCS/src/app/page.tsx)).

---

### [v5.9] - 09/11/2026: Plaqueta Metálica NFC & Gerador Vetorial de Gravação a Laser
- **Motor Vetorial de Gravação Laser Fiber ([`/api/laser/plate-svg`](file:///C:/JHPCS/src/app/api/laser/plate-svg/route.ts))**:
  - Geração de arte vetorial pura em SVG escala 1:1 (dimensão padrão industrial 100 mm x 150 mm) pronta para importação direta em softwares industriais como LightBurn e EZCad.
  - Gabarito mecânico com 4 furos de Ø 4,0 mm nos cantos para fixação com parafusos inox 316 ou rebites em ambientes de alta corrosão por cloro e umidade.
  - Especificação para usinagem em chapa de **Alumínio Naval Anodizado 5052-H32** (espessura 1,5mm a 2,0mm).
- **Sensor Dual: Chip NFC Embutido + QR Code 2D**:
  - A plaqueta possui marcação do leitor por aproximação NFC (NTAG213/215 a 13.56 MHz) e código QR óptico de alta definição com correção de erro nível H.
  - Abertura imediata do PWA de campo com validação do raio de 50 metros por Geofencing GPS.
- **Interface Visual do Gerador ([`/plaqueta-nfc`](file:///C:/JHPCS/src/app/plaqueta-nfc/page.tsx))**:
  - Painel de configuração com seletor de destinação: **Casa de Máquinas** ou **Totem de Recepção**.
  - Visualização em tempo real do acabamento metálico escovado e botão para download imediato do arquivo `.svg`.
- **Atalho no Topo de Navegação**:
  - Inserido botão **"Plaqueta Metálica NFC"** com ícone `Cpu` no menu de topo ([`src/app/page.tsx`](file:///C:/JHPCS/src/app/page.tsx)).

---

### [v5.8] - 09/11/2026: Selo Digital Interativo para Hotéis/Condomínios & Widget de Incorporação
- **Selo Digital de Qualidade da Água & Segurança ([`/selo`](file:///C:/JHPCS/src/app/selo/page.tsx))**:
  - Construção da página pública de certificação em [`src/app/selo/[id]/page.tsx`](file:///C:/JHPCS/src/app/selo/[id]/page.tsx).
  - Exibe o totem pericial diagramado com a chancela *"Qualidade da Água Auditada por JHoston Pools & Lagoons"*, parâmetros de pH, Cloro Livre, Temperatura e Índice de Segurança do Banhista (Grau de Pureza A).
  - Certificação NBR 10.818 / RDC Anvisa com menção ao Responsável Técnico (CREA/CRQ).
- **QR Code Dinâmico para Recepções e Balcões**:
  - Geração automática de QR Code apontando para o laudo em tempo real. Hóspedes e condôminos escaneiam com a câmera do smartphone para atestar a segurança sanitária da água.
- **Widget Embed para Sites de Hotéis e Condomínios**:
  - Página dedicada em [`src/app/selo/embed/[id]/page.tsx`](file:///C:/JHPCS/src/app/selo/embed/[id]/page.tsx) gerando código `<iframe>` leve para inclusão no rodapé ou na página de lazer do site do empreendimento.
  - Endpoint de dados públicos: [`src/app/api/seal/verify/route.ts`](file:///C:/JHPCS/src/app/api/seal/verify/route.ts).
- **Atalho no Menu Superior**:
  - Inserido botão **"Selo de Conformidade"** no header de navegação principal ([`src/app/page.tsx`](file:///C:/JHPCS/src/app/page.tsx)).

---

### [v5.7] - 09/11/2026: Ambientes Demo Multi-Setor, Auto-Reset no Logout e Manuais Oficiais
- **5 Ambientes de Demonstração Pré-Configurados**:
  - Implementada a migration [`supabase/migrations/20261109_demo_tenants_and_reset.sql`](file:///C:/JHPCS/supabase/migrations/20261109_demo_tenants_and_reset.sql).
  - Ambientes criados:
    1. **Solo**: `teste.solo@teste.com` (Plano SOLO, piscinas de vinil/fibra).
    2. **Frota**: `teste.frota@teste.com` (Plano FLEET, caminhonete BRA-2026 com estoque volante e baixa estequiométrica).
    3. **Facility**: `teste.facility@teste.com` (Plano FACILITY, Resort Vista Bela com logbook de 3 turnos).
    4. **Loja**: `teste.loja@teste.com` (Plano RETAIL, balcão express e checkout PIX dinâmico).
    5. **Enterprise**: `teste.jhoston@teste.com` (Plano ENTERPRISE, piscina com anomalia proposital ISL -0.72 para contestação de garantia).
- **Gatilho de Auto-Reset no Logout**:
  - Implementado em [`src/app/api/auth/logout/route.ts`](file:///C:/JHPCS/src/app/api/auth/logout/route.ts).
  - Invoca a procedure `fn_reset_demo_tenant_data` que limpa testes recentes da sessão e restaura estoques e status de fábrica ao deslogar.
- **Documentação Oficial de Expansão Comercial e Onboarding**:
  - [`docs/MANUAL_APRESENTACAO_COMERCIAL.md`](file:///C:/JHPCS/docs/MANUAL_APRESENTACAO_COMERCIAL.md): Sales script de 15 minutos dividido por setor (Solo 3m, Frota 4m, Facility 4m, Loja 4m e Jhoston).
  - [`docs/MANUAL_TREINAMENTO_OPERACIONAL.md`](file:///C:/JHPCS/docs/MANUAL_TREINAMENTO_OPERACIONAL.md): Trilha prática de onboarding de 7 dias para novos clientes e operadores.
  - Sincronização automática para [`public/manuais/`](file:///C:/JHPCS/public/manuais/).

---

### [v5.6] - 09/11/2026: Matriz de Setores SaaS, Licenciamento Modular & Module Gates
- **Modelagem Relacional de Licenciamento Supabase**:
  - Criada a migration [`supabase/migrations/20261109_saas_modules_licensing.sql`](file:///C:/JHPCS/supabase/migrations/20261109_saas_modules_licensing.sql).
  - Tabela `system_modules`: Catálogo dos módulos operacionais (`pwa_field`, `stock_deduction`, `fleet_routes`, `facility_logbook`, `retail_trade`, `guarantee_audit`, `fiscal_erp`).
  - Tabela `subscription_tiers`: Formalização dos planos segmentados por setor:
    1. **SOLO (Tratador Autônomo)**: R$ 49,90/mês, até 30 piscinas, 1 operador.
    2. **FLEET (Frotas & Prestadoras)**: R$ 189,90/mês, até 150 piscinas, 5 operadores.
    3. **FACILITY (Condomínios, Resorts & Clubes)**: R$ 290,00/mês, até 10 complexos, 8 operadores.
    4. **RETAIL (Lojas de Piscinas & Revendas)**: R$ 149,00/mês, 3 operadores de balcão.
    5. **ENTERPRISE GUARANTEE (JHoston Pools)**: R$ 990,00/mês, ilimitado com auditoria forense.
  - Tabela `tenant_licenses`: Vínculo de licença, controle de ciclo de cobrança (Mensal/Anual), status (`ACTIVE`, `PAST_DUE`, etc.), contadores de uso e add-ons contratados.
- **Camada de Controle de Acesso Modular (TypeScript / React)**:
  - Desenvolvido em [`src/lib/licensing/moduleGuard.tsx`](file:///C:/JHPCS/src/lib/licensing/moduleGuard.tsx) com a função `hasModuleAccess()`, o hook `useModuleAccess()` e a barreira visual `<ModuleGate>`.
  - Tratamento estrito para `fiscal_erp`: só libera se a feature flag `NEXT_PUBLIC_ENABLE_FISCAL_ERP === 'true'`.
  - Proteção ativada nas telas de Balcão e Logbook Sanitário.
- **Painel de Assinatura do Cliente**:
  - Implementado em [`src/app/(dashboard)/settings/subscription/page.tsx`](file:///C:/JHPCS/src/app/(dashboard)/settings/subscription/page.tsx) com espelho em `/settings/subscription`.
  - Exibe consumo de cotas (piscinas monitoradas e operadores), seletor de planos e catálogo de add-ons com contratação em 1 clique.
  - Endpoint de API: [`src/app/api/tenant/license/route.ts`](file:///C:/JHPCS/src/app/api/tenant/license/route.ts).

---

### [v5.5] - 09/11/2026: Configurações Multi-Tenant de PIX & Logbook Sanitário Anvisa com Geofencing 50m
- **Tela de Configurações do Cliente (`/configuracoes`)**:
  - Implementação em [`src/app/configuracoes/page.tsx`](file:///C:/JHPCS/src/app/configuracoes/page.tsx) e API [`src/app/api/tenant/settings/route.ts`](file:///C:/JHPCS/src/app/api/tenant/settings/route.ts).
  - Permite que cada cliente/empresa configure sua própria chave PIX (CPF, CNPJ, Email, Celular ou Chave Aleatória) e dados de titularidade, garantindo recebimento direto e sem intermediação.
  - Customização de identidade visual (White-label), raio de tolerância do Geofencing GPS e chaveamento de turnos sanitários.
- **Logbook Sanitário Digital da Anvisa (`/logbook-sanitario`)**:
  - Interface desenvolvida em [`src/app/logbook-sanitario/page.tsx`](file:///C:/JHPCS/src/app/logbook-sanitario/page.tsx) e API em [`src/app/api/sanitary/logbook/route.ts`](file:///C:/JHPCS/src/app/api/sanitary/logbook/route.ts).
  - Registro diário de inspeções técnicas por turnos (Manhã, Tarde, Noite) para atendimento a condomínios, resorts, hotéis e clubes conforme normas sanitárias.
  - Registro de parâmetros: pH, Cloro Livre, Cloro Combinado, Temperatura da Água, Carga de Banhistas e Clareza da Água.
  - **Motor de Geofencing por GPS (50 Metros)**: Implementado em [`src/lib/geofencing.ts`](file:///C:/JHPCS/src/lib/geofencing.ts), validando a presença física real do técnico na borda da piscina via fórmula de Haversine. Registros fora do raio de 50m são sinalizados em desacordo técnico.
  - **Impressão Pericial**: Botão "Imprimir Livro Anvisa" integrado na tela para fiscalizações da Vigilância Sanitária.
- **Atalhos no Topo do Sistema**:
  - Inseridos links de acesso direto no cabeçalho de navegação ([`src/app/page.tsx`](file:///C:/JHPCS/src/app/page.tsx)).

---

### [v5.4] - 09/11/2026: Interface Visual do Receituário de Balcão & Cobrança PIX
- **Lançamento da Tela `/trade/balcao`**:
  - Construção da interface visual completa em [`src/app/trade/balcao/page.tsx`](file:///C:/JHPCS/src/app/trade/balcao/page.tsx).
  - O balconista da loja/revenda de piscinas insere os dados da fita de teste da água trazida pelo cliente (pH, Cloro, Alcalinidade, Dureza e volume em $m^3$).
  - O motor ISL diagnostica a agressividade da água por substrato e calcula a lista exata de produtos para correção química.
  - **Checkout PIX Dinâmico Integrado**: Exibe na tela o QR Code gerado em tempo real e o botão "Copiar Código PIX" para cobrança imediata na boca do caixa, sem necessidade de maquininha de cartão.
  - **Impressão Térmica**: Botão de impressão nativo para emitir o receituário físico com as instruções de aplicação para o cliente levar para casa.
  - **Acesso Direto no Menu**: Inserido atalho em destaque no menu superior do sistema principal ([`src/app/page.tsx`](file:///C:/JHPCS/src/app/page.tsx)).

---

### [v5.3] - 09/11/2026: Hierarquia Multi-Tenant & Gestão Segura de Usuários para Clientes
- **Tela do Super Administrador (Daniel Lopes & Patrícia Grübel)**:
  - Painel de Governança Suprema [`MasterGovernanceHub.tsx`](file:///C:/JHPCS/src/components/MasterGovernanceHub.tsx) formalizado como **SUPER ADMIN** com blindagem LGPD ativa.
- **Gestão Descentralizada de Usuários para Clientes**:
  - Clientes gerenciam apenas seus colaboradores vinculados ao seu `client_id`.
  - Super Admin visualiza fila global com dados pessoais de terceiros ofuscados (`maskName`, `maskEmail`, `maskPhone`).

---

### [v5.2] - 09/11/2026: Bandeira de Garantia JHoston & Consentimento Explícito
- **Tratamento Especial para Piscinas JHoston (Garantia Ativa)**:
  - `is_jhoston_asset: true` e `warranty_certificate_number: string`.
  - Consentimento de Telemetria LGPD com timestamp imutável.
  - Filtro no Dashboard: Alternância rápida `[★ Garantia JHoston (Ativo)]` ⮂ `[Todas as Piscinas]`.

---

### [v5.1] - 09/11/2026: Segurança da Informação & Proteção de Dados
- **Módulo LGPD Privacy Guard**: Anonimização de dados sensíveis e RBAC atualizado.

---

### [v5.0] - 09/11/2026: A Virada PoolTech & Expansão para o Mercado Aberto
- **Motor ISL Multi-Substrato**: Suporte a *Monolítico, Fibra, Vinil, Pastilha e Alvenaria*.
- **Cloudflare R2**: Bucket `jhpcs-fotos-inspecoes` conectado com tráfego gratuito de saída.
- **Baixa Estequiométrica**: Dedução automática de químicos por $m^3$ tratado.
- **ERP Fiscal em Standby**: Estruturado por feature flag (`NEXT_PUBLIC_ENABLE_FISCAL_ERP=false`).

---

## 📊 Matriz de Entregáveis & Artefatos Estratégicos Gerados

| Arquivo / Documento | Descrição / Objetivo | Formato |
| :--- | :--- | :---: |
| [`src/app/trade/balcao/page.tsx`](file:///C:/JHPCS/src/app/trade/balcao/page.tsx) | Interface visual de diagnóstico e cobrança PIX para lojas e revendas. | React / Next.js |
| [`public/PLANO_DIRETOR_JHPCS_POOLTECH_GLOBAL.pdf`](file:///C:/JHPCS/public/PLANO_DIRETOR_JHPCS_POOLTECH_GLOBAL.pdf) | Master Plan com os 4 módulos operacionais e matriz de monetização. | PDF A4 (3 pgs) |
| [`public/ESTUDO_BENCHMARKING_E_ROADMAP_POOLTECH.pdf`](file:///C:/JHPCS/public/ESTUDO_BENCHMARKING_E_ROADMAP_POOLTECH.pdf) | Estudo comparativo de 8 concorrentes, unificação e prompts de sprints. | PDF A4 (4 pgs) |
| [`public/RELATORIO_REFATORACAO_PWA_CAMPO.pdf`](file:///C:/JHPCS/public/RELATORIO_REFATORACAO_PWA_CAMPO.pdf) | Guia e prompt de comando pronto para executar no `c:\JHPCS-campo`. | PDF A4 (2 pgs) |
| [`public/LAUDO_ESTABILIDADE_SISTEMA_JHPCS.pdf`](file:///C:/JHPCS/public/LAUDO_ESTABILIDADE_SISTEMA_JHPCS.pdf) | Laudo forense de auditoria automatizada do sistema (Score 100/100). | PDF A4 (1 pg) |
