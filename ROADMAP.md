# 🗺️ Roadmap de Implantação e Go-to-Market — JHPCS (JHoston Pools Control System)

**Objetivo Estratégico:** Proteger o maior ativo da JHostonTec (revestimentos monolíticos), transferir responsabilidade jurídica, auditar rotinas de tratadores terceirizados e gerar valor real aos clientes B2B/B2C via Digital Twin.

---

## 🟢 FASE 1: Fundação & Arquitetura Base (100% CONCLUÍDA)
- [x] **Setup do Projeto**: Next.js (App Router), TypeScript, Tailwind CSS e Vercel Serverless/Edge.
- [x] **Banco de Dados & RLS (Supabase)**: 9 tabelas relacionais + Políticas de segurança multi-tenant (RBAC).
- [x] **Storage com Trava**: Bucket `service_evidences` no Supabase com limite de 5MB.
- [x] **Motor Químico Hard-Coded**: Regra Letal de Ácidos (`WARRANTY_SUSPENDED`), Alerta de pH < 7.0 (`RED_ZONE`) e memória de cálculo preditiva.
- [x] **Firebase Cloud Messaging**: Projeto `jhpcs-2fefd`, Service Worker e chaves VAPID configuradas.
- [x] **Inteligência Meteorológica**: Integração real OpenWeather com recomendações preventivas.
- [x] **Mensageria WhatsApp (Evolution API)**: Disparo ativo com SLA < 10 segundos.
- [x] **Certificado de Garantia em PDF**: Emissão automática com chancela e hash criptográfico.
- [x] **Motor de Ultra-Compressão WebP**: Redução de ~95% no peso das fotos capturadas (35KB - 60KB).
- [x] **PWA Instalável**: Configuração do `manifest.json` e login de campo com CPF + PIN.

---

## 🟡 FASE 2: Homologação Técnica & Testes de Campo (Próximos Passos Imediatos)

### Marco 2.1 — Conectar a Chave Pública do Supabase (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- **Ação:** Inserir a chave anônima no painel da Vercel e no `.env.local` para transicionar do mock para queries 100% ativas no banco de dados.
- **Impacto:** Persistência em tempo real de logs de tratamento e inventário.

### Marco 2.2 — Teste de Homologação em Dispositivo Real (Mobile)
- **Ação:** Acessar `jcs-pools.vercel.app` pelo navegador do smartphone (Chrome/Safari) e validar:
  1. Instalação do PWA ("Adicionar à tela de início").
  2. Acesso à Câmera Traseira (`getUserMedia`) com bloqueio efetivo de seleção de arquivos da galeria.
  3. Coleta de coordenadas do GPS com alta precisão e conferência de raio de 100m.
  4. Teste em modo avião (Offline): salvar registro no IndexedDB e validar sincronização automática ao religar a rede.

### Marco 2.3 — Pareamento do WhatsApp na Evolution API
- **Ação:** Subir a instância Docker da Evolution API apontando para o número de suporte oficial da JHostonTec e ler o QR Code.
- **Impacto:** Alertas críticos de Red Zone e Chatbot de Status funcionando no WhatsApp real.

---

## 🟠 FASE 3: Enriquecimento de Recursos & Operação B2B

### Marco 3.1 — Painel Multi-Piscinas com Mapa Real (Leaflet / Google Maps)
- **Ação:** Substituir a grade estática do mapa de saúde pelo componente interativo de mapa, plotando pins coloridos (Verde = Conforme, Amarelo = Cura, Vermelho = Red Zone) com zoom nos hotéis e resorts.

### Marco 3.2 — Automação de Disparo Mensal de Laudos (WhatsApp Bot)
- **Ação:** Configurar a rota `/api/cron/monthly-reports` no `vercel.json` para rodar no 1º dia útil de cada mês, gerando o PDF e enviando via WhatsApp para os síndicos e gerentes de manutenção.

### Marco 3.3 — Cadastro e Gestão de Novos Clientes & Piscinas
- **Ação:** Criar formulário administrativo para cadastro de novos clientes, definição do volume em m³, vazão de bomba, coordenadas GPS de referência e data de início de cura (7d seco / 28d submersa).

---

## 🔵 FASE 4: Go-to-Market & Jurídico

### Marco 4.1 — Validação do Termo de Responsabilidade Jurídica
- **Ação:** Revisão jurídica do texto do Termo de Responsabilidade diário ("Declaro que as informações refletem o estado real da água..."), garantindo validade de assinatura eletrônica conforme a MP 2.200-2/2001.

### Marco 4.2 — Treinamento dos Primeiros Piscineiros Credenciados
- **Ação:** Onboarding prático de 2 ou 3 tratadores em hotéis piloto, usando CPF e PIN de 4 dígitos para submissão diária.
