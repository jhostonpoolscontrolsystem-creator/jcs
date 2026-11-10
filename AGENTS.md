# JHPCS PoolTech Ecosystem — Diretrizes de Engenharia e Governança de Agentes (AGENTS.md)

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

## 1. Visão Geral do Sistema
O **JHPCS (Jhoston Pools & Lagoons Control System)** é uma plataforma SaaS Multi-Tenant corporativa de ponta a ponta projetada para o ecossistema de tratamento, engenharia química, preservação patrimonial e gestão de piscinas.

O sistema atende de forma modular a cinco perfis de operação:
1. **Tratadores Autônomos (Solo):** Diagnóstico estequiométrico em segundos, comprovantes com marca comercial própria via WhatsApp e gestão financeira simplificada.
2. **Empresas de Manutenção & Frotas (Fleet):** Gestão de rotas, geofencing GPS (50m) para check-in/out à beira da piscina, baixa de estoque em tempo real na viatura e comissões.
3. **Condomínios, Hotéis & Clubes (Facility):** Caderno sanitário digital em conformidade com a Anvisa / NBR 10.818, selos públicos e alertas preventivos.
4. **Lojas de Piscinas & Revendas (Retail):** Prescrição rápida de balcão (`/trade/balcao`) com checkout dinâmico e integração de vendas com catálogo de produtos.
5. **Fabricante / Construtora (Enterprise - Jhoston Pools & Lagoons):** Rastreabilidade físico-química de 10 anos (Garantia Decenal), perícia forense de substrato e governança master multi-tenant.

---

## 2. Regras Inegociáveis (System Guardrails)

### 2.1. Stack de Custo Zero e Alta Escalabilidade
- **Framework Frontend & SSR:** Next.js 15+ (App Router, Turbopack, React 19).
- **Banco de Dados & Autenticação:** Supabase (PostgreSQL 15 com RLS estrito em nível de `tenant_id`).
- **Armazenamento de Mídia:** Cloudflare R2 via protocolo S3 (Zero Egress Fees, compressão WebP de imagens).
- **Mensageria & Automação:** Evolution API (instâncias isoladas por tenant e instância corporativa master da Jhoston).
- **Estilização & Ícones:** Tailwind CSS (Dark Slate moderna) e Lucide React.

### 2.2. Motor Químico ISL Multi-Substrato Sagrado
- O cálculo do **Índice de Saturação de Langelier (ISL)** é o pilar pericial da plataforma:
  $$ISL = pH + TF + CF + AF - 12.1$$
- Parâmetros calibrados e validados estritamente de acordo com o substrato da piscina:
  - *Monolítico (Jhoston Pools)*: Proteção máxima da matriz vítrea/polimérica.
  - *Fibra de Vidro*: Prevenção de lixiviação de cobalto e osmose.
  - *Vinil*: Bloqueio contra enrugamento por ataque ácido ou alvejamento por supercloração.
  - *Pastilha / Azulejo*: Prevenção de desagregação de rejuntes cimentícios.
  - *Pintura / Alvenaria Tradicional*: Equilíbrio contra descolamento e eflorescência.
- **Bloqueio Inegociável:** É expressamente proibido receitar ou permitir o uso de ácido muriático bruto diretamente na piscina. Violação implica revogação imediata da garantia de revestimento.

### 2.3. Privacidade e Conformidade LGPD (Lei nº 13.709/18)
- Super Administradores e operadores nunca devem visualizar dados pessoais sensíveis de terceiros desnecessários.
- A visualização de CPFs, telefones, e-mails e faturamento de outros tenants deve ser mascarada utilizando o utilitário `src/lib/security/lgpd-masking.ts`.
- Auditoria de acessos sensíveis gravada na tabela `audit_logs`.

### 2.4. ERP Fiscal em Standby
- O módulo fiscal corporativo permanece adormecido via Feature Flag:
  `NEXT_PUBLIC_ENABLE_FISCAL_ERP=false`
- Não deve emitir notas fiscais reais ou acionar endpoints externos da Sefaz até deliberação expressa da diretoria executiva.

### 2.5. Qualidade de Código & Entrega Completa
- **Proibido Truncar Código:** Nunca emitir trechos com comentários como `"// ... restante do código permanece igual"` ou omitir imports/tipagens. Todo código gerado deve ser integral, limpo e pronto para compilação.
- **TypeScript Estrito:** `npx tsc --noEmit` deve sempre passar com 0 erros.
- **Nota 100/100:** Cada ciclo de desenvolvimento deve ser validado via bateria automatizada de testes de estresse e resiliência.

### 2.6. Atualização Contínua de Evolução, Manuais e Telas de Ajuda (Mandatório)
- **Registro de Evolução:** Toda nova funcionalidade, correção ou módulo entregue DEVE ser imediatamente registrado no arquivo `ACOMPANHAMENTO_EVOLUCAO_SISTEMA.md`, com versionamento incremental, data e detalhamento dos componentes afetados.
- **Telas de Ajuda e Guias:** Qualquer alteração em fluxos de trabalho ou telas operacionais deve refletir nas telas de ajuda in-app (ex: `/guia-cliente`, modais de ajuda contextual) e nos manuais do usuário. A entrega só é considerada concluída se a documentação do usuário estiver em perfeita sincronia com o código.

---

## 3. Catálogo de Agentes Autônomos (Personas)

| Agente | Responsabilidade Principal | Escopo de Arquivos |
| :--- | :--- | :--- |
| **Agent Database & Security** | Migrations PostgreSQL, RLS multi-tenant, sanitização e mascaramento LGPD. | `supabase/migrations/*`, `src/lib/security/*`, `src/lib/supabase/*` |
| **Agent Chemical Engine** | Algoritmos ISL, estequiometria, regras de dosagem e salvaguardas periciais de substrato. | `src/lib/chemistry/*`, `src/lib/warranty/*` |
| **Agent Frontend & UI/UX** | Páginas públicas e cockpit autenticado, design system dark slate, responsividade e PWA. | `src/app/*`, `src/components/*` |
| **Agent Integrations** | Integração Cloudflare R2, instâncias Evolution API WhatsApp, gateway PIX e consulta de CNPJ. | `src/app/api/*`, `src/lib/storage/*`, `src/lib/whatsapp/*` |

---

## 4. Comandos de Auditoria e Validação

Antes de qualquer commit ou entrega de funcionalidade, execute a rotina de certificação:

```bash
# 1. Validação estática de tipagem TypeScript
npx tsc --noEmit

# 2. Bateria de testes de estabilidade, estresse, caos e resiliência (Score 100/100)
node scripts/run-system-audit.mjs

# 3. Compilação de produção com Next.js Turbopack
npm run build
```

O laudo executivo da auditoria é gerado automaticamente no arquivo [public/LAUDO_ESTABILIDADE_SISTEMA_JHPCS.pdf](file:///c:/JHPCS/public/LAUDO_ESTABILIDADE_SISTEMA_JHPCS.pdf).
