# 📘 MANUAL DE TREINAMENTO & ONBOARDING OPERACIONAL (7 DIAS)
### *Guia Prático Passo a Passo Usando os Ambientes de Demonstração JHPCS*
**Público-Alvo**: Novos Clientes, Gerentes Operacionais, Tratadores de Campo e Atendentes de Loja  
**Versão**: 2026.11 • Homologado pelo Departamento Técnico e Governança JHPCS

---

## 🎯 Objetivo da Trilha de Onboarding

Este programa de 7 dias capacita qualquer profissional a dominar o ecossistema JHPCS utilizando as contas demonstrativas de teste, que contam com **Auto-Reset** automático (ao deslogar, todos os dados voltam ao estado original de fábrica).

---

## 🗓️ Dia 1: Primeiro Login e Configurações de Tenant

### Credenciais Utilizadas:
- E-mail: `teste.frota@teste.com` (ou qualquer conta demo da sua categoria)
- Senha: `teste123`

### Passo a Passo:
1. Acesse `https://jhpcs.vercel.app` (ou `http://localhost:3000`).
2. Clique no botão **"Entrar / Cadastrar"** no canto superior direito.
3. Insira o e-mail e senha de teste.
4. Acesse a tela de **Configurações** (`/configuracoes`):
   - **Chave PIX Própria**: Cadastre uma chave (CNPJ, Celular ou E-mail) e o nome do titular. O sistema usará essa chave em todas as cobranças de balcão e laudos, depositando 100% dos valores diretamente na conta da sua empresa, sem intermediários.
   - **Personalização White-Label**: Defina o nome fantasia e telefone de suporte para os relatórios de WhatsApp.
   - **Tolerância de Geofencing**: Mantenha o padrão em **50 metros**.

---

## 🗓️ Dia 2: O Motor Químico ISL Multi-Substrato

Diferente de aplicativos genéricos que tratam toda piscina como plástico, o JHPCS calcula a termodinâmica da água com base no acabamento físico do tanque:

### Faixas Químicas e Regras por Substrato:

1. **Monolítico Sand (Revestimentos JHoston)**:
   - **pH Ideal**: 7.2 a 7.6 (Equilíbrio estrito).
   - **Alcalinidade**: 100 a 120 ppm (Tampão obrigatório para proteger a resina).
   - **Tolerância Zero a Ácidos Fortes**: Proibido uso de ácido muriático puro; use apenas redutor de pH tamponado e diluído em balde.
2. **Fibra de Vidro**:
   - **Dureza Cálcica**: 200 a 400 ppm (Evita a extração de cálcio do gelcoat e formação de manchas esbranquiçadas/osmose).
3. **Vinil (Bolsão)**:
   - Proibição de cloro granulado jogado direto no fundo sem dissolução prévia (evita o desbotamento e queima do bolsão).
4. **Pastilha Cerâmica**:
   - Manutenção de ISL neutro (+0.0 a +0.2) para impedir a erosão do rejunte cimentício por água corrosiva.

---

## 🗓️ Dia 3: Operação de Campo & PWA Offline

### Credenciais Utilizadas:
- E-mail: `teste.solo@teste.com` | Senha: `teste123`

### Passo a Passo:
1. Abra o app no celular e instale o PWA na tela inicial.
2. **Funcionamento 100% Offline**:
   - Mesmo no subsolo de um prédio ou condomínio sem sinal de celular, o tratador abre a piscina cadastrada.
3. Insira os parâmetros medidos na fita: pH, Cloro Livre e Alcalinidade.
4. Tire a **Foto da Piscina** e a **Foto da Fita de Teste**:
   - O app compacta a imagem na hora em **WebP** (redução de 85% do tamanho mantendo qualidade forense).
   - O upload vai direto para o **Cloudflare R2** com **Egress Gratuito**.
5. Ao recuperar conexão, o laudo é sincronizado automaticamente.
6. Clique no botão **"Enviar Relatório WhatsApp"** para entregar o laudo assinado ao proprietário da piscina.

---

## 🗓️ Dia 4: Gestão de Estoque Volante (Baixa Estequiométrica)

### Credenciais Utilizadas:
- E-mail: `teste.frota@teste.com` | Senha: `teste123`

### Como Funciona a Baixa Automática:
1. A caminhonete (Placa `BRA-2026`) inicia o dia carregada com:
   - 45 kg de Cloro Granulado.
   - 30 kg de Barrilha Leve.
   - 18 L de Algicida.
