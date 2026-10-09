# Relação Oficial de Usuários Liberados & Credenciais de Acesso
**JHoston Pools Control System (JHPCS)**
*Documento Confidencial de Credenciamento, Níveis RBAC e Segurança*

---

## 1. Visão Geral da Matriz de Acessos
O JHPCS opera sob o modelo de **Controle de Acesso Baseado em Papéis (RBAC)** estruturado em 3 níveis hierárquicos:
1. **Nível 1 - Master (Soberano)**: Controle supremo da plataforma, aprovações, auditoria global e supervisão de telemetria/Evolution API.
2. **Nível 2 - JHoston Pools (Operação Direta)**: Diretoria Executiva e Corpo Técnico/Engenharia da fabricante JHostonTec.
3. **Nível 3 - Cliente Final & Campo**: Gerência de Resorts/Condomínios/Proprietários e Tratadores/Piscineiros credenciados.

---

## 2. Usuários Liberados e Credenciais Ativas

### 👑 NÍVEL 1: USUÁRIOS MASTER (SOBERANO)
Destinado exclusivamente aos gestores supremos da plataforma, com acesso irrestrito ao **Painel MASTER**, governança de usuários, aprovação de contas e auditoria de contratos.

| Nome do Usuário | Perfil / Papel | E-mail de Acesso | Senha Ativa | Status | Escopo de Visão |
|---|---|---|---|---|---|
| **Daniel Lopes** | `MASTER` | `danielsmlopes@hotmail.com` | `Gabriel2006!` *(ou Gabriel2006)* | **Ativo / Liberado** | Acesso Global Total (Master Hub, Dashboard, Usuários, WhatsApp, RBAC, Motor Químico) |
| **Patrícia Grübel** | `MASTER` | `patigrubel@gmail.com` | `Maraca132` | **Ativo / Liberado** | Acesso Global Total (Master Hub, Dashboard, Usuários, WhatsApp, RBAC, Motor Químico) |

> **Como acessar**: Clicar em *"Entrar / Cadastrar"* no topo direito de `https://jcs-pools.vercel.app` (ou `localhost:3000`), inserir o e-mail e a senha correspondente.

---

### 🏢 NÍVEL 2: JHOSTON POOLS (DIRETORIA & CORPO TÉCNICO)
Contas oficiais corporativas da JHoston Pools para homologação técnica, laudos de garantia e despacho de relatórios.

| Nome do Usuário | Perfil / Papel | E-mail de Acesso | Senha Provisória / Padrão | Primeiro Acesso | Escopo de Visão |
|---|---|---|---|---|---|
| **Joabson (Diretoria JH)** | `DIRETORIA_JH` | `jhostontec@jhostontec.com.br` | `123456` | Solicita nova senha forte no 1º login | Dashboard Geral, Gestão de Usuários, Relatórios Executivos WhatsApp, Central de Ajuda e Academia |
| **Responsável Técnico / Gerente Técnico** | `TECNICO_JH` | `tecnico@jhostontec.com.br` | `123456` | Solicita nova senha forte no 1º login | Dashboard Geral, Fila de Triagem Kanban, Mapa Global Leaflet, Motor Químico & Regras, Central de Ajuda |
| **Carlos Oliveira (Auditor Técnico)** | `TECNICO_JH` | `carlos.auditor@jhostontec.com.br` | `123456` | Homologado | Triagem de Red Zones, Emissão de laudos periciais de cura submersa e supervisão de campo |

> **Política de Primeiro Login**: Ao entrar pela primeira vez com a senha provisória `123456`, o sistema abre o modal de redefinição obrigatória exigindo no mínimo 8 caracteres com letras, números e símbolo.

---

### 🏨 NÍVEL 3A: CLIENTES FINAIS (DIRETORIA, GERÊNCIA & CORPO TÉCNICO LOCAL)
Contas dos proprietários, síndicos e gerentes gerais de resorts e condomínios com revestimento monolítico JHostonTec.

