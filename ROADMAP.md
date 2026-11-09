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
[Concluído]  Sprint 5: Configurações Multi-Tenant de PIX e Customização White-label
[Concluído]  Sprint 6: Geofencing por GPS (50m) & Logbook Sanitário Anvisa para Hotéis/Clubes
[Concluído]  Sprint 7: Matriz de Setores SaaS, Licenciamento Modular e Module Gates
[Concluído]  Sprint 8: Ambientes Demo Multi-Setor, Auto-Reset e Manuais Comerciais
[Em Curso]   Sprint 9: Refatoração do PWA de Campo (Janela c:\JHPCS-campo)
[Planejado]  Sprint 10: Ativação sob Demanda do ERP Fiscal Completo (Focus / PlugNotas)
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

### 🟡 FASE 2: AGNOSTICISMO & MONETIZAÇÃO DE BALCÃO (CONCLUÍDA - 100%)
*Foco: Abrir o sistema para qualquer piscina do Brasil e gerar transações financeiras.*
- [x] **Agnosticismo Multi-Substrato**: Suporte nativo a Vinil, Fibra, Pastilha, Alvenaria e Monolítico com faixas químicas ideais por acabamento.
- [x] **Dedução Estequiométrica**: Baixa automática de estoque de químicos no carro do técnico com base no volume ($m^3$) tratado.
- [x] **Receituário Digital de Balcão**: Tela de diagnóstico da água em lojas com geração instantânea de lista de compras e cobrança via **PIX Copia e Cola / QR Code**.
- [x] **Configurações Multi-Tenant de PIX**: Tela `/configuracoes` para lojistas e tratadores configurarem suas próprias chaves PIX de recebimento direto.
- [x] **ERP Fiscal em Standby**: Estrutura modular pronta protegida por Feature Flag (`NEXT_PUBLIC_ENABLE_FISCAL_ERP=false`).

---

### 🔵 FASE 3: FACILITY, CLUBS & LOGBOOK ANVISA (CONCLUÍDA - 100%)
*Foco: Conquistar condomínios de grande porte, academias e resorts.*
- [x] **Geofencing com Raio de 50m**: Validação matemática de GPS garantindo que o técnico estava na borda da piscina no instante da inspeção (`src/lib/geofencing.ts`).
- [x] **Logbook Sanitário Digital**: Tela `/logbook-sanitario` e API `/api/sanitary/logbook` com registro de turnos (Manhã, Tarde, Noite), parâmetros de vigilância e impressão direta de livro de registros Anvisa.
- [x] **Selo Interativo para Hotéis & Condomínios**: Tela `/selo` e widget embed em tempo real para sites e recepções: *"Qualidade da Água Monitorada por JHoston Pools & Lagoons"*.
- [x] **Plaqueta Metálica NFC & Laser CNC**: Gerador vetorial SVG em `/plaqueta-nfc` e API `/api/laser/plate-svg` com gabarito de furação e gravação em chapa de alumínio naval anodizado 5052-H32.

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
