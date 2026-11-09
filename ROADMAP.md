# 🗺️ ROADMAP ESTRATÉGICO POOLTECH (2026 - 2027)
### *JHoston Pools Control System (JHPCS) • Da Perícia de Garantia ao Sistema Operacional da Cadeia Aquática*

---

## 🎯 Visão de Longo Prazo: O Efeito Flywheel
```
[App de Campo Grátis] ──▶ [Tratadores Conectados] ──▶ [Receituário de Balcão nas Lojas]
        │                                                              │
        ▼                                                              ▼
[Prontuário Vitalício do Ativo] ◀────────── [Originação de Obras & Reformas JHoston]
```

---

## 📍 Status Atual dos Módulos & Sprints

```
[Concluído]  Sprint 0: Arquitetura Base, Cockpit F1, Multi-Tenant e Laudos Forenses
[Concluído]  Sprint 1: Desacoplamento do App de Campo (PWA jhpcs-campo.vercel.app)
[Concluído]  Sprint 2: Infraestrutura Resiliente, Cloudflare R2 e Keep-Alive Anti-Pause
[Concluído]  Sprint 3: Motor ISL Multi-Substrato e Baixa Estequiométrica Automática
[Concluído]  Sprint 4: Receituário de Balcão com Checkout PIX e ERP em Standby
[Em Curso]   Sprint 5: Refatoração do PWA de Campo (Janela c:\JHPCS-campo)
[Planejado]  Sprint 6: Geofencing por GPS & Logbook Sanitário Anvisa para Hotéis/Clubes
[Planejado]  Sprint 7: Ativação sob Demanda do ERP Fiscal Completo (Focus / PlugNotas)
```

---

## 🗓️ Detalhamento das Fases do Roadmap

### 🟢 FASE 1: EXECUÇÃO CIRÚRGICA (CONCLUÍDA - 100%)
*Foco: Estabilidade técnica, custo zero de servidores e autoridade pericial.*
- [x] Motor Termodinâmico de Langelier (ISL) para o revestimento de areia da JHoston.
- [x] Armazenamento ilimitado de fotos no **Cloudflare R2** (sem cobrança de saída/egress).
- [x] PWA isolado em repositório próprio (`c:\JHPCS-campo`) com ativação por QR Code.
- [x] Workflow no GitHub Actions para manter o Supabase ativo sem pausa por inatividade.
- [x] Circuit Breaker com Exponential Backoff para tolerância a falhas na Evolution API.
- [x] Laudo automatizado com nota de estabilidade **100 / 100**.

---

### 🟡 FASE 2: AGNOSTICISMO & MONETIZAÇÃO DE BALCÃO (ATUAL - Q4/2026)
*Foco: Abrir o sistema para qualquer piscina do Brasil e gerar transações financeiras.*
- [x] **Agnosticismo Multi-Substrato**: Suporte nativo a Vinil, Fibra, Pastilha, Alvenaria e Monolítico com faixas químicas ideais por acabamento.
- [x] **Dedução Estequiométrica**: Baixa automática de estoque de químicos no carro do técnico com base no volume ($m^3$) tratado.
- [x] **Receituário Digital de Balcão**: Tela de diagnóstico da água em lojas com geração instantânea de lista de compras e cobrança via **PIX Copia e Cola / QR Code**.
- [x] **ERP Fiscal em Standby**: Estrutura modular pronta protegida por Feature Flag (`NEXT_PUBLIC_ENABLE_FISCAL_ERP=false`).
- [ ] **Alinhamento na Janela `c:\JHPCS-campo`**: Atualizar o PWA de campo com o seletor de substrato e credenciais do Cloudflare R2 (Guia disponível em `public/RELATORIO_REFATORACAO_PWA_CAMPO.pdf`).

---

### 🔵 FASE 3: FACILITY, CLUBS & LOGBOOK ANVISA (Q1/2027)
*Foco: Conquistar condomínios de grande porte, academias e resorts.*
- [ ] **Geofencing com Raio de 50m**: Validação matemática de GPS garantindo que o técnico estava na borda da piscina no instante da foto.
- [ ] **Logbook Sanitário Digital**: Painel de conformidade com exigências das Secretarias de Saúde e Anvisa, exportando livro de registros em PDF assinado eletronicamente.
- [ ] **Plaqueta Metálica NFC**: Placa física em alumínio com chip NFC embutido para substituição de etiquetas adesivas em condomínios de alto padrão.
- [ ] **Selo Interativo para Hotéis**: Widget para exibição em sites e recepções: *"Qualidade da Água Monitorada por JHoston Pools & Lagoons"*.

---

### 🟣 FASE 4: EXPANSÃO DE TRADE & ERP FISCAL PLUG-AND-PLAY (Q2/2027)
*Foco: Faturamento em larga escala com redes de revendas e lojas de piscina.*
- [ ] **Ativação da Feature Flag Fiscal**: Chaveamento de `NEXT_PUBLIC_ENABLE_FISCAL_ERP=true` após contratação da primeira rede varejista.
- [ ] **Emissão de NFC-e / SAT**: Integração com gateway fiscal via API (PlugNotas / Focus NFe).
- [ ] **Gestão de Lotes de Químicos**: Controle de validade e alertas de lote para atendimento a fiscalizações do Ministério da Agricultura e Saúde.
- [ ] **Marketplace Integrado de Insumos**: Reposição automática de produtos químicos faturada diretamente da indústria para a casa do cliente final.

---

### 👑 O Objetivo Estratégico Final
Transformar a JHoston na maior autoridade em engenharia aquática do Brasil. O software gera a receita recorrente previsível de SaaS (R$ 49 a R$ 490/mês), e a base instalada de piscinas monitoradas alimenta continuamente o funil comercial com obras de reformas monolíticas de R$ 50.000 a R$ 250.000!
