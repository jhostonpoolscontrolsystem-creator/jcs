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
| **EX-07** | **Cockpit de Telemetria F1 & LSI ao Vivo** | Diretoria / Master | Estresse de dados em tempo real e cálculo estequiométrico | Tacômetros digitais reagem instantaneamente aos dados; dial analógico acusa se o monólito está em zona corrosiva (< -0.3) ou seguro; séries históricas exibem curvas e correlação climática. |
| **EX-08** | **Disparador Kit Boas-Vindas & Revista VIP** | Master / Diretoria JH | Validar controle de alçada e disparo WhatsApp da Revista VIP | Usuário Master pode disparar para Diretoria e Clientes; Diretoria JH pode disparar apenas para Clientes (bloqueio de envio a si mesma); envio com preview de smartphone e entrega via Evolution API com SLA < 3.2s. |
| **EX-10** | **Cobrança PIX Dinâmica Vencimento Dia 05** | Master | Validar cálculo do plano e geração do QR Code BACEN | Emissão em 1 clique de QR Code e Pix Copia e Cola EMV com vencimento no dia 05 e disparo direto no WhatsApp do síndico. |
| **EX-11** | **Predição LSI + Clima & Hash SHA-256** | Master | Prever agressão ácida antes da perda de brilho mineral | Algoritmo correlaciona LSI, CYA e chuva em 48h emitindo dossiê pericial inviolável com hash criptográfico. |
| **EX-12** | **Despacho Red Flag Técnico & Expedição B2B** | Diretoria JH / Master | Gerenciar alerta nacional remoto e remessa de insumos | Notificação da Engenharia no WhatsApp, tolerância de 48h sem envio físico e avanço de status de entrega com Selo de Garantia Blindada. |

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
   - **WhatsApp Evolution API:** O sistema disparará uma mensagem real via WhatsApp para a Diretoria (configurado no `.env` como `ADMIN_WHATSAPP_NUMBER`) informando o pH crítico e recomendando ação imediata. O envio para parâmetros normais permanece silencioso.

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
   - Apenas ao digitar uma senha com símbolo (ex: `JHoston@2026!`), o acesso ao sistema é liberado.

---

### EXERCÍCIO 6: Telemetria Estilo Fórmula 1 e Séries Históricas
1. **Onde Executar**: Acesse a aba **"Clientes & Telemetria F1"**.
2. **Ação**:
   - Selecione o cliente `Resort Terravista Trancoso` e clique no card da piscina.
   - Observe os **Tacômetros Digitais**: valores de pH, Cloro ppm e Alcalinidade respondem com ponteiros dinâmicos e barras graduadas.
   - Veja o mostrador de **Índice LSI**: avalie se a água está neutra e protetora (-0.3 a +0.3) ou ácida/corrosiva.
   - Mude para a aba **"Série Histórica & Curvas"** dentro do cockpit: observe o gráfico interativo de 7 e 14 dias com as faixas verdes seguras sombreadas e a previsão do tempo no tooltip.
   - Mude para a aba **"Pit Stop Químico"**: confira a prescrição estequiométrica em gramas e kg de insumos sem nenhum ácido prejudicial.
3. **O que Observar**:
   - A experiência visual simula com perfeição um *pit-wall* de Fórmula 1, permitindo tomar decisões periciais em segundos.

---

### EXERCÍCIO 7: Disparador do Kit Boas-Vindas & Revista Digital VIP em PDF
1. **Onde Executar**: No botão dourado **"Kit Boas-Vindas (Revista VIP)"** na barra superior.
2. **Ação**:
   - Logado como **MASTER** (`danielsoutolopes@gmail.com`):
     - Clique em "Kit Boas-Vindas (Revista VIP)".
     - Note que a opção **"Diretoria da JHoston Pools"** está habilitada.
     - Navegue pelas páginas da Revista Digital VIP (Capa com brasão oficial, Telemetria F1 e Manual Ilustrado).
     - Alterne para a aba "Disparador WhatsApp", selecione um dos grupos da lista e dispare o teste.
   - Alterne para o perfil **DIRETORIA_JH** (`joabson@jhostonpools.com.br`):
     - Abra o modal: note que a opção "Diretoria JHoston Pools" está bloqueada com o aviso: `(Apenas Master)`.
     - Tente digitar ou selecionar um ID de Grupo (`@g.us`) e clicar em disparar:
     - **Barreira de Segurança Ativada**: o sistema bloqueia o envio com aviso de que disparo em grupos está autorizado apenas para o Master.
     - Selecione um número individual de cliente e confirme o envio regular.
3. **O que Observar**:
   - Bloqueio imediato da alçada de grupos para a Diretoria e entrega da mensagem acompanhada do link do PDF de 4 páginas de alta fidelidade com brasão da JHoston Pools.

