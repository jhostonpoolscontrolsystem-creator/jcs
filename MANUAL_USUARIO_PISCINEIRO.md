# Manual do Usuário Piscineiro / Tratador de Campo
**JHoston Pools Control System (JHPCS)**
*Aplicativo de Campo PWA • Coleta Offline, Validação por Foto, Isolamento por Cliente e Ativação por QR Code*

---

## 1. Visão Geral para o Piscineiro
Este manual foi feito especialmente para você, tratador e piscineiro responsável pela manutenção física e química das piscinas com revestimento monolítico da **JHoston Pools**.

O aplicativo **JHPCS Tratador** foi desenvolvido para ser extremamente rápido, prático e funcionar **mesmo quando não há internet ou sinal de celular na beira da piscina**. Com ele, você registra suas medições em menos de 2 minutos, recebe a dosagem exata de cada produto e garante o respaldo do seu trabalho perante o proprietário ou diretoria do seu estabelecimento contratante.

---

## 2. Princípio de Isolamento: Você e o Seu Cliente Final
Como funcionário ou prestador exclusivo do seu cliente final (ex.: condomínio, hotel, resort ou residência):
- **Acesso Estritamente Restrito**: Você enxerga e opera **apenas e tão somente** as piscinas pertencentes ao seu contratante.
- **Privacidade Absoluta**: Nenhuma piscina ou dado de outros condomínios ou hotéis aparecerá no seu aplicativo.
- **Roteiro Focado**: No seletor diário, estarão listadas unicamente as piscinas sob sua responsabilidade direta (ex.: *Piscina Adulto*, *SPA Hidro* do seu condomínio).

---

## 3. Como Instalar o Aplicativo no Celular com Facilidade

Não é necessário procurar em lojas como Google Play ou Apple Store. Existem **3 maneiras simples e imediatas** para colocar o app na tela do seu celular:

### 3.1. Método 1: Apontar a Câmera para o QR Code da Casa de Máquinas (Recomendado)
1. Na porta da casa de máquinas ou na tampa do filtro da piscina existe um adesivo oficial **"JHPCS Tratador - QR Code de Ativação"**.
2. Abra a câmera comum do seu celular e aponte para o QR Code.
3. Toque no link que surgir na tela. O aplicativo se abrirá já reconhecendo o seu condomínio/piscina com o botão verde **"Instalar Aplicativo no Celular"**.
4. Toque em instalar e pronto: o ícone do JHPCS Tratador aparecerá junto com seus outros aplicativos!

### 3.2. Método 2: Convite Direto no seu WhatsApp
1. A administração do seu cliente ou a JHostonTec envia uma mensagem no seu WhatsApp contendo o seu link exclusivo de ativação.
2. Ao tocar no link, o navegador abre a tela de campo e exibe o botão **"Instalar no Celular"**.

### 3.3. Método 3: Instalação Manual via Navegador
- **No Android (Google Chrome)**:
  1. Acesse o endereço do PWA: `https://jcs-pools.vercel.app/pwa`.
  2. Toque no botão **"Instalar no Celular"** no topo da tela.
  3. *(Ou toque nos 3 pontinhos `⋮` no canto superior direito e escolha "Instalar aplicativo" ou "Adicionar à tela inicial")*.
- **No iPhone (Apple Safari)**:
  1. Acesse `https://jcs-pools.vercel.app/pwa`.
  2. Toque no botão de compartilhar (o quadrado com uma seta para cima `⬆` na barra inferior).
  3. Escolha **"Adicionar à Tela de Início"** e toque em **"Adicionar"**.

---

## 4. Como Fazer o Login no Aplicativo
Para não perder tempo digitando senhas longas no sol da beira da piscina:
1. Digite o seu **CPF** (ex.: `123.456.789-00`).
2. Digite o seu **PIN de 4 Dígitos** (fornecido pela administração do cliente ou use o PIN inicial de teste `1234`).
3. Toque no botão **"Acessar Roteiro do Dia"**.
4. O aplicativo carrega imediatamente apenas as piscinas do seu condomínio/cliente.

---

## 5. Passo a Passo da Rotina Diária de Campo (2 Minutos)

### Passo 1: Selecionar a Piscina do Dia
- No menu no topo, selecione qual piscina do seu cliente você está tratando.
- O app exibe o volume em $m^3$ e as coordenadas de conferência por satélite (GPS).

### Passo 2: Coleta dos Parâmetros Químicos
Após realizar o teste da água com seu estojo de teste ou fita reagente:
- **pH**: Ajuste no controle deslizante ou digite (alvo ideal: `7.4` a `7.6`).
- **Cloro Livre (ppm)**: Informe o teor de cloro (ideal: `1.5` a `3.0 ppm`).
- **Alcalinidade Total (ppm)**: Informe o valor (ideal: `80` a `120 ppm`).
- **Dureza Cálcica (ppm)**: Informe o valor encontrado.

### Passo 3: Checklist Físico e Operacional
- [x] **Superfície Totalmente Escovada**: Essencial para a cura e brilho do revestimento monolítico.
- [x] **Retrolavagem do Filtro Realizada**: Confirme se realizou a limpeza da areia/elemento filtrante.
- [ ] **Utilização de Ácido**: ATENÇÃO: Marque somente se aplicou produto redutor. *(Lembre-se: em revestimentos novos nos primeiros 28 dias de cura, o uso de ácido é estritamente proibido!)*.

### Passo 4: Registro Fotográfico em Tempo Real (Câmera com GPS)
1. Toque em **"Tirar Foto Panorâmica da Piscina"**: A câmera do celular se abrirá. Enquadre a piscina limpa e capture a foto.
2. Toque em **"Tirar Foto do Teste Químico"**: Fotografe a fita ou tubo de ensaio ao lado da escala de cores.
3. **Compressão WebP e Nuvem:** As imagens são comprimidas em **WebP (economia de 95% da sua internet móvel)** e enviadas de forma criptografada para o **Supabase Storage**. Fotos salvas previamente na galeria não são aceitas para resguardar a validade do seu trabalho.

### Passo 5: Enviar Registro
1. Marque o termo de aceite de responsabilidade operacional.
2. Toque no botão verde **"Enviar Registro e Validar Garantia"**.

---

## 6. Como Funciona a Operação Offline (Sem Internet / Sem Sinal)
- Em locais sem sinal de celular (casas de máquinas em subsolo ou áreas afastadas), o aplicativo ativará a tarja amarela: **"Modo Offline (72h)"**.
- Você pode preencher todo o laudo e tirar as fotos normalmente! O aplicativo salvará tudo com segurança na memória interna do celular (IndexedDB).
- Ao retornar a uma área com sinal Wi-Fi ou 4G, basta abrir o app e tocar em **"Sincronizar Agora"** para descarregar os registros na nuvem.

---

## 7. O Que Fazer em Caso de Alerta "Red Zone"
- Se ao registrar os parâmetros a piscina entrar em **Red Zone** (ex.: pH perigosamente ácido < 7.0):
  1. Leia a dosagem recomendada pela calculadora da JHostonTec exibida na tela.
  2. Aplique a quantidade indicada de Barrilha Leve (Alcalinizante).
  3. Não utilize produtos clandestinos ou ácidos fortes.
  4. **Aviso Automático:** A diretoria do seu cliente e a engenharia da JHoston Pools receberão um aviso de suporte no WhatsApp via **Evolution API** para auxiliá-lo imediatamente.

---
*JHoston Pools Control System • Respaldo profissional para o tratador e proteção para o patrimônio!*
