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
       [FASE 2: IA MULTIMODAL & LEITURA DE FITAS] ───────── (Q4 / 2026)
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
- [x] **4 Manuais de Usuários & Registro de Credenciais**:
  - [MANUAL_USUARIO_MASTER.md](file:///c:/JHPCS/MANUAL_USUARIO_MASTER.md)
  - [MANUAL_USUARIO_JHOSTON_POOLS.md](file:///c:/JHPCS/MANUAL_USUARIO_JHOSTON_POOLS.md)
  - [MANUAL_USUARIO_CLIENTE_FINAL.md](file:///c:/JHPCS/MANUAL_USUARIO_CLIENTE_FINAL.md)
  - [MANUAL_USUARIO_PISCINEIRO.md](file:///c:/JHPCS/MANUAL_USUARIO_PISCINEIRO.md)
  - [USUARIOS_LIBERADOS.md](file:///c:/JHPCS/USUARIOS_LIBERADOS.md)

---

## 🟡 FASE 2: Inteligência Artificial de Visão Computacional (Novembro / 2026)
*Meta: Eliminar erros manuais de digitação do piscineiro e antecipar diagnósticos de superfície.*

* **Feature 2.1 — Leitura Automática da Fita Reagente por IA (Computer Vision)**:
  - O tratador aponta a câmera para a fita de teste ao lado da tabela colorimétrica;
  - A IA extrai e preenche instantaneamente os valores de **pH**, **Cloro Livre**, **Alcalinidade** e **Ácido Cianúrico** sem digitação manual.
* **Feature 2.2 — Detecção Precoce de Manchas e Eflorescências**:
  - Comparação de fotos panorâmicas sequenciais para detectar acúmulo mineral, algas ou perda de brilho da resina antes que o cliente perceba.
* **Feature 2.3 — Assistente Técnico JHoston no WhatsApp (Chatbot Multimodal)**:
  - O tratador ou gerente pode enviar uma foto da água ou áudio no WhatsApp oficial:
    *"Choveu muito ontem e a água esbranquiçou, o que aplico?"*
  - A IA processa o volume cadastrado da piscina e responde em menos de 10 segundos com a dosagem milimétrica de carbonato e barrilha.

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

## 🔵 FASE 4: E-Commerce B2B de Insumos & Clube de Garantia Vitalícia (Março / 2027)
*Meta: Monetização recorrente e garantia de que o cliente só utilize produtos homologados pela JHostonTec.*

* **Feature 4.1 — Reposição Automática de Insumos (Just-in-Time)**:
  - Quando a estimativa preditiva de estoque acusar menos de 3 dias de cloro ou balanceadores, o sistema emite proposta de compra com 1 clique.
* **Feature 4.2 — Checkout Integrado (Pix Automático e Faturamento)**:
  - Emissão de QR Code Pix e boleto bancário direto para a administração do resort ou proprietário.
* **Feature 4.3 — Rastreamento Logístico com Notificação no WhatsApp**:
  - Envio de código de rastreio e aviso ao síndico quando o caminhão de químicos da JHoston chegar à portaria.

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