---

### EXERCÍCIO 8: Motor Mensal Autônomo da Revista (Simulação do Cron)
1. **Onde Executar**: No navegador ou terminal, chame o endpoint `GET /api/cron/monthly-magazine`.
2. **Ação**:
   - O cron lê em milissegundos todas as métricas reais do banco Supabase (volume total, curas ativas, LSI médio).
   - Sem usar nenhuma IA externa, calcula e gera a edição do mês com capa oficial, tacômetros e certificado com chave SHA-256.
   - Despacha o exemplar com link direto para download do PDF (`/api/pdf/executive-magazine`) para a Diretoria da JHoston e grupos de engenharia via Evolution API com SLA < 3.2s.
3. **O que Observar**:
   - Resposta com status `200 OK`, `success: true`, `delivered_direct: true` e `delivered_group: true`, garantindo automação mensal perpétua sem custos de tokens.

---

### EXERCÍCIO 9: Geração do Laudo Técnico (PDF - jspdf)
1. **Onde Executar**: No navegador ou via API REST.
2. **Ação**:
   - Faça uma chamada `POST /api/pdf/generate` passando o `log_id` da última manutenção e o `pool_id`.
   - O servidor compilará em milissegundos os parâmetros químicos (pH, Cloro) e a Memória de Cálculo.
3. **O que Observar**:
   - O sistema retornará o arquivo codificado em Base64 para download instantâneo, timbrado com as cores da JHoston Pools e com a avaliação de Garantia Ativa ou Suspensa.

---

### EXERCÍCIO 10: Teste de Emissão & Cobrança PIX com Vencimento Dia 05 (Feature 1.1)
1. **Onde Executar**: Na aba **"Auditoria & Relatórios MASTER"** ➔ Sub-aba **"Gestão de Assinaturas & Degustação 6M"**.
2. **Ação**:
   - Na linha de uma piscina (ex: *Resort Terravista Trancoso*), clique no botão **"PIX Dia 05"**.
   - O modal dinâmico exibe o valor calculado com base no plano contratado (*Pro Executive R$ 29,90* ou *Black Elite R$ 49,90*).
   - Clique em **"Despachar no WhatsApp do Cliente"** ou copie o código Pix EMV Copia e Cola.
3. **O que Observar**:
   - Geração instantânea do payload oficial do BACEN com CRC16 validado e vencimento rigoroso até o dia 05, comprovando a regra de cobrança antecipada contra inadimplência.

---

### EXERCÍCIO 11: Motor Preditivo LSI + Clima & Dossiê Forense SHA-256 (Feature 1.2)
1. **Onde Executar**: No Cockpit Master, na sub-aba de assinaturas.
2. **Ação**:
   - Clique no botão **"IA Forense"** na linha de um ativo.
   - O sistema processa os tensores térmicos de água (29°C), LSI de saturação (-0.72) e previsão pluvial de 32mm em 48h.
3. **O que Observar**:
   - Exibição do tacômetro de risco de corrosão, prescrição estequiométrica de neutralização e carimbo imutável com **Hash SHA-256**. O dossiê blinda a JHoston perante o Código Civil contra acusações infundadas de perda de garantia.

---

### EXERCÍCIO 12: Despacho de Red Flag ao Corpo Técnico e Expedição B2B (Features 2.1 e 2.2)
1. **Onde Executar**: Aba **"Pedidos B2B & Expedição"** e endpoint `/api/alerts/red-zone-technical`.
2. **Ação**:
   - Simule o disparo de um Red Flag crítico (pH 6.3).
   - Verifique que o WhatsApp do Corpo Técnico da JHoston (Joabson e Engenharia) recebe o alerta com a localização e as 48h de tolerância, enquanto o piscineiro do cliente recebe a tele-orientação de campo.
   - Acesse a aba **"Pedidos B2B & Expedição"**: acompanhe o pedido de Barrilha e Cloro gerado pela telemetria, clique em **"Despachar"** e em **"Confirmar Entrega"**.
3. **O que Observar**:
   - Atualização do status com concessão do Selo de Garantia Blindada no histórico do cliente.

---

## 🎯 Conclusão da Demonstração Prática
Ao término destes exercícios, a Diretoria da JHoston Pools constatará que:
* **Nenhum tratador consegue burlar o processo sem ser detectado.**
* **Nenhuma piscina fica sem histórico ou registro de garantia.**
* **A diretoria tem controle absoluto sem depender de telefonemas ou planilhas de papel.**
* **A entrega em PDF de luxo, a revista mensal, a cobrança PIX dia 05 e o ecossistema B2B posicionam a JHoston Pools no mais alto nível de engenharia internacional.**
