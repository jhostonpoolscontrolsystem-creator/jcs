# 📋 Task List & Backlog de Execução — JHPCS

**Status Geral do Projeto:** Fase 1 Concluída (100%) | Entrando na Fase 2 & 3  
**Repositório Remoto:** [github.com/jhostonpoolscontrolsystem-creator/jcs](https://github.com/jhostonpoolscontrolsystem-creator/jcs.git)  
**Ambiente de Produção:** [jcs-pools.vercel.app](https://jcs-pools.vercel.app)

---

## 🚀 SPRINT ATUAL: Enriquecimento B2B & Homologação

- [ ] **Task 2.1 — Conexão Supabase Live Client**:
  - [ ] Obter e configurar `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] Implementar hook de consulta e inserção direta nas tabelas `pools` e `maintenance_logs`
  - [ ] Desativar dados de fallback mockados quando houver conexão viva com o Supabase

- [x] **Task 3.1 — Mapa Interativo de Saúde Global com Pins Geográficos**:
  - [x] Instalar biblioteca de mapas (`leaflet` e `react-leaflet`)
  - [x] Renderizar coordenadas das piscinas com pins interativos com código de cores:
    - 🟢 Verde: Parâmetros em conformidade
    - 🟡 Amarelo: Em cura submersa (28 dias)
    - 🔴 Vermelho: Red Zone com risco iminente de corrosão (efeito radar pulsante)
  - [x] Adicionar modal de detalhes rápidos ao clicar em um pin

- [ ] **Task 3.2 — Módulo Administrativo de Cadastro de Piscinas (Digital Twin)**:
  - [ ] Criar formulário para cadastrar nova piscina
  - [ ] Campos: Nome, Cliente/Hotel, Volume (m³), Vazão (m³/h), Latitude/Longitude, Data de Aplicação
  - [ ] Inserção com validação de tipos no Supabase

- [ ] **Task 3.3 — Automação do Despacho Mensal de Laudos em PDF**:
  - [ ] Criar rota agendada `/api/cron/monthly-reports`
  - [ ] Consolidar logs do mês anterior para cada ativo
  - [ ] Despachar mensagem com anexo via Evolution API para a gerência

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
