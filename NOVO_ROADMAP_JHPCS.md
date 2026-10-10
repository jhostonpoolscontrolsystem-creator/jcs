# 🚀 NOVO ROADMAP: Rumo ao Lançamento Oficial (JHPCS)

Fizemos um progresso estrondoso na construção da base, segurança e interface do sistema. Temos a "casca" perfeita, blindada juridicamente, com os cálculos químicos corretos e painéis para a Diretoria e Piscineiros. 

Para que o sistema deixe de ser um **MVP Avançado** e vire um **Software de Produção Real**, precisamos conectar os "fios soltos" no banco de dados e habilitar as integrações externas.

Aqui está o que falta, dividido por fases de prioridade:

---

## 🟡 FASE 1: Substituição de Dados Fictícios (Mocks) por Dados Reais
Atualmente, o sistema usa arquivos locais (`mock-data.ts`) para simular usuários e piscinas. Precisamos passar isso para o Supabase.
- [x] **Criar Tabela `pools` (Piscinas):** Armazenar nome do cliente, volume em m³, endereço, coordenadas GPS oficiais, flag de "Garantia Suspensa".
- [x] **Criar Tabela `users` (Usuários):** Mover todos os Diretores, Clientes e Piscineiros para o Supabase, com suporte a RLS (Row Level Security).
- [x] **Gestão de Desligamentos (Kill Switch):** Adicionar campo `status` (ATIVO/BLOQUEADO) no banco. Apenas MASTER, Diretoria JHoston e Cliente Final poderão bloquear instantaneamente o acesso de funcionários demitidos.
- [x] **Refatorar APIs de Telemetria:** Substituir leitura e gravação falsa (`mock-data.ts`) para acessar diretamente a tabela `maintenance_logs` e `pools` no banco oficial.

## 🟠 FASE 2: Upload de Evidências (Fotos Reais)
Os piscineiros precisam bater foto da piscina limpa. Hoje isso está simulado.
- [x] **Configurar Supabase Storage:** Criar um "Bucket" (pasta na nuvem) chamado `pool-evidences` (atualizado para `service_evidences`).
- [x] **Integração de Upload no PWA:** Fazer a câmera do celular do piscineiro enviar a foto real para o Storage via buffer invisível e salvar a URL pública no laudo técnico do banco.

