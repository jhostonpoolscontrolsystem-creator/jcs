# 🎯 MANUAL DE APRESENTAÇÃO COMERCIAL & SALES SCRIPT (15 MINUTOS)
### *JHoston Pools Control System (JHPCS) • A Plataforma Operacional Definitiva da Cadeia Aquática*
**Governança & Arquitetura**: Daniel Lopes & Patrícia Grübel  
**Versão**: 2026.11 • Homologado para Diretores Comerciais e Equipe de Expansão

---

## 📌 1. Visão Geral do Modelo de Negócio

O **JHPCS** nasceu na engenharia pericial de revestimentos monolíticos e evoluiu para o **Sistema Operacional Completo do Mercado de Piscinas no Brasil**.

### Os Pilares Estratégicos que Fecham Vendas:
1. **SaaS Modular (Pague pelo que usar)**: Cada setor (Tratador, Frota, Condomínio, Loja ou Construtor) contrata apenas o que precisa, com expansão por add-ons.
2. **Custo Zero de Servidores & Egress Gratuito**: Armazenamento ilimitado de fotos de vistorias no **Cloudflare R2**, sem taxas ocultas de download.
3. **Isolamento Estrito & LGPD Privacy Guard**: Cada cliente enxerga apenas seus dados. O Super Administrador audita a integridade físico-química da água sem jamais expor dados pessoais sensíveis ou preços de terceiros.
4. **Resiliência 100/100**: Sistema certificado com Circuit Breaker, failover e banco Supabase protegido contra inatividade.

---

## 🔑 2. Credenciais de Acesso Rápido para Demonstrações

Todos os ambientes de demonstração contam com **Auto-Reset no Logout** (qualquer alteração feita no pitch é revertida automaticamente ao sair):

| Setor Alvo | Perfil Demo | E-mail de Demonstração | Senha | Plano Ativo |
| :--- | :--- | :--- | :---: | :---: |
| **Tratador Autônomo** | Prestador Solo (10 a 50 piscinas) | `teste.solo@teste.com` | `teste123` | **SOLO** (R$ 49,90) |
| **Empresas & Prestadoras** | Frotas & Equipes Técnicas | `teste.frota@teste.com` | `teste123` | **FLEET** (R$ 189,90) |
| **Condomínios & Resorts** | Facility & Governança Predial | `teste.facility@teste.com` | `teste123` | **FACILITY** (R$ 290,00) |
| **Lojas & Revendas** | Balcão de Diagnóstico & Vendas | `teste.loja@teste.com` | `teste123` | **RETAIL** (R$ 149,00) |
| **Fabricantes & Construtores** | Auditoria Pericial & Garantia | `teste.jhoston@teste.com` | `teste123` | **ENTERPRISE** (R$ 990,00) |

---

## ⏱️ 3. Roteiro 1: Pitch para o Tratador Autônomo (Plano SOLO - 3 Minutos)

**Objetivo**: Mostrar como o tratador dobra seu valor percebido, cobra mais caro e economiza 1 hora por dia.

- **Minuto 1: A Dor do Caderninho**:
  > *"Você ainda anota medições em papel ou manda fotos soltas no WhatsApp do cliente? Se a água ficar verde ou a pastilha soltar, a culpa sempre cai em você."*
- **Minuto 2: A Solução na Prática (Login: `teste.solo@teste.com`)**:
  - Abra o **App de Campo (PWA)** no celular ou navegador.
  - Selecione a *"Casa Família Silva"*.
  - Mostre o cálculo automático de **ISL Multi-Substrato** (alertando sobre agressividade da água antes que ela estrague o vinil ou fibra).
  - Tire uma foto do teste: compressão imediata em WebP e upload para o Cloudflare R2 com carimbo de GPS e data/hora inviolável.
- **Minuto 3: O Fechamento com Marca Própria (White-Label)**:
  - Clique em **"Enviar Relatório WhatsApp"**: O cliente recebe um laudo profissional com a logomarca do próprio tratador.
  - **Preço**: *"Apenas R$ 49,90/mês para até 30 piscinas. Menos de R$ 1,70 por piscina para você ter um laudo pericial que te protege de qualquer processo."*

