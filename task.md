# 📋 Task List & Backlog de Execução — JHPCS

**Status Geral do Projeto:** Fase 1 Concluída (100%) | Entrando na Fase 2 & 3  
**Repositório Remoto:** [github.com/jhostonpoolscontrolsystem-creator/jcs](https://github.com/jhostonpoolscontrolsystem-creator/jcs.git)  
**Ambiente de Produção:** [jcs-pools.vercel.app](https://jcs-pools.vercel.app)

---

## 🚀 SPRINT ATUAL: Enriquecimento B2B & Homologação

- [x] **Task 2.1 — Conexão Supabase Live Client**:
  - [x] Configurar `NEXT_PUBLIC_SUPABASE_ANON_KEY` oficial (`sb_publishable_Z4mxhBpI8sQ0h0J2mCDe7A_xXrL-nFM`)
  - [x] Testar e validar conexão TCP e REST ativa com a instância `abyfbwvihjctbskhiunh.supabase.co`
  - [x] Executar seed oficial de produtos químicos recomendados, perfis de usuários e ativos no banco
  - [x] Criar endpoint `/api/pools/list` com busca em tempo real no Supabase

- [x] **Task 3.1 — Mapa Interativo de Saúde Global com Pins Geográficos**:
  - [x] Instalar biblioteca de mapas (`leaflet` e `react-leaflet`)
  - [x] Renderizar coordenadas das piscinas com pins interativos com código de cores:
    - 🟢 Verde: Parâmetros em conformidade
    - 🟡 Amarelo: Em cura submersa (28 dias)
    - 🔴 Vermelho: Red Zone com risco iminente de corrosão (efeito radar pulsante)
  - [x] Adicionar modal de detalhes rápidos ao clicar em um pin

- [x] **Task 3.2 — Módulo Administrativo de Cadastro de Piscinas (Digital Twin)**:
  - [x] Criar formulário modal para cadastrar nova piscina
  - [x] Campos: Nome, Cliente/Hotel, Volume (m³), Vazão (m³/h), Latitude/Longitude, Data de Aplicação
  - [x] Inserção com validação de tipos no Supabase e cálculo automático de fase de cura (7d seco / 28d submersa)

- [x] **Task 2.3 — Pareamento e Conexão Real da Evolution API**:
  - [x] Conectar com a instância ativa `ecostone` na Render (`https://whatsapp-ecostone.onrender.com`)
  - [x] Testar disparo ao vivo e validar entrega com status `HTTP 201 Created`
  - [x] Configurar templates de Red Zone, perda de garantia e laudos mensais automáticos

---

## ✅ TAREFAS CONCLUÍDAS (FASE 1)

- [x] **Arquitetura Base**: Next.js App Router, TypeScript, Tailwind CSS
- [x] **Banco de Dados**: Schema relacional PostgreSQL Supabase (9 tabelas)
- [x] **Segurança**: Row Level Security (RLS) multi-tenant ativado
- [x] **Storage**: Bucket `service_evidences` com limite de 5MB
- [x] **Motor Químico**: Regra Letal de Ácidos, pH < 7.0 e Memória de Cálculo
- [x] **Firebase Cloud Messaging**: Push notifications + Service Worker em segundo plano
- [x] **OpenWeather API**: Dados em tempo real e avisos preventivos para o Digital Twin
- [x] **Evolution API (WhatsApp)**: Disparo de alertas críticos com SLA < 10 segundos
- [x] **Laudo de Garantia**: Geração de PDF oficial com hash SHA-256
- [x] **Ultra-Compressão de Imagens**: WebP in-browser reduzindo fotos em ~95%
- [x] **PWA**: `manifest.json` instalável + Autenticação CPF + PIN (Tela 1)
