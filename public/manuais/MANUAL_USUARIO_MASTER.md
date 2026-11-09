# Manual Operacional do Usuário Master & Administrador Soberano
**JHoston Pools Control System (JHPCS)**  
*Documento de Governança Estratégica, Segurança Multi-Tenant, Auditoria Forense e Expansão PoolTech*

---

## 1. Perfil e Responsabilidades do Master
O perfil **MASTER** detém a autoridade máxima do sistema JHPCS, reservado aos fundadores e gestores supremos da plataforma (**Daniel Lopes** e **Patrícia Grübel**).

Suas responsabilidades englobam:
- **Governança de Acessos e Usuários**: Aprovação final e homologação de novos cadastros de Diretores, Engenheiros Técnicos, Clientes Corporativos e Piscineiros de campo.
- **Isolamento de Tenants (Boundary Security)**: Garantir que cada cliente final ou prestador de serviço enxergue exclusivamente seus ativos autorizados, sem risco de vazamento de dados.
- **Auditoria Forense Inviolável**: Monitoramento do Livro-Razão de Auditoria (`Audit Logs`), conferência de fotos com geolocalização e carimbo de tempo imutável.
- **Armazenamento de Alta Capacidade (Cloudflare R2)**: Supervisão do bucket de fotos com egress gratuito e monitoramento do failover no Supabase Storage.
- **SLA de Telecomunicações & WhatsApp**: Supervisão do Circuit Breaker e das instâncias da **Evolution API**, garantindo tempo de resposta médio inferior a 3.2 segundos.
- **Gestão de Garantias e Red Zones**: Arbitragem de disputas técnicas e auditoria dos laudos periciais de perda de garantia via Índice de Saturação de Langelier (ISL).
- **Controle de Módulos em Standby**: Governança sobre a ativação do módulo de **ERP Fiscal Completo** (`NEXT_PUBLIC_ENABLE_FISCAL_ERP`).

---

## 2. Como Acessar o Sistema

### 2.1. Endereço Oficial
- **Portal de Gestão & Cockpit MASTER**:
  `https://jhpcs.vercel.app` (ou `https://jcs-pools.vercel.app`)
- **App de Campo Isolado (PWA)**:
  `https://jhpcs-campo.vercel.app`

### 2.2. Credenciais Mestras Homologadas
1. Na tela inicial, clique no botão **"Entrar / Cadastrar"** no topo superior direito.
2. Insira suas credenciais:
   - **E-mail**: `danielsmlopes@hotmail.com` (ou `patigrubel@gmail.com`)
   - **Senha**: Sua senha mestra cadastrada.
3. Clique em **"Entrar no Sistema"**. O painel exibirá as ferramentas douradas de autoridade Master.

---

## 3. Módulos e Recursos Exclusivos do Master

### 3.1. Cockpit Forense: Auditoria & Relatórios MASTER
Acessível na barra superior pela aba **"Auditoria & Relatórios MASTER"**:
- **Livro-Razão Forense (Audit Logs)**: Histórico completo em tempo real de logins, alterações, aprovação de operadores e disparos com endereço IP e carimbo de data/hora imutável.
- **Exportação CSV em 1 Clique**: Botão **"Exportar CSV Pericial"** para download da planilha forense integral, compatível com a LGPD e instrução de processos judiciais.
- **Retenção Perene Legal**: Proteção contra exclusão acidental ou intencional de registros para assegurar a blindagem da garantia perante o Código Civil.

### 3.2. Motor Químico Multi-Substrato (ISL)
O sistema calcula automaticamente a agressividade termodinâmica da água baseado nas características físicas de cada acabamento:
- **Monolítico Sand (JHoston)**: Tolerância estrita (ISL -0.3 a +0.3) e tolerância zero a ácidos fortes.
- **Fibra de Vidro**: Exigência de dureza cálcica balanceada para preservação do gelcoat.
- **Vinil**: Monitoramento rigoroso contra depósito de grânulos cáusticos no bolsão.
- **Pastilha Cerâmica**: Proteção ativa contra a dissolução do rejunte cimentício.

### 3.3. Trade & Receituário de Balcão (Checkout PIX)
Acessível na aba corporativa ou diretamente em `/trade/balcao`:
- Permite transformar laudos e medições trazidas por clientes em carrinhos de compra instantâneos com QR Code PIX Copia e Cola dinâmico, faturando direto no balcão de atendimento.

### 3.4. Logbook Sanitário Digital da Anvisa & Geofencing 50m
Acessível em `/logbook-sanitario`:
- **Auditoria Sanitária por Turno**: Registra as inspeções diárias obrigatórias (Manhã, Tarde e Noite) exigidas pela Vigilância Sanitária em condomínios, clubes e resorts (pH, cloro livre/combinado, clareza e banhistas).
- **Validação Presencial por GPS (50m)**: Utiliza a fórmula de Haversine para atestar que o operador estava fisicamente na borda da piscina no instante da medição.
- **Emissão Oficial**: Botão nativo para impressão do Livro Diário homologado para apresentação a fiscais sanitários.

### 3.5. Configurações Multi-Tenant & Chaves PIX do Cliente
Acessível em `/configuracoes`:
- Cada cliente da plataforma cadastra sua própria chave PIX direta (CPF, CNPJ, Telefone, E-mail ou Chave Aleatória) e dados de titularidade, garantindo recebimento direto e sem intermediação da plataforma.
- Personalização de marca (White-label), tolerância de geofencing e turnos operacionais.

### 3.6. Gestão da Infraestrutura Custo Zero & Anti-Pausa
- **Keep-Alive Supabase**: Rotina automatizada no GitHub Actions disparando um pulso de leitura a cada 3 dias (`.github/workflows/keep-supabase-awake.yml`), impedindo o congelamento do banco no plano gratuito.
- **Cloudflare R2**: Armazenamento ilimitado de fotos sem taxas de download.