---

## ⏱️ 4. Roteiro 2: Pitch para Empresas de Manutenção & Frotas (Plano FLEET - 4 Minutos)

**Objetivo**: Mostrar ao dono da prestadora como eliminar desvios de produtos químicos na caminhonete e auditar seus funcionários.

- **Minuto 1: A Dor do Estoque e dos Funcionários**:
  > *"Quantos quilos de cloro somem da sua van todo mês? E como você garante que seu técnico realmente visitou o condomínio às 08h e escovou a piscina?"*
- **Minuto 2: A Solução de Estoque Volante (Login: `teste.frota@teste.com`)**:
  - Acesse o painel e mostre a caminhonete placa `BRA-2026`.
  - Explique a **Baixa Estequiométrica Automática**: Ao informar o volume da piscina (ex: 120m³) e a dosagem corretiva, o sistema debita automaticamente os quilos de dicloro e barrilha do veículo. Acaba o desperdício!
- **Minuto 3: Geofencing por GPS (50m)**:
  - Mostre que o técnico não consegue dar check-in se estiver a mais de 50 metros da borda da piscina.
- **Minuto 4: Fechamento**:
  - **Preço**: *"Plano FLEET: R$ 189,90/mês para até 150 piscinas e 5 veículos. Se evitar o desperdício de 2 baldes de cloro por mês, o sistema já se pagou três vezes."*

---

## ⏱️ 5. Roteiro 3: Pitch para Hotéis, Clubes e Condomínios (Plano FACILITY - 4 Minutos)

**Objetivo**: Eliminar o risco de interdição pela Vigilância Sanitária e processos civis de síndicos e hoteleiros.

- **Minuto 1: A Dor Regulatória**:
  > *"A NBR 10.818 e as portarias da Anvisa exigem controle rigoroso da água por turno. Se um hóspede contrair uma micose ou otite na piscina do hotel, a multa e o dano de imagem são irreparáveis."*
