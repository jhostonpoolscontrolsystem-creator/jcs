# Manual do Usuário JHoston Pools (Diretoria & Corpo Técnico)
**JHoston Pools Control System (JHPCS)**
*Guia Prático para Engenharia, Supervisão Técnica e Gestão de Garantia de Revestimentos*

---

## 1. Visão Geral do Perfil JHoston Pools
Este manual destina-se aos colaboradores internos da **JHoston Pools**:
- **Diretoria Executiva (`DIRETORIA_JH`)**: Acompanhamento de indicadores de conformidade de toda a carteira de clientes, contratos sob garantia, relatórios de auditoria e métricas de satisfação.
- **Corpo Técnico & Engenharia (`TECNICO_JH`)**: Triagem de alertas químicos, validação de laudos periciais de cura submersa, supervisão de manutenções preventivas e orientação dos tratadores em campo.

---

## 2. Como Acessar o Sistema

### 2.1. Link de Acesso
- Acesse via computador, notebook ou tablet pelo link institucional:
  `https://jcs-delta.vercel.app` (ou endereço fornecido pela diretoria da JHoston Pools).

### 2.2. Login no Sistema
1. Clique em **"Entrar / Cadastrar"** no canto superior direito da tela.
2. Digite seu e-mail corporativo cadastrado (ex.: `diretoria@jhostonpools.com.br` ou `carlos.eng@jhostonpools.com.br`).
3. Digite sua senha de acesso.
   *(Nota: No primeiro acesso, o sistema exigirá a alteração de senha contendo pelo menos 8 caracteres com letras maiúsculas, números e caractere especial).*
4. Clique em **"Entrar no Sistema"**. O sistema exibirá as abas pertinentes à sua alçada funcional.

---

## 3. Módulos e Rotinas da Diretoria JHoston

### 3.1. Painel Geral de Conformidade
A Diretoria acompanha a saúde global dos revestimentos através dos 4 cartões de indicadores:
- **Ativos Monitorados**: Total de piscinas ativas com percentual de conformidade geral (ex.: 94.2%). Clique no card para abrir o inventário com filtros por cliente e região.
- **Red Zones Ativas**: Piscinas com risco iminente de perda de monólito ou manchas. Permite acionar imediatamente o engenheiro de campo.
- **Em Período de Cura**: Obras entregues nos últimos 35 dias (7 dias de cura seca + 28 dias de cura submersa) que exigem regime especial de dosagem.
- **SLA WhatsApp**: Desempenho dos disparos automáticos de avisos e laudos aos clientes.

### 3.2. Central de Relatórios Executivos & WhatsApp
Acessível pela aba **"Relatórios Diretoria (WhatsApp)"**:
- **Disparo de Laudo Consolidado**: Permite selecionar um resort ou cliente residencial e emitir o Laudo Pericial Mensal com 1 clique.
- **Agendamento de Envios**: O sistema dispara no 1º dia útil de cada mês o certificado de garantia e histórico químico diretamente no WhatsApp do síndico, gerente geral ou proprietário.
- **Histórico de Logs**: Consulta de todos os envios realizados com confirmação de entrega via Evolution API.

### 3.3. Gestão de Contas de Clientes e Tratadores
Pela aba **"Gestão de Usuários"**, a Diretoria pode:
- Cadastrar novos clientes parceiros (Hotéis, Resorts, Condomínios e Casas de Alto Padrão).
- Cadastrar os tratadores e piscineiros que atuam em cada localidade.

---

## 4. Módulos e Rotinas do Corpo Técnico (Engenharia & Técnicos)

### 4.1. Fila de Triagem Técnica (Kanban JHostonTec)
Localizada no centro do Dashboard, dividida em três colunas operacionais:
1. **Alerta Crítico (Red Zone)**: Piscinas com pH < 6.8, alcalinidade fora do padrão ou denúncia de uso de ácido não homologado. Clique em **"Ver Prontuário"** para abrir a ficha médica do tanque, conferir a foto do reagente com carimbo de GPS e emitir parecer corretivo.
2. **Em Análise Técnica**: Piscinas em processo de cura submersa ou sob investigação de dosagem.
3. **Conformidade Garantida**: Tanques que atendem a 100% dos padrões químicos e mecânicos nas últimas coletas.

### 4.2. Mapa Global de Saúde dos Revestimentos (Leaflet)
- Visualize em mapa geográfico todos os pontos atendidos com pinos coloridos:
  - 🟢 **Verde**: Equilíbrio químico perfeito.
  - 🟡 **Amarelo**: Em fase de cura ou atenção leve.
  - 🔴 **Vermelho**: Red Zone / Perigo de corrosão.
- Clique em qualquer pino para ver o nome da piscina, tipo de revestimento e abrir o prontuário.

### 4.3. Cadastro de Nova Piscina (`+ Cadastrar Nova Piscina`)
Ao iniciar o acompanhamento de uma nova obra ou cliente:
1. Clique no botão azul **"+ Cadastrar Nova Piscina"**.
2. Preencha os dados:
   - **Nome da Piscina / Instalação** (ex.: *Resort Ponta dos Corais - Tanque Principal*).
   - **Tipo**: Hotel, Resort, Condomínio ou Residencial.
   - **Volume de Água (m³)**: Dado fundamental para o cálculo automático de dosagens.
   - **Tipo de Revestimento Monolítico**: JHoston Sand, Granito Puro, Cristal ou Quartzo.
   - **Data de Aplicação / Conclusão**.
   - **Localização / CEP**: O sistema geocodifica automaticamente a Latitude e Longitude via satélite.
3. Clique em **"Criar Digital Twin"**. A piscina passará a ser auditada em tempo real.

### 4.4. Motor Químico & Regras de Garantia
Pela aba **"Motor Químico & Regras"**:
- Consulte a calculadora oficial de dosagens preventivas da JHostonTec.
- Em caso de necessidade de correção de pH ou alcalinidade, use a ferramenta para informar o tratador exatamente quantos gramas/litros de cada produto homologado devem ser inseridos.

---

## 5. Auditoria de Fraude e Perda de Garantia
O sistema conta com um algoritmo pericial que invalida automaticamente a garantia nas seguintes hipóteses:
- **Adição de Ácido Clorídrico/Muriático** durante os primeiros 28 dias de cura submersa.
- **Tentativa de envio de fotos de galeria** ou duplicadas (o app só aceita câmera em tempo real).
- **Divergência de GPS**: Coleta registrada a mais de 100 metros do perímetro cadastrado da piscina.
- **Omissão de escovação diária** no período inicial de assentamento mineral.

---
*JHoston Pools Control System • Setor de Engenharia & Qualidade*
