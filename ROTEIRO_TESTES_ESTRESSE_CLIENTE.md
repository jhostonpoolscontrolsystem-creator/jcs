# 🧪 Roteiro de Testes de Estresse: Cliente Final (Resorts, Condomínios & Proprietários)
**JHoston Pools Control System (JHPCS)**
*Guia Prático para Validação de Segurança Patrimonial, Auditoria de Garantia e Confiabilidade*

---

## 🎯 Objetivo do Teste para o Cliente Final
Permitir que a **Gerência Geral, Engenharia Predial e Síndicos** testem pessoalmente o sistema em situações extremas, comprovando que:
1. **O Digital Twin da sua piscina reflete a realidade física** sem atrasos.
2. **Nenhum piscineiro consegue forjar visitas ou esconder parâmetros ruins**.
3. **O estoque de produtos químicos nunca zera de surpresa**, mesmo no pico do verão ou feriados.
4. **O patrimônio e o revestimento monolítico estão 100% blindados por garantia jurídica**.

---

## 📋 Tabela Resumo dos Testes de Estresse do Cliente

| ID | Cenário de Teste | Onde Testar | O que Simular | Resultado Esperado |
| :---: | :--- | :--- | :--- | :--- |
| **CL-01** | **Detecção Instantânea de Água Desregulada** | Portal do Cliente | Piscineiro registra pH ácido ou cloro zerado | O score da piscina cai em tempo real, gerando alerta de emergência no WhatsApp da gerência em < 5 seg. |
| **CL-02** | **Alerta Preventivo de Temporal / Chuva Ácida** | Portal do Cliente | Consulta ao satélite meteorológico ao vivo | Sistema avisa sobre chuva iminente e orienta dosagem preventiva de alcalinizante para não turvar a água. |
| **CL-03** | **Estresse de Estoque em Feriado Prolongado** | Loja / Runway B2B | Simular consumo dobrado no feriado | O sistema antecipa o esgotamento dos insumos e oferece compra de reposição antes do bloqueio das transportadoras. |
| **CL-04** | **Auditoria de Presença e Foto do Tratador** | Prontuário Digital | Checagem de visita do piscineiro | Verificação da foto real da água com carimbo de coordenadas de GPS, impedindo visitas "fantasmas". |
| **CL-05** | **Download do Laudo Mensal & Certificado** | Central de Downloads | Baixar o relatório com selo de conformidade | Emissão imediata do laudo pericial mensal para comprovação perante a convenção de condomínio ou diretoria. |

---

## 🚀 Passo a Passo dos Exercícios

### EXERCÍCIO CL-01: Simulação de Desvio Químico e Alerta no WhatsApp
1. **Contexto**: O hotel está cheio no sábado e o tratador detecta pH 6.8 com cloro residual abaixo de 1.0 ppm.
2. **Ação**:
   - Acesse o sistema como `gerencia@resorterravista.com.br` (Portal do Cliente).
   - Observe o cartão **"Score Químico da Piscina"**.
3. **O que Observar**:
   - O indicador de conformidade atualiza imediatamente para estado de **Atenção / Red Zone**.
   - O sistema emite mensagem direta no WhatsApp cadastrado informando o risco de agressão ao monólito e instruindo o procedimento exato de correção, resguardando a segurança dos banhistas.

---

### EXERCÍCIO CL-02: Teste do Escudo Meteorológico (OpenWeather)
1. **Contexto**: Previsão de fortes chuvas de verão para o final de semana.
2. **Ação**:
   - No Portal do Cliente, localize o módulo **"Alerta Meteorológico & Ação Preventiva"**.
3. **O que Observar**:
   - O sistema conecta-se ao satélite meteorológico da cidade do resort.
   - Aponta a umidade, velocidade do vento e probabilidade de chuva ácida.
   - Apresenta o botão **"Recomendação de Tratamento Prévio"**, ensinando a elevar a alcalinidade antes da tempestade para a água não amanhecer verde.

---

### EXERCÍCIO CL-03: Simulação de Ponto Crítico de Estoque no Verão
1. **Contexto**: Em semanas normais, o resort gasta 3 kg de cloro por dia. No Carnaval ou Réveillon, o gasto sobe para 7 kg/dia.
2. **Ação**:
   - Acesse o módulo **"Runway de Estoque & Loja de Insumos"**.
3. **O que Observar**:
   - O indicador de "Dias Restantes" recalcula automaticamente a autonomia.
   - Caso o saldo caia para a margem de segurança (12 a 15 dias, considerando o frete rodoviário de 7 a 10 dias), o sistema destaca o aviso: `⚠️ Reposição Sugerida antes do Feriado`.
   - Permite aprovar o lote de reposição homologado com 1 clique.

---

### EXERCÍCIO CL-04: Auditoria de Idoneidade do Tratador
1. **Contexto**: A gerência quer comprovar se o piscineiro terceirizado realmente esteve no local e se a foto enviada não é antiga.
2. **Ação**:
   - No Portal do Cliente, clique em **"Ver Histórico e Evidências Fotográficas"**.
3. **O que Observar**:
   - A foto da água e da fita reagente possui carimbo indelével de data, hora e coordenadas de satélite (Latitude/Longitude).
   - O sistema bloqueia fotos tiradas da galeria, garantindo que o tratador estava fisicamente na beira da piscina.

---

### EXERCÍCIO CL-05: Validação do Certificado de Garantia de 10 Anos
1. **Contexto**: Reunião de prestação de contas com o condomínio ou diretoria do hotel.
2. **Ação**:
   - Acesse a **"Central de Downloads"** e clique em **"Baixar Laudo Mensal de Garantia (PDF)"**.
3. **O que Observar**:
   - O documento em PDF é gerado na hora com gráficos consolidados, atestado de pH estável e selo de conformidade JHostonTec, comprovando que o revestimento está 100% coberto pela garantia legal da fabricante.

---
*JHoston Pools Control System • Protegendo o seu patrimônio e garantindo água cristalina todos os dias.*
