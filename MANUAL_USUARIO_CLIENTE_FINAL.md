# Manual do Usuário Cliente Final (Diretoria, Corpo Técnico & Gestão Local)
**JHoston Pools Control System (JHPCS)**
*Portal de Governança, Proteção de Ativo Patrimonial, Digital Twin, Etiqueta QR & Gestão do Tratador*

---

## 1. Visão Geral para o Cliente Final
Este manual foi elaborado para a equipe de gestão patrimonial do cliente JHoston Pools (Hotéis, Resorts, Condomínios e Residências de Luxo):
- **Diretoria / Síndicos / Proprietários (`CLIENTE_FINAL` / `GERENCIA_CLI`)**: Acompanhamento do status de garantia da piscina (garantia de até 10 anos contra delaminação e manchas), controle de custos de insumos químicos e laudos mensais.
- **Engenharia Predial / Corpo Técnico do Cliente (`TECNICO_CLI`)**: Supervisão do trabalho do seu piscineiro (funcionário contratado), histórico de dosagens e emissão de etiquetas técnicas de campo.

O sistema JHPCS funciona como o **Digital Twin (Gêmeo Digital)** da sua piscina, registrando cada gota de produto, variação climática e intervenção mecânica realizada.

---

## 2. Princípio de Isolamento: O Piscineiro é Seu Funcionário

### 2.1. Privacidade e Segurança Absoluta (Multi-Tenant)
- **Acesso Estrito**: O seu piscineiro terá acesso **única e exclusivamente** às piscinas cadastradas para o seu condomínio ou hotel.
- **Proteção Concorrencial**: Ele nunca verá volumes, fotos, estoque ou dados de nenhum outro hotel, condomínio ou cliente.
- **Cadastramento da Sua Equipe**: Você cadastra os tratadores do seu quadro de funcionários diretamente no sistema.

---

## 3. Nova Central: Aba "Etiqueta Casa de Máquinas (QR)"

Pensando em **eliminar qualquer atrito de digitação ou resistência tecnológica** do seu tratador de campo, a Diretoria do Cliente Final conta agora com uma aba dedicada:

### 3.1. O que é a Etiqueta da Casa de Máquinas?
É uma placa técnica digital oficial com padrão ABNT / JHostonTec que pode ser **impressa diretamente em PDF** (para papel adesivo vinílico ou plastificação) e colada na tampa do filtro ou na porta da casa de máquinas da sua piscina.

### 3.2. Como Gerar e Imprimir a Etiqueta (PDF)
1. No menu superior do sistema, clique na aba **"Etiqueta Casa de Máquinas (QR)"**.
2. No menu suspenso, selecione a piscina desejada (ex.: *Piscina Principal Resort*, *SPA Hidro*).
3. O sistema gera automaticamente o **QR Code de alta resolução** contendo as coordenadas e o ID exclusivo do seu ativo.
4. Clique no botão **"Imprimir Etiqueta (PDF)"**. A janela de impressão do seu computador/celular se abrirá pronta para salvar como PDF ou imprimir.

### 3.3. Disparo Automático via WhatsApp do Tratador
Caso seu tratador ainda não esteja na casa de máquinas:
1. Na mesma tela, insira o número de celular do tratador com DDD (ex.: `5511999998888`).
2. Clique em **"Disparar Link no WhatsApp"**.
3. O sistema enviará instantaneamente uma mensagem oficial via **Evolution API** contendo o link mágico de ativação em 1 toque.

---

## 4. Como Acessar o Portal do Cliente

### 4.1. Endereço de Acesso
- Acesse através do seu computador, tablet ou celular:
  `https://jcs-pools.vercel.app` (ou o link fornecido no seu contrato com a JHoston Pools).

### 4.2. Login
1. Clique no botão **"Entrar / Cadastrar"** no topo da tela.
2. Informe o e-mail corporativo cadastrado (ex.: `gerencia@seuresort.com.br`).
3. Digite sua senha de acesso.
4. O sistema direcionará sua visualização diretamente para as abas liberadas para a sua empresa (**Portal do Cliente (Digital Twin)** e **Etiqueta Casa de Máquinas (QR)**).

---

## 5. Recursos do Portal do Cliente

### 5.1. Visão Geral da Piscina (Digital Twin)
- **Status da Garantia JHostonTec**:
  - Selo verde de **"Garantia Ativa & Protegida"** confirmando conformidade química rigorosa.
- **Score Químico (0 a 100)**:
  - Pontuação de saúde da água calculada com base na estabilidade do pH, cloro livre e alcalinidade.
- **Última Auditoria Registrada**:
  - Data, horário, nome do tratador e coordenadas de GPS comprovando a presença física do profissional no local da piscina.

### 5.2. Histórico de Telemetria e Séries Históricas em Gráfico
- **pH**: Faixa ideal entre 7.2 e 7.6 (evita ressecamento de pele e protege a matriz mineral).
- **Cloro Livre**: Entre 1.5 e 3.0 ppm (desinfecção bactericida sem odor forte).
- **Alcalinidade Total**: Entre 80 e 120 ppm (estabilizador de pH).
- **Índice LSI Langelier**: Medidor de equilíbrio (-0.3 a +0.3) atestando ausência de corrosão e incrustação.
- **Gráficos Históricos**: Curvas de 7 e 14 dias com faixas seguras e correlação com o clima OpenWeather.

### 5.3. Monitoramento de Período de Cura (Para Piscinas Novas)
- O portal exibe o **Cronômetro de Cura Submersa (28 Dias)** com bloqueios preventivos contra o uso indevido de ácidos muriáticos e dosagens de choque.

### 5.4. Previsão Meteorológica Integrada (OpenWeather)
- Previsão de tempestades com dias de antecedência para orientar seu tratador a realizar a cloração preventiva antes das chuvas.

### 5.5. Gestão Preditiva de Estoque de Químicos (Runway de Estoque)
- Cálculo diário de autonomia de cloro e barrilha em dias restantes com botão para reposição antes do estoque zerar.

---

## 6. Relatórios e Alertas via WhatsApp (Evolution API)
- **Alertas Red Zone em Tempo Real**: Notificação imediata para a gerência e tratador caso o pH caia abaixo de 6.8.
- **Laudo Técnico Mensal em PDF**: Emissão do Laudo Pericial assinado com selo JHoston Pools para auditorias de condomínio, seguradoras e vigilância sanitária.

---
*JHoston Pools Control System • Garantia de Excelência e Longevidade Patrimonial*