| Nome do Estabelecimento / Usuário | Perfil / Papel | E-mail de Acesso | Senha Padrão | Escopo de Visão |
|---|---|---|---|---|
| **Resort Terravista (Gerência Geral)** | `GERENCIA_CLI` | `gerencia@resorterravista.com.br` | `123456` | **Portal do Cliente (Digital Twin)**: Certificado de Garantia de 10 anos, Telemetria da Piscina Olímpica, Runway de Estoque de Insumos e Meteorologia |
| **Hotel Fasano (Engenharia Predial)** | `TECNICO_CLI` | `engenharia@fasano.com.br` | `123456` | **Portal do Cliente**: Monitoramento da Piscina de Areia Monolítica, histórico de testes do tratador e alertas preventivos |

> **Isolamento de Dados (RLS)**: Os clientes enxergam única e exclusivamente as piscinas vinculadas ao seu respectivo contrato, mantendo absoluto sigilo comercial e privacidade (LGPD).

---

### 📱 NÍVEL 3B: PISCINEIROS & TRATADORES DE CAMPO (PWA ISOLADO)
Profissionais de campo credenciados responsáveis pela coleta diária físico-química e escovação mecânica das piscinas.

| Nome do Tratador | Perfil / Papel | CPF Cadastrado | PIN de Segurança | Modo de Acesso | Vínculo / Roteiro |
|---|---|---|---|---|---|
| **João Tratador** | `PISCINEIRO` | `123.456.789-00` | `1234` | **App Isolado `/pwa`** | Resort Terravista & Hotel Fasano (Roteiro diário com câmera nativa e fila offline de 72h) |
| **Tratador Homologado JHoston** | `PISCINEIRO` | Qualquer CPF de teste | `1234` | **App Isolado `/pwa`** | Modo de demonstração / homologação com validação por satélite |

> **Como o Piscineiro acessa**: 
> 1. Abre diretamente no celular: `https://jcs-pools.vercel.app/pwa`
> 2. Toca no botão **"Instalar no Celular"** para adicionar o ícone à tela inicial.
> 3. Digita o **CPF** e o **PIN `1234`**. Não necessita de e-mail ou senha complexa.

---

## 3. Matriz Resumida de Permissões por Usuário

| Módulo do Sistema | MASTER | DIRETORIA_JH | TECNICO_JH | GERENCIA_CLI | TECNICO_CLI | PISCINEIRO |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| **Painel MASTER (Governança)** | ✅ Sim | ❌ Não | ❌ Não | ❌ Não | ❌ Não | ❌ Não |
| **Aprovação de Novos Usuários** | ✅ Sim | ❌ Não | ❌ Não | ❌ Não | ❌ Não | ❌ Não |
| **Dashboard Geral JHostonTec** | ✅ Sim | ✅ Sim | ✅ Sim | ❌ Não | ❌ Não | ❌ Não |
| **Cadastrar Nova Piscina** | ✅ Sim | ✅ Sim | ✅ Sim | ❌ Não | ❌ Não | ❌ Não |
| **Gestão de Usuários** | ✅ Sim | ✅ Sim | ❌ Não | ❌ Não | ❌ Não | ❌ Não |
| **Motor Químico & Regras** | ✅ Sim | 👁️ Leitura | ✅ Sim | ❌ Não | ❌ Não | ❌ Não |
| **Relatórios WhatsApp (Evolution)** | ✅ Sim | ✅ Sim | ❌ Não | ❌ Não | ❌ Não | ❌ Não |
| **Portal do Cliente (Digital Twin)**| ✅ Sim | 👁️ Auditoria | 👁️ Auditoria | ✅ Sim | ✅ Sim | ❌ Não |
| **App do Tratador (PWA /pwa)** | ✅ Sim | 👁️ Simulação | 👁️ Simulação | ❌ Não | ❌ Não | ✅ **Exclusivo** |

---

## 4. Recomendações de Segurança
1. As senhas dos usuários `danielsmlopes@hotmail.com` e `patigrubel@gmail.com` são confidenciais e de uso pessoal e intransferível.
2. Contas corporativas criadas com senha padrão `123456` devem ter a senha alterada logo no primeiro acesso do colaborador.
3. Para revogar ou suspender o acesso de qualquer usuário desligado da empresa, o Master deve acessar a aba **"Gestão de Usuários"** e alterar o status da conta para *Inativo*.

---
*JHoston Pools Control System • Registro de Credenciais & Governança Corporativa*