2. O técnico realiza o atendimento no *"Condomínio Alphaville Rota 1"* (Piscina de 120m³) e registra a necessidade de elevar a alcalinidade em 40 ppm:
   - O motor calcula estequiometricamente: $120 \times 18\text{g} = 2,16\text{ kg}$ de barrilha.
3. O sistema desconta automaticamente 2,16 kg do saldo do veículo `BRA-2026`.
4. **Alerta de Estoque Mínimo**: Quando o saldo do veículo atinge menos de 10 kg, o gestor recebe aviso para reabastecimento na base.

---

## 🗓️ Dia 5: Operação de Balcão e PDV Express (Lojas)

### Credenciais Utilizadas:
- E-mail: `teste.loja@teste.com` | Senha: `teste123`

### Passo a Passo:
1. Acesse o menu **"Receituário de Balcão (PIX)"** em `/trade/balcao`.
2. O cliente chega à loja com uma amostra d'água em uma garrafa pet:
   - Insira o volume da piscina do cliente (ex: 45m³) e o tipo de acabamento.
   - Mergulhe a fita de teste e digite os valores (ex: pH 6.8, Alcalinidade 60 ppm).
3. Clique em **"Gerar Receituário Express"**:
   - A cesta de produtos é calculada instantaneamente: Barrilha + Elevador de pH + Algicida de Choque.
4. **Cobrança PIX sem Maquininha**:
   - Mostre o QR Code gerado na tela para o cliente pagar com o aplicativo do banco.
5. **Impressão Cupom Térmico (80mm)**:
   - Clique em **"Imprimir Receituário"** para emitir a comanda física com a ordem cronológica de aplicação dos produtos.

---

## 🗓️ Dia 6: Logbook Sanitário Anvisa (Hotéis, Clubes e Condomínios)

### Credenciais Utilizadas:
- E-mail: `teste.facility@teste.com` | Senha: `teste123`

### Passo a Passo:
1. Acesse **"Logbook Sanitário (Anvisa)"** em `/logbook-sanitario`.
2. Selecione a *"Piscina Olímpica Central - Resort Vista Bela"*.
3. Escolha o turno correspondente:
   - **Manhã** (07h00)
   - **Tarde** (13h00)
   - **Noite** (19h00)
4. Insira os dados obrigatórios:
   - pH, Cloro Livre (ppm), Cloro Combinado (ppm), Temperatura (°C), Clareza da água e contagem estimada de banhistas.
5. **Auditoria Geofencing (50m)**:
   - O sistema valida via GPS se o operador está presente fisicamente na borda.
6. Clique em **"Imprimir Livro Anvisa"**:
   - O documento oficial sai pronto e assinado digitalmente, com carimbo de tempo inviolável para apresentação imediata aos fiscais sanitários.

---

## 🗓️ Dia 7: Governança de Equipe & LGPD Privacy Guard

### Credenciais Utilizadas:
- E-mail: `teste.frota@teste.com` (ou Master: `danielsmlopes@hotmail.com`)

### Melhores Práticas de Privacidade & LGPD:
1. **Cadastro de Técnicos**:
   - Cadastre apenas o nome, e-mail e telefone corporativo do operador.
2. **Mascaramento Automático de Dados**:
   - O JHPCS aplica máscaras dinâmicas (`D**** S**** L****`, `(11) 9****-**89`) para que dados pessoais de terceiros nunca fiquem expostos a colaboradores desnecessários.
3. **Auditoria Pericial de Garantia JHoston**:
   - Se uma piscina tiver a bandeira `is_jhoston_asset: true`, a equipe de engenharia da JHoston recebe apenas os dados de telemetria físico-química da água (pH, cloro e fotos de teste) para efeito de auditoria de garantia.
   - A JHoston **não enxerga** quanto a sua empresa cobra do cliente nem informações pessoais confidenciais.

---

## 🔄 Como Testar o Auto-Reset

Para comprovar que o sistema restaura o estado inicial:
1. Logado em qualquer conta demo (`teste.*@teste.com`), crie uma nova medição ou altere um valor.
2. Clique no ícone de **Sair / Desconectar** no topo direito.
3. A rota `/api/auth/logout` detecta a conta demo, executa a procedure `fn_reset_demo_tenant_data` e restaura o banco de dados para os valores padrão de fábrica.
4. Faça login novamente: o ambiente estará 100% limpo e pronto para o próximo treinamento!
