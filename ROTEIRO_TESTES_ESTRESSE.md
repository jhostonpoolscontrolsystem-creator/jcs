# 🧪 Roteiro de Testes Práticos & Exercícios de Estresse: JHPCS
### *Guia Passo a Passo de Simulação Extrema e Validação de Resiliência do Sistema*

---

## 🎯 Objetivo dos Exercícios de Estresse
Demonstrar na prática para a **Diretoria da JHoston Pools** que o sistema é **à prova de falhas humanas, fraudes de campo e desvios químicos**, garantindo que a tecnologia protege os revestimentos monolíticos em qualquer cenário crítico.

---

## 📋 Tabela Resumo dos Exercícios de Estresse

| ID | Cenário de Teste | Papel Executor | Objetivo do Estresse | Comportamento Esperado do Sistema |
| :---: | :--- | :--- | :--- | :--- |
| **EX-01** | **Ataque Ácido Imediato (pH 6.2)** | Piscineiro (PWA) | Simular tratador descuidado ou chuvas torrenciais | Alerta visual vermelho vibrante; acionamento de **Red Zone** instantâneo; recomendação de dosagem corretiva de Carbonato/Bicarbonato. |
| **EX-02** | **Tentativa de Uso de Ácido Proibido** | Piscineiro (PWA) | Tratador tenta usar ácido muriático ou limpa pedras | **Bloqueio e advertência mandatória**: o sistema sinaliza que o uso de ácido invalida a garantia de 5 anos da JHoston Pools. |
| **EX-03** | **Falta de Escovação na Cura Submersa** | Piscineiro (PWA) | Tratador tenta concluir visita sem escovar monólito em cura | Flag de não conformidade no prontuário; emissão de aviso para a fiscalização técnica. |
| **EX-04** | **Blecaute de Sinal (Modo 100% Offline)** | Piscineiro (PWA) | Simular piscina em subsolo ou área rural sem sinal 4G/Wi-Fi | O PWA armazena a visita no **IndexedDB local (criptografado)**; ao restabelecer a rede, sincroniza em background sem perder dados nem fotos. |
| **EX-05** | **Disparo em Massa de Relatórios WhatsApp** | Diretoria (Joabson) | Disparo consecutivo para diretoria e clientes | Renderização com preview idêntico ao celular; entrega em menos de 3.2 segundos via Evolution API oficial. |
| **EX-06** | **Troca Obrigatória de Senha Provisória** | Novo Usuário | Usuário tenta manter senha padrão `123456` | **Barreira de segurança**: sistema exige senha forte com mínimo de 6 caracteres e caractere especial (`!@#$%^&*`). |
| **EX-07** | **Tentativa de Fraude de Geolocalização** | Piscineiro (PWA) | Tratador tenta preencher visita longe da piscina | Coleta registra coordenadas reais de GPS do aparelho confrontando com o raio homologado do ativo. |
| **EX-08** | **Cockpit de Telemetria F1 & LSI ao Vivo** | Diretoria / Master | Estresse de dados em tempo real e cálculo estequiométrico | Tacômetros digitais reagem instantaneamente aos dados; dial analógico acusa se o monólito está em zona corrosiva (< -0.3) ou seguro; séries históricas exibem curvas e correlação climática. |

---

## 🚀 Roteiro de Execução Passo a Passo dos Exercícios

### EXERCÍCIO 1: Teste de Estresse Químico — Red Zone por pH Crítico (pH 6.2)
1. **Onde Executar**: Acesse a aba **"PWA Tratador (Mobile)"** (ou abra no celular).
2. **Ação**:
   - Selecione a piscina `Piscina de Areia Monolítica - Hotel Fasano (180 m³)`.
   - Arraste o slider de **pH** intencionalmente para **`6.2`** (condição ácida severa).
   - Arraste o slider de **Cloro** para **`0.5 ppm`**.
3. **O que Observar**:
   - O indicador de pH muda instantaneamente para **vermelho pulsante** com o aviso: `pH Crítico! Risco iminente de corrosão ácida do revestimento`.
   - O motor químico calcula imediatamente a dosagem exata de **Carbonato de Sódio / Barrilha leve** necessária para os 180 m³ da piscina.
4. **Impacto na Diretoria**:
   - Vá para o **"Dashboard JHostonTec"** ou **"Mapa Global"**: a piscina entra na coluna **Alerta Crítico (Red Zone)** na fila de triagem em tempo real!

---

### EXERCÍCIO 2: Teste da Trava Jurídica — Proibição de Ácido Muriático e Limpa Pedras
1. **Onde Executar**: Na aba **"PWA Tratador (Mobile)"**.
2. **Ação**:
   - Na seção de *Checklist Operacional & Segurança*, ative a chave: **"USO DE ÁCIDO / LIMPA PEDRAS"**.
