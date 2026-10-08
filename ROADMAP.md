# 🗺️ ROADMAP Estratégico & Plano Diretor 2026/2027 — JHPCS
### *JHoston Pools Control System — Monitoramento Contínuo, Proteção de Monólito e Escala Enterprise*

---

## 📊 1. Resumo Executivo das Entregas Recentes (Ciclo Outubro / 2026)

| Módulo / Feature | Status | Escopo Entregue |
|---|:---:|---|
| **Hub de Governança MASTER** | 🟢 **Concluído** | Interface dedicada e soberana para Daniel Lopes e Patrícia com fila de aprovação e auditoria global. |
| **Isolamento de Perfis (RBAC)** | 🟢 **Concluído** | Restrição rigorosa de abas: cada perfil só enxerga o que lhe compete (Diretoria, Técnicos, Clientes e Tratadores). |
| **Cards de Métricas com Drilldown** | 🟢 **Concluído** | Os 4 cards do Dashboard (`Ativos`, `Red Zones`, `Cura`, `WhatsApp SLA`) tornaram-se 100% interativos com modais de busca e aprofundamento. |
| **PWA Isolado do Piscineiro (`/pwa`)** | 🟢 **Concluído** | Rota independente, sem barras de menu corporativo, com manifesto standalone, botão de instalação em 1 toque e fila offline (IndexedDB). |
| **Gestão do Fim do Período de Cura** | 🟢 **Concluído** | Cálculo dinâmico do ciclo completo (7d seco + 28d submersa = 35d), data exata de liberação plena (DD/MM/AAAA) e contagem regressiva em dias restantes. |
| **Documentação & 4 Manuais Oficiais** | 🟢 **Concluído** | Manuais completos para Master, JHoston Pools, Clientes Finais e Piscineiros, além do documento de Usuários Liberados. |

---

## 🧭 2. Linha do Tempo e Fases de Evolução

```
       [FASE 1: ENTERPRISE MASTER & PWA ISOLADO] ────────── (100% CONCLUÍDO)
                          │
       [FASE 2: IA MULTIMODAL & LEITURA DE FITAS] ───────── (EM ANDAMENTO - ATIVO)
                          │
       [FASE 3: TELEMETRIA IoT & SONDAS EM TEMPO REAL] ──── (Q1 / 2027)
                          │
       [FASE 4: E-COMMERCE B2B & RECORRÊNCIA QUÍMICA] ───── (Q2 / 2027)
```

---

## 🟢 FASE 1: Governança, Usabilidade de Campo e Drilldown (100% Concluída)
- [x] **Painel Exclusivo MASTER**: Fila de homologação de usuários, resumo de telemetria e atalhos rápidos de controle.
- [x] **Matriz RBAC Isolada por Perfil**:
  - `MASTER`: Governança e auditoria irrestrita.
  - `DIRETORIA_JH`: Gestão executiva, relatórios mensais automáticos via WhatsApp e catálogo de contatos.
  - `TECNICO_JH`: Triagem Kanban de alertas, mapa de saúde Leaflet e motor de cálculo químico.
  - `GERENCIA_CLI` / `TECNICO_CLI`: Portal do Cliente (Digital Twin), previsão do tempo (OpenWeather) e estoque de produtos.
  - `PISCINEIRO`: Interface de campo limpa e focada em rotina.
- [x] **Drilldown nos 4 Cards de Métricas**:
  - *Ativos Monitorados*: Lista completa com busca instantânea e acesso ao prontuário médico.
  - *Red Zones Ativas*: Filtro prioritário de tanques sob risco de ataque químico.
  - *Em Período de Cura*: Relação das obras com data exata de término e dias restantes.
  - *SLA WhatsApp Evolution*: Monitoramento de latência (< 3.2s) e instância `ecostone`.
- [x] **Aplicativo do Piscineiro Standalone (`/pwa`)**:
  - Manifesto dedicado `public/manifest-pwa.json` e Service Worker em cache local.
  - Operação 100% offline com sincronização automática ao restabelecer conexão.
  - Compressão de fotos em WebP (~95% de economia) e carimbo de satélite GPS.
- [x] **Controle de Término de Cura do Monólito**:
  - Exibição da data exata de liberação plena nos cards, tabelas e prontuários médicos.
- [x] **Cockpit de Telemetria F1 & Portfólio de Clientes**:
  - Tacômetros digitais, mostrador LSI Langelier, gráficos históricos e seletor de clientes.
