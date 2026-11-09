# Manual do Usuário JHoston Pools (Diretoria & Corpo Técnico)
**JHoston Pools Control System (JHPCS)**  
*Guia Prático para Engenharia, Supervisão Técnica, Gestão de Garantia e Expansão PoolTech*

---

## 1. Visão Geral do Perfil JHoston Pools
Este manual destina-se aos colaboradores internos e lideranças da **JHoston Pools & Lagoons**:
- **Diretoria Executiva (`DIRETORIA_JH`)**: Acompanhamento de indicadores de conformidade de toda a carteira de clientes, contratos sob garantia, relatórios de auditoria e expansão comercial.
- **Corpo Técnico & Engenharia (`TECNICO_JH`)**: Triagem de alertas químicos, validação de laudos periciais de cura submersa, supervisão de manutenções preventivas e orientação dos tratadores em campo.
- **Administrador Master (`MASTER`)**: Controle de governança irrestrita, homologação de contas, cockpit de auditoria forense e despacho do **Kit Boas-Vindas da Diretoria**.

---

## 2. A Diretriz Estratégica: O Piscineiro como Embaixador de Campo
Para blindar a JHoston Pools jurídica e operacionalmente, o sistema adota premissas rígidas:
1. **Isolamento de Tenants (Zero Leakage)**: O piscineiro tem acesso estritamente restrito às piscinas do cliente que o contratou. Ele não visualiza nenhuma informação de outros estabelecimentos.
2. **Ativação Descomplicada por QR Code**: O tratador instala o app isolado em `https://jhpcs-campo.vercel.app` em 1 toque na casa de máquinas, sem necessidade de logins longos.
3. **Multi-Substrato com Tolerâncias Personalizadas**: O motor ISL avalia a agressividade da água tanto para revestimentos monolíticos de quartzo quanto para piscinas de fibra, pastilha cerâmica ou vinil.
4. **Baixa Estequiométrica Automática**: Cada manutenção enviada gera dedução automática do saldo de químicos no carro do técnico com base no volume ($m^3$) tratado.

---

## 3. Como Acessar o Sistema

### 3.1. Link Institucional
- Acesse via computador, notebook ou tablet:
  `https://jhpcs.vercel.app` (ou `https://jcs-pools.vercel.app`).

### 3.2. Login Corporativo
1. Clique em **"Entrar / Cadastrar"** no canto superior direito.
2. Digite seu e-mail corporativo cadastrado (ex.: `jhostontec@jhostontec.com.br`).
3. Digite sua senha de acesso e clique em **"Entrar no Sistema"**.

---

## 4. Módulos e Rotinas da Engenharia & Diretoria

### 4.1. Fila de Triagem Técnica (Kanban)
- Acompanhamento em tempo real das manutenções executadas nas últimas 24h.
- Sinalização imediata de alertas de **Red Zone (Crítico)** para desvios de pH (< 7.0) ou tentativa de uso de ácidos.

### 4.2. Cockpit de Telemetria F1
- Tacômetros digitais de pH, Cloro ppm, Alcalinidade, Dureza Cálcica e LSI.
- Curvas gráficas históricas de 7 e 14 dias correlacionadas à temperatura e chuva da OpenWeather.

### 4.3. Receituário de Balcão & Vendas Rápidas
- Diagnóstico rápido de amostras de água de clientes avulsos com cálculo estequiométrico da dosagem e geração de cobrança imediata via **PIX Copia e Cola / QR Code**.

### 4.4. O Funil de Originação de Reformas
- O sistema monitora a saúde das piscinas cadastradas e sinaliza para a Diretoria Comercial os ativos com azulejos desplacando, vazamentos crônicos ou fibra trincada, gerando leads quentes para conversão em **Revestimento Monolítico Sand & Quartzo**.