- **Minuto 2: Demonstração do Logbook Digital (Login: `teste.facility@teste.com`)**:
  - Acesse [`/logbook-sanitario`](file:///C:/JHPCS/src/app/logbook-sanitario/page.tsx).
  - Mostre os turnos: **Manhã (07h)**, **Tarde (13h)** e **Noite (19h)**.
  - Insira os parâmetros: pH, Cloro Livre, Cloro Combinado e Carga de Banhistas.
  - O sistema audita instantaneamente se a piscina está em conformidade ou em risco sanitário.
- **Minuto 3: Impressão do Livro Pericial**:
  - Clique em **"Imprimir Livro Anvisa"**: Uma folha de registros oficial e diagramada sai pronta para o fiscal assinar na recepção.
- **Minuto 4: Fechamento**:
  - **Preço**: *"Plano FACILITY: R$ 290,00/mês com operadores ilimitados e histórico perene inviolável."*

---

## ⏱️ 6. Roteiro 4: Pitch para Lojas e Revendas de Químicos (Plano RETAIL - 4 Minutos)

**Objetivo**: Aumentar o ticket médio da loja física e transformar atendentes comuns em consultores químicos de elite.

- **Minuto 1: A Dor do Balconista**:
  > *"O cliente entra na sua loja com uma garrafinha d'água turva. Seu vendedor chuta um produto qualquer ou vende só um clarificante barato de R$ 20,00."*
- **Minuto 2: Demonstração do Receituário de Balcão (Login: `teste.loja@teste.com`)**:
  - Acesse [`/trade/balcao`](file:///C:/JHPCS/src/app/trade/balcao/page.tsx).
  - Digite os dados da fita de teste: pH 6.8, Alcalinidade 60ppm, Volume 45m³ e selecione o tipo de acabamento (Fibra, Vinil ou Monolítico).
  - Clique em **"Gerar Receituário Express"**: Em 1 segundo, o sistema gera a cesta de produtos exata (ex: Barrilha Leve + Cloro + Algicida = R$ 184,50).
- **Minuto 3: Checkout PIX Instantâneo & Impressão 80mm**:
  - Mostre o **QR Code PIX Copia e Cola** gerado direto na tela: o cliente aponta o celular e paga na hora, caindo na conta direta do lojista (sem taxas de maquininha!).
  - Clique em **"Imprimir Receituário"**: Imprime na impressora térmica de cupom o passo a passo de como o cliente aplica os produtos na piscina ao chegar em casa.
- **Minuto 4: Fechamento**:
  - **Preço**: *"Plano RETAIL: R$ 149,00/mês por balcão. O lojista recupera essa assinatura no primeiro dia apenas com o aumento de vendas cruzadas de químicos!"*

---

## ⏱️ 7. Roteiro 5: A Chancela Pericial JHoston (Plano ENTERPRISE GUARANTEE)

**Para Fabricantes, Aplicadores de Monolítico e Construtoras**:
- **A Grande Fraude do Mercado**: O cliente contrata uma piscina de areia compactada de alto padrão (R$ 80.000 a R$ 250.000). Um piscineiro despreparado despeja baldes de ácido muriático, corrói a matriz mineral e o proprietário aciona a construtora exigindo garantia decenal!
- **A Blindagem Inviolável (Login: `teste.jhoston@teste.com`)**:
  - Abra a piscina anômala da demonstração: *"Mansão Quinta da Baroneza"*.
  - Mostre o alerta vermelho: **ISL = -0.72 (Água Corrosiva)** com aplicação flagrada de ácido muriático.
  - Clique em **"Emitir Laudo Pericial"**: O documento comprova a quebra contratual por negligência do tratador, livrando a construtora de custos indevidos de reparo de R$ 60.000+.

---

## 📊 8. Tabela Geral de Planos, Limites e Add-ons

| Recurso / Módulo | SOLO (R$ 49,90) | FLEET (R$ 189,90) | FACILITY (R$ 290,00) | RETAIL (R$ 149,00) | ENTERPRISE (R$ 990,00) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Limite de Piscinas** | Até 30 | Até 150 | Até 10 complexos | N/A (Balcão) | Ilimitado |
| **Assentos de Usuários** | 1 técnico | 5 operadores | 8 operadores | 3 atendentes | Ilimitado |
| **PWA de Campo Offline** | ✅ Incluso | ✅ Incluso | ✅ Incluso | Opcional | ✅ Incluso |
| **Cálculo ISL Multi-Substrato** | ✅ Incluso | ✅ Incluso | ✅ Incluso | ✅ Incluso | ✅ Incluso |
| **Fotos Cloudflare R2** | ✅ Incluso | ✅ Incluso | ✅ Incluso | N/A | ✅ Incluso |
| **Baixa de Estoque Volante** | Add-on (+R$ 49,90) | ✅ Incluso | Add-on (+R$ 49,90) | N/A | ✅ Incluso |
| **Geofencing GPS (50m)** | Opcional | ✅ Incluso | ✅ Incluso | N/A | ✅ Incluso |
| **Logbook Sanitário Anvisa** | Add-on (+R$ 89,90) | Add-on (+R$ 89,90) | ✅ Incluso | N/A | ✅ Incluso |
| **Receituário Balcão & PIX** | Add-on (+R$ 69,90) | Add-on (+R$ 69,90) | N/A | ✅ Incluso | ✅ Incluso |
| **Auditoria Pericial Decenal** | N/A | N/A | N/A | N/A | ✅ Incluso |
| **Excedente de Piscina** | R$ 1,50/un | R$ 1,20/un | R$ 15,00/un | N/A | R$ 0,00 |
| **Excedente de Usuário** | N/A | R$ 25,00/mês | R$ 15,00/mês | R$ 20,00/mês | R$ 0,00 |

---

*JHoston Pools Control System • Tecnologia, Perícia Química e Lucratividade para a Cadeia Aquática.*
