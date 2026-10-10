# Manual Operacional do Usuário Master (Soberano)
**JHoston Pools Control System (JHPCS)**
*Documento de Governança Estratégica, Segurança e Auditoria Global*

---

## 1. Perfil e Responsabilidades do Master
O perfil **MASTER** detém a autoridade máxima do sistema JHPCS, reservado aos fundadores e gestores supremos da plataforma (**Daniel Lopes** e **Patrícia Grübel**). 

Suas responsabilidades englobam:
- **Governança de Acessos e Usuários**: Aprovação final e homologação de novos cadastros de Diretores, Técnicos, Clientes Corporativos e Piscineiros de campo.
- **Isolamento de Tenants (Boundary Security)**: Garantir que cada cliente final enxergue exclusivamente suas piscinas e que cada piscineiro (funcionário do cliente) acesse apenas os ativos do seu respectivo empregador.
- **Auditoria Forense Inviolável**: Monitoramento do Livro-Razão de Auditoria (`Audit Logs`), travas antifraude de fotos e registros com geolocalização por satélite (GPS).
- **Controle de Telecomunicações**: Supervisão das instâncias da **Evolution API (WhatsApp)** e garantia do SLA de resposta (< 3.2 segundos).
- **Gestão de Garantias e Red Zones**: Arbitragem de disputas técnicas e auditoria dos laudos periciais de perda de garantia de revestimentos monolíticos JHostonTec.

---

## 2. Como Acessar o Sistema

### 2.1. Endereço de Acesso
- **Ambiente Web / Nuvem**: Acesse o link oficial do sistema através de qualquer navegador moderno:
  `https://jcs-pools.vercel.app` (ou `http://localhost:3000` em ambiente local).

### 2.2. Credenciais de Acesso
1. Na tela inicial, clique no botão **"Entrar / Cadastrar"** no topo superior direito da barra de comando.
2. Insira suas credenciais mestras:
   - **E-mail**: `danielsmlopes@hotmail.com` (ou `patigrubel@gmail.com`)
   - **Senha**: Sua senha mestra definida.
3. Clique em **"Entrar no Sistema"**. O sistema carregará a interface dourada do **Painel MASTER**.

---

## 3. Módulos e Recursos Exclusivos do Master

### 3.1. Cockpit Forense: Auditoria & Relatórios MASTER
Acessível na barra superior pela aba **"Auditoria & Relatórios MASTER"** ou pelo Pilar 3 do **Painel MASTER**:
- **Livro-Razão Forense (Audit Logs)**: Histórico completo em tempo real de logins, alterações, aprovação de operadores e disparos com endereço IP e carimbo de data/hora imutável.
- **Exportação CSV em 1 Clique**: Botão **"Exportar CSV Pericial"** para download da planilha forense integral, compatível com a LGPD e instrução de processos periciais.
- **Matriz Consolidada de Relatórios**: Download e disparo direto do Panorama Geral, Boletim Red Zone, Revista VIP em PDF e Certificado de Garantia.
- **Blindagem Decenal Legal**: Retenção permanente de registros conforme o Código Civil Brasileiro para proteção das garantias da JHoston Pools.

### 3.2. Hub de Governança & Fila de Homologação de Usuários
- **Fila de Aprovação de Novos Operadores**: Visualização de cadastros submetidos por clientes e diretores com botões de homologação imediata.
- **Matriz de Permissões RBAC**: Visualização em tempo real das permissões de leitura, escrita e auditoria para cada perfil hierárquico.
- **Kill Switch (Bloqueio Imediato)**: O Master possui autoridade para revogar instantaneamente credenciais de qualquer usuário ou tratador em caso de desligamento.

### 3.3. Gestão de Clientes e Piscinas (Multi-Tenant)
- **Vinculação de Ativos ao Cliente**: Cadastro de piscinas com associação obrigatória ao `client_id` (empresa/condomínio proprietário).
- **Atribuição de Piscineiros (`pool_maintainers`)**: Definição das piscinas autorizadas para cada tratador, garantindo que funcionários de um condomínio nunca visualizem piscinas de outros estabelecimentos.
- **Emissão de QR Codes de Ativação**: Geração de links e QR Codes para impressão de adesivos destinados à casa de máquinas, viabilizando a instalação do app do piscineiro em 1 toque.

### 3.4. Monitoramento em Tempo Real & Cockpit Telemetria F1 ("Pit Wall")
- **Visão 360° da Carteira**: Acompanhamento dos ativos monitorados, piscinas em Red Zone, obras em período de cura (7 dias seca + 28 dias submersa) e integridade da infraestrutura WhatsApp.
- **Cockpit F1**: Tacômetros digitais, medidor analógico de LSI (Langelier), séries históricas com faixas seguras e correlação meteorológica via OpenWeather.

---

## 4. Diretrizes de Segurança e Boas Práticas
1. **Homologação Criteriosa de Tratadores**: Certifique-se de que o tratador cadastrado pelo cliente final esteja vinculado exclusivamente às piscinas daquele contratante antes da aprovação.
2. **Tratamento de Alertas Red Zone**: Inspecione imediatamente fotos e coordenadas GPS caso ocorram relatos de agressão química (pH < 6.8).
3. **Auditoria Preventiva**: Realize a exportação mensal do Livro-Razão em CSV para arquivamento no repositório de compliance.

---
*JHoston Pools Control System • Governança Suprema, Segurança Jurídica & Tecnologia Monolítica*