- [x] **4 Manuais de Usuários & Registro de Credenciais**:
  - [MANUAL_USUARIO_MASTER.md](file:///c:/JHPCS/MANUAL_USUARIO_MASTER.md)
  - [MANUAL_USUARIO_JHOSTON_POOLS.md](file:///c:/JHPCS/MANUAL_USUARIO_JHOSTON_POOLS.md)
  - [MANUAL_USUARIO_CLIENTE_FINAL.md](file:///c:/JHPCS/MANUAL_USUARIO_CLIENTE_FINAL.md)
  - [MANUAL_USUARIO_PISCINEIRO.md](file:///c:/JHPCS/MANUAL_USUARIO_PISCINEIRO.md)
  - [USUARIOS_LIBERADOS.md](file:///c:/JHPCS/USUARIOS_LIBERADOS.md)
  - [APRESENTACAO_DIRETORIA_JHOSTON.md](file:///c:/JHPCS/APRESENTACAO_DIRETORIA_JHOSTON.md)

---

## 🟡 FASE 2: IA Multimodal & Visão Computacional (EM DESENVOLVIMENTO ATIVO - 100% IMPLEMENTADA)
*Meta: Eliminar 100% dos erros manuais de digitação do tratador e auditar a superfície mineral por imagem.*

* [x] **Feature 2.1 — Leitor Multimodal de Fita Reagente e Cubeta Colorimétrica (IA Computer Vision)**:
  - Scanner de fita de teste/cubeta integrado à câmera nativa do PWA (`AiStripScannerModal.tsx`);
  - Endpoint `/api/ai/scan-strip` com calibração óptica espectral e suporte Gemini 1.5 Flash Vision;
  - Extração de **pH**, **Cloro Livre**, **Alcalinidade** e **Dureza Cálcica** com preenchimento instantâneo.
* [x] **Feature 2.2 — Scanner de Superfície & Detecção Precoce de Manchas/Algas**:
  - Modal `SurfaceAiInspectorModal.tsx` e endpoint `/api/ai/surface-inspection`;
  - Análise da foto panorâmica para detecção precoce de eflorescência cálcica, micro-cavitação por ataque ácido e risco de biofilme/algas.
* [x] **Feature 2.3 — Assistente Técnico JHoston Multimodal (Chatbot WhatsApp & Web)**:
  - Processamento de fotos de piscinas e águas recebidas via webhook da Evolution API (`/api/webhooks/evolution`);
  - Diagnóstico técnico automatizado com SLA < 10s prescrevendo dosagens de segurança sem produtos corrosivos.

---

## 🟠 FASE 3: Telemetria IoT & Sondas de Monitoramento Contínuo (Janeiro / 2027)
*Meta: Monitoramento 24/7 sem depender exclusivamente de visitas humanas presenciais.*

* **Feature 3.1 — Conector Universal IoT (MQTT / LoRaWAN)**:
  - Integração com sensores de inserção na tubulação da casa de máquinas ou boias flutuantes comerciais (ex.: Blue Connect, Ondilo, pH/Redox industriais).
* **Feature 3.2 — Gráficos de Telemetria Contínua (Intervalo de 15 Minutos)**:
  - Alimentação de gráficos com curvas de temperatura, pH e potencial de oxirredução (ORP) dia e noite.
* **Feature 3.3 — Bloqueio e Automação de Bombas Dosadoras**:
  - Se o sensor acusar queda drástica de pH durante a noite, o sistema pode comandar dosadores automáticos ou desligar bombas de aquecimento para proteger o monólito.

---

## 🔵 FASE 4: E-Commerce B2B Preditivo, Logística Nacional & Gestão Sazonal (Março / 2027)
*Meta: Garantir que nenhuma piscina fique desprotegida por falta de químicos, antecipando fretes interestaduais, sazonalidades de pico e feriados prolongados.*

### 📦 4.1. Engenharia de Supply Chain & Janelas Logísticas no Brasil
O Brasil possui dimensões continentais e o frete de produtos químicos homologados (materiais pesados e controlados) opera via transporte rodoviário fracionado ou dedicado.
* **Lead Time de Envio Estimado**: **7 a 10 dias úteis** entre despacho da fábrica JHoston e recebimento na casa de máquinas do resort/condomínio.
* **Margem de Segurança (Buffer de Trânsito)**: O gatilho de compra não pode ser disparado em "3 dias restantes", mas sim com um **lead time mínimo de 12 a 15 dias de autonomia**.

---

### ☀️ 4.2. Matriz de Sazonalidade & Multiplicadores Dinâmicos de Consumo
O algoritmo preditivo ajusta o cálculo de runway diário de insumos multiplicando a taxa base de consumo pelos seguintes coeficientes:

$$\text{Consumo Preditivo Diário} = \text{Consumo Base}(m^3) \times \mathbf{Fator_{\text{Sazonal}}} \times \mathbf{Fator_{\text{Ocupação}}}$$

1. **Alta Temporada / Verão (Dezembro a Fevereiro)**:
   - **Multiplicador: 1.8x a 2.5x**: Radiação UV intensa degrada o cloro livre rapidamente e a temperatura da água elevada acelera a proliferação bacteriana.
   - **Ação do Sistema**: Antecipação do pedido de reposição em **21 dias**, dobrando o lote mínimo recomendado.
2. **Período de Férias Escolares & Feriados Prolongados (Carnaval, Semana Santa, Réveillon, Julho)**:
   - **Multiplicador de Ocupação: 2.0x**: Carga orgânica elevada (protetor solar, suor, frequência contínua de banhistas).
   - **Alerta "Holiday Buffer"**: 15 dias antes de feriados nacionais ou paralisações de transportadoras, o JHPCS emite sugestão de reforço preventivo de estoque.
3. **Época de Chuvas Fortes / Monções Tropicais**:
   - **Aumento de Alcalinizante / Bicarbonato (+60%)**: Chuvas ácidas frequentes exigem correção imediata para estabilizar o pH antes de atingir a Red Zone.
4. **Baixa Temporada / Inverno (Maio a Agosto)**:
   - **Multiplicador: 0.6x**: Redução da evaporação e menor frequência, espaçando os ciclos de reposição para evitar estocagem excessiva de produtos perto da data de validade.

---

### 🛠️ 4.3. Features Integradas na Fase 4

* **Feature 4.1 — Algoritmo Preditivo de Reposição "Smart Runway"**:
  - Cruza o volume da piscina ($m^3$), média móvel de consumo dos últimos 14 dias, previsão meteorológica dos próximos 10 dias e o calendário de feriados.
  - Gatilho Inteligente: dispara a proposta de compra exatamente no **Ponto de Reposição Crítico (ROP)** considerando o frete de 7 dias úteis.
* **Feature 4.2 — Checkout B2B com 1 Clique (WhatsApp & Portal do Cliente)**:
  - O gestor recebe no WhatsApp: *"Seu estoque de Cloro e Alcalinizante atingirá o nível de segurança em 12 dias. Para o feriado do Carnaval, sugerimos o Lote Especial Verão. Deseja aprovar o pedido de R$ 890,00?"*
  - Opções imediatas: **[Aprovar com Pix Copia-e-Cola]** ou **[Faturar no Boleto 28 Dias]**.
* **Feature 4.3 — Rastreamento Logístico Integrado com Transportadora**:
  - Webhook de tracking com despacho, nota fiscal eletrônica (NF-e) emitida, previsão de chegada do caminhão e aviso ao tratador para conferência na casa de máquinas.
* **Feature 4.4 — Seguro de Garantia Vinculado à Cadeia de Suprimentos**:
  - Piscina que mantém compras contínuas de químicos homologados JHostonTec ganha extensão automática do **Selo de Garantia Vitalícia**, eliminando qualquer risco de contaminação por cloro genérico com excesso de ácido cianúrico.

---

## 📈 Tabela Comparativa de Impacto & Valor Gerado

| Indicador Estratégico | Operação Antiga (Sem JHPCS) | Operação com JHPCS Ativo |
|---|:---:|:---:|
| **Custo de Garantias e Retrabalho** | R$ 40.000+ / ano em perícias e litígios | **R$ 0** (100% blindado com auditoria por foto e satélite) |
| **Tempo de Resposta em Casos Críticos** | 1 a 3 semanas após estrago no revestimento | **< 3.2 segundos** via alerta no WhatsApp |
| **Confiabilidade da Equipe de Campo** | Registros manuais em pranchetas de papel | **100% digitalizado**, câmera obrigatória e fila offline |
| **Previsibilidade de Cura em Obras Novas** | Estimativas incertas de encarregados | **Data exata de conclusão** visível para o dono e diretoria |
| **Monetização de Insumos Químicos** | Perda de vendas para lojas genéricas | **Venda homologada** garantida pelo contrato de garantia |

---
*JHoston Pools Control System • Plano Estratégico Atualizado em 08/10/2026*
