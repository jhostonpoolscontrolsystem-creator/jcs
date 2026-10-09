# 🚀 NOVO ROADMAP: Rumo ao Lançamento Oficial (JHPCS)

Fizemos um progresso estrondoso na construção da base, segurança e interface do sistema. Temos a "casca" perfeita, blindada juridicamente, com os cálculos químicos corretos e painéis para a Diretoria e Piscineiros. 

Para que o sistema deixe de ser um **MVP Avançado** e vire um **Software de Produção Real**, precisamos conectar os "fios soltos" no banco de dados e habilitar as integrações externas.

Aqui está o que falta, dividido por fases de prioridade:

---

## 🟡 FASE 1: Substituição de Dados Fictícios (Mocks) por Dados Reais
Atualmente, o sistema usa arquivos locais (`mock-data.ts`) para simular usuários e piscinas. Precisamos passar isso para o Supabase.
- [ ] **Criar Tabela `pools` (Piscinas):** Armazenar nome do cliente, volume em m³, endereço, coordenadas GPS oficiais, flag de "Garantia Suspensa".
- [ ] **Criar Tabela `users` (Usuários):** Mover todos os Diretores, Clientes e Piscineiros para o Supabase, com suporte a RLS (Row Level Security).
- [ ] **Gestão de Desligamentos (Kill Switch):** Adicionar campo `status` (ATIVO/BLOQUEADO) no banco. Apenas MASTER, Diretoria JHoston e Cliente Final poderão bloquear instantaneamente o acesso de funcionários demitidos.
- [ ] **Criar Tabela `maintenance_logs` (Telemetria):** Salvar os relatórios de pH e Cloro para popular os gráficos da Diretoria com dados reais do banco.

## 🟠 FASE 2: Upload de Evidências (Fotos Reais)
Os piscineiros precisam bater foto da piscina limpa. Hoje isso está simulado.
- [ ] **Configurar Supabase Storage:** Criar um "Bucket" (pasta na nuvem) chamado `pool-evidences`.
- [ ] **Integração de Upload no PWA:** Fazer a câmera do celular do piscineiro enviar a foto real para o Storage e salvar a URL pública no laudo técnico.

## 🔴 FASE 3: Integração com WhatsApp (Evolution API Real)
A instância da Evolution API já está rodando (`whatsapp-ecostone.onrender.com`) e configurada no `.env`. Precisamos plugar as chamadas reais.
- [ ] **Integração Real (POST HTTP):** Substituir o `console.log` atual pela requisição real enviando as mensagens para o WhatsApp.
- [ ] **Regra Anti-Spam (Foco em Anomalias):** Como o piscineiro é do cliente, a JHoston Pools **NÃO** deve receber alertas de "manutenção concluída com sucesso" (para evitar inundação de mensagens). A JHoston só será notificada no WhatsApp em caso de **RED ZONE** (risco químico ou perda de garantia). O Cliente Final pode receber um laudo gerencial, se desejar.

## 🔵 FASE 4: Geração Automática de Laudos (PDF)
- [ ] **Módulo de PDF (ex: `pdfmake` ou `puppeteer`):** Toda vez que uma manutenção for concluída, o sistema deve compilar os dados (Nome, Data, pH, Cloro, Foto, e Consumo de Produto) em um arquivo `.pdf` timbrado com a logo da JHoston Pools.
- [ ] **Anexo no WhatsApp:** Enviar esse PDF gerado junto com a mensagem da Evolution API.

## 🟢 FASE 5: Oficialização do PWA (Modo Offline)
- [ ] **Manifesto e Ícones:** Adicionar o `manifest.json` e os ícones de Apple/Android para que o piscineiro consiga clicar em "Instalar App" no navegador e o sistema fique na tela inicial do celular como um app nativo.
- [ ] **Service Worker (Offline):** Garantir que, se o piscineiro estiver num condomínio sem sinal de 4G (muito comum em casa de máquinas), o app salve o laudo no celular e envie sozinho quando a internet voltar.

---

### Qual a nossa próxima jogada?
Sugiro começarmos pela **FASE 1 (Banco de Dados)**, criando as tabelas reais no Supabase, ou pela **FASE 5 (PWA Oficial)**, gerando o manifesto para ficar com cara de aplicativo de celular. Qual prefere?