3. **O que Observar**:
   - O sistema dispara uma notificação de alerta máxima: `ATENÇÃO: O uso de ácidos danifica a matriz do monólito e suspende a garantia contratual!`.
   - Fica registrado no log da piscina que o produto proibido foi tentado, resguardando a JHoston Pools de qualquer indenização futura.

---

### EXERCÍCIO 3: Teste de Resiliência de Campo — Modo 100% Offline (72 Horas)
1. **Onde Executar**: Na aba **"PWA Tratador (Mobile)"**.
2. **Ação**:
   - No computador ou celular, abra o Inspecionar (`F12`) ➔ aba `Network` (Rede) ➔ marque `Offline` (ou desligue o Wi-Fi do celular).
3. **O que Observar**:
   - A tarja superior do aplicativo muda automaticamente para **"Modo Offline (72h)"** na cor âmbar.
   - Preencha os dados e clique em **"FINALIZAR TRATAMENTO & VALIDAR GARANTIA"**.
   - O sistema responde: `Coleta armazenada com sucesso no IndexedDB local. O envio será realizado automaticamente assim que restabelecer a conexão.`
4. **Restauração**:
   - Desmarque a opção `Offline` (ligue a internet).
   - O aplicativo detecta a rede e sincroniza a fila acumulada instantaneamente com o banco Supabase na nuvem!

---

### EXERCÍCIO 4: Teste de Disparo Executivo via WhatsApp (Evolution API)
1. **Onde Executar**: Acesse a aba **"Relatórios Diretoria (WhatsApp)"**.
2. **Ação**:
   - Escolha o relatório **"🚨 Auditoria Crítica (Red Zone & Risco)"**.
   - Digite o número de WhatsApp pessoal de um dos presentes (ex: `5511999998888`).
   - Observe o balão de pré-visualização interativo mostrando exatamente o texto que será entregue.
   - Clique em **"Disparar Relatório no WhatsApp"**.
3. **O que Observar**:
   - Em menos de 3.2 segundos o celular do destinatário toca com a mensagem formatada contendo emojis, indicadores de saúde e diagnóstico técnico.

---

### EXERCÍCIO 5: Teste da Barreira de Segurança de Primeiro Acesso
1. **Onde Executar**: No botão de Perfil / Sair ➔ Abrir modal de Login.
2. **Ação**:
   - Tente autenticar com a conta de primeiro acesso `jhostontec@jhostontec.com.br` e senha provisória `123456`.
3. **O que Observar**:
   - O sistema detecta a senha padrão e abre compulsoriamente a tela de **"Redefinição Obrigatória de Senha"**.
   - Se o usuário tentar colocar uma senha fraca como `1234567`, o sistema rejeita: `A senha deve conter ao menos 1 caractere especial (ex: ! @ # $ %).`.
85:    - Apenas ao digitar uma senha com símbolo (ex: `JHoston@2026!`), o acesso ao sistema é liberado.
86: 
87: ---
88: 
89: ### EXERCÍCIO 6: Telemetria Estilo Fórmula 1 e Séries Históricas
90: 1. **Onde Executar**: Acesse a aba **"Clientes & Telemetria F1"**.
91: 2. **Ação**:
92:    - Selecione o cliente `Resort Terravista Trancoso` e clique no card da piscina.
93:    - Observe os **Tacômetros Digitais**: valores de pH, Cloro ppm e Alcalinidade respondem com ponteiros dinâmicos e barras graduadas.
94:    - Veja o mostrador de **Índice LSI**: avalie se a água está neutra e protetora (-0.3 a +0.3) ou ácida/corrosiva.
95:    - Mude para a aba **"Série Histórica & Curvas"** dentro do cockpit: observe o gráfico interativo de 7 e 14 dias com as faixas verdes seguras sombreadas e a previsão do tempo no tooltip.
96:    - Mude para a aba **"Pit Stop Químico"**: confira a prescrição estequiométrica em gramas e kg de insumos sem nenhum ácido prejudicial.
97: 3. **O que Observar**:
98:    - A experiência visual simula com perfeição um *pit-wall* de Fórmula 1, permitindo tomar decisões periciais em segundos.
99: 
100: ---
101: 
102: ## 🎯 Conclusão da Demonstração Prática
Ao término destes exercícios, a Diretoria da JHoston Pools constatará que:
* **Nenhum tratador consegue burlar o processo sem ser detectado.**
* **Nenhuma piscina fica sem histórico ou registro de garantia.**
* **A diretoria tem controle absoluto sem depender de telefonemas ou planilhas de papel.**