## 🔴 FASE 3: Integração com WhatsApp & Motor de Assinaturas (Evolution API)
A instância da Evolution API já está rodando (`whatsapp-ecostone.onrender.com`) e configurada no `.env`. Precisamos plugar as chamadas reais com suporte a assinaturas.
- [x] **Integração Real (POST HTTP):** Substituir o `console.log` atual pela requisição real enviando as mensagens para o WhatsApp.
- [x] **Regra de Notificações Inteligentes:** Apenas eventos "RED ZONE" devem gerar alertas instantâneos no WhatsApp, tanto para a JHoston quanto para o Cliente Final (evitando spam de manutenções normais).
- [ ] **Modelo de Negócio Oficial: Planos de Assinatura Premium (JHPCS Analytics VIP):**
  - **Período de Degustação VIP Incluso (6 Meses Gratuitos):** Todo cliente novo recebe 6 meses de envios semanais/quinzenais sem custos para experimentar a tranquilidade do monitoramento contínuo.
  - **Régua de Transição & Alerta de Encerramento:**
    - Faltando 30 dias: Notificação amigável no WhatsApp e no Portal informando o término do período de cortesia.
    - Faltando 15 dias: Apresentação da proposta comercial dos planos Pro e Black Elite com 1-clique para contratação.
    - Faltando 48 horas: Último aviso e migração automática para o tier Standard (1 envio mensal gratuito) caso não contrate.
  - **Extensão de Cortesia Técnica (Até +3 Meses):**
    - Se a equipe técnica da JHoston identificar que a piscina precisa de mais tempo de acompanhamento (ex: cura atípica, alta variação de pH ou atraso na entrega da obra), a equipe pode solicitar extensão de 1 a 3 meses.
    - **Governança Estrita:** A extensão exige preenchimento obrigatório de justificativa técnica e **aprovação expressa da Diretoria Executiva da JHoston (Joabson)** antes de ser efetivada no sistema.
  - **Tiers Oficiais Pós-Degustação:**
    - **Tier Gratuito (Standard Incluso):** 1 Laudo Mensal consolidado no WhatsApp no 1º dia útil de cada mês com validação básica de garantia decenal/trienal.
    - **Tier Pro Executive (R$ 29,90/mês ou R$ 299/ano):** Despacho Quinzenal (dias 01 e 15) com gráficos de estabilidade F1, radar meteorológico antecipado e comparativo fotográfico de evolução mineral. *Pagamento antecipado até o dia 05 do mês corrente.*
    - **Tier Black Elite / Resort (R$ 49,90/mês ou R$ 499/ano):** Despacho Semanal toda segunda-feira às 08h, laudo pericial com hash SHA-256 e assinatura digital para síndicos e gerentes, cálculo de desperdício químico e botão de 1-toque para reabastecimento de estoque homologado. *Pagamento antecipado até o dia 05 do mês corrente.*
    - **Regra Financeira de Cobrança (Pré-pago):** Todos os pagamentos dos planos por assinatura são **antecipados, com vencimento impreterivelmente até o dia 05 do mês corrente**. Sem confirmação até o dia 05, o sistema suspende os despachos quinzenais/semanais e reverte automaticamente para o envio mensal gratuito (Standard Incluso), blindando contra inadimplência.

## 🔵 FASE 4: Geração Automática de Laudos (PDF) & Upsell Recorrente
- [x] **Módulo de PDF (ex: `pdfmake` ou `puppeteer`):** Toda vez que uma manutenção for concluída, o sistema deve compilar os dados (Nome, Data, pH, Cloro, Foto, e Consumo de Produto) em um arquivo `.pdf` timbrado com a logo da JHoston Pools. (Feito via `jspdf` para altíssima performance no servidor Edge).
- [x] **Anexo no WhatsApp / Upsell:** Gerador base configurado.
- [ ] **Engine de Cron com Separação de Tiers:**
  - `/api/cron/monthly-reports` (Tier Standard): Despacha 1x/mês.
  - `/api/cron/weekly-reports` (Tier Black Elite): Despacha toda segunda-feira filtrando apenas piscinas com `subscription_tier = 'BLACK_SEMANAL'`.
- [ ] **Módulo de Governança de Período Gratuito & Extensão Técnica:**
  - Controle das colunas `trial_ends_at`, `trial_extension_months`, `trial_extension_reason` e `trial_approved_by_director`.
  - Painel da Diretoria para homologar ou indeferir extensões solicitadas pelos técnicos.
- [ ] **Fluxo de Upgrade no Portal do Cliente:** Adicionar no painel do síndico/cliente a chave de ativação ou botão de upgrade com checkout Pix/Cartão integrado.

## 🟢 FASE 5: Oficialização do PWA (Modo Offline)
- [x] **Manifesto e Ícones:** Adicionar o `manifest.json` e os ícones de Apple/Android para que o piscineiro consiga clicar em "Instalar App" no navegador e o sistema fique na tela inicial do celular como um app nativo.
- [x] **Service Worker (Offline):** Garantir que, se o piscineiro estiver num condomínio sem sinal de 4G (muito comum em casa de máquinas), o app salve o laudo no celular e envie sozinho quando a internet voltar.

---

### Qual a nossa próxima jogada?
Sugiro começarmos pela **FASE 1 (Banco de Dados)**, criando as tabelas reais no Supabase, ou pela **FASE 5 (PWA Oficial)**, gerando o manifesto para ficar com cara de aplicativo de celular. Qual prefere?
