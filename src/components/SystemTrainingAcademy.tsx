'use client';

import React, { useState } from 'react';
import { 
  GraduationCap, 
  Crown, 
  Briefcase, 
  Wrench, 
  Building2, 
  Smartphone, 
  CheckCircle2, 
  PlayCircle, 
  BookOpen, 
  ShieldCheck, 
  Clock, 
  FileText,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { UserRole } from '@/types/database';

interface CourseModule {
  id: string;
  title: string;
  duration: string;
  description: string;
  keyTopics: string[];
  practicalExercise: string;
  examQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

interface AgentTrack {
  role: UserRole;
  roleTitle: string;
  badge: string;
  badgeColor: string;
  summary: string;
  responsibilities: string[];
  modules: CourseModule[];
}

export function SystemTrainingAcademy({ onSelectTab }: { onSelectTab: (tab: any) => void }) {
  const [selectedRole, setSelectedRole] = useState<UserRole>('MASTER');
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({});
  const [showResults, setShowResults] = useState<{ [key: string]: boolean }>({});

  const tracks: { [key in UserRole]?: AgentTrack } = {
    MASTER: {
      role: 'MASTER',
      roleTitle: 'MASTER (Daniel Lopes - Engenharia & Governança)',
      badge: '👑 Nível 0: Autoridade Máxima',
      badgeColor: 'bg-purple-950/80 text-purple-300 border-purple-800',
      summary: 'Trilha voltada para o administrador supremo. Governança das regras do revestimento monolítico, homologação compulsória de novos usuários, calibração do motor químico e auditoria jurídica de garantia.',
      responsibilities: [
        'Homologar ou recusar novos usuários submetidos pela JHoston ou clientes.',
        'Supervisionar os Digital Twins de todas as piscinas monitoradas.',
        'Gerenciar e acionar instâncias da Evolution API (WhatsApp) e disparos em massa.',
        'Revogar ou restabelecer garantias contratuais de revestimentos suspensos por mau uso.',
      ],
      modules: [
        {
          id: 'm-master-1',
          title: 'Módulo 1: Governança de Usuários & Chave Mestra RBAC',
          duration: '15 min',
          description: 'Como funciona o pipeline de inclusão descentralizada e aprovação centralizada.',
          keyTopics: [
            'Diferença entre o cadastro imediato do Master e cadastros pendentes da equipe/clientes',
            'Como aprovar ou reprovar usuários na Central de Governança',
            'Gestão de senhas criptografadas com bcrypt e chaves JWT',
          ],
          practicalExercise: 'Acesse a aba "Gestão de Usuários", localize os usuários com selo "Aguardando MASTER" e execute a homologação formal.',
          examQuestion: {
            question: 'Quando um Diretor da JHoston ou Gerente de Hotel cadastra um tratador, qual o status inicial da conta no banco Supabase?',
            options: [
              'A conta já nasce Aprovada e com acesso irrestrito.',
              'A conta nasce Pendente (PENDING) aguardando homologação expressa do MASTER.',
              'A conta só é ativada se o tratador pagar uma taxa.',
              'O sistema rejeita automaticamente.'
            ],
            correctIndex: 1,
            explanation: 'Correto! Para preservar a integridade e compliance do sistema, qualquer usuário incluído por terceiros fica retido até o MASTER validar.'
          }
        },
        {
          id: 'm-master-2',
          title: 'Módulo 2: Motor Químico & Regra Letal de Suspensão de Garantia',
          duration: '20 min',
          description: 'A física e química dos revestimentos monolíticos (cura submersa de 28 dias e proibições).',
          keyTopics: [
            'Por que o ácido muriático / limpa pedras destrói a matriz monolítica',
            'pH < 7.0: Red Zone imediata com disparo WhatsApp < 10 segundos',
            'Cálculo estequiométrico preditivo para dosagem de insumos e dedução no estoque',
          ],
          practicalExercise: 'Abra a aba "Motor Químico & Regras" e simule a alteração do pH para 6.8 com uso de ácido para auditar o status WARRANTY_SUSPENDED.',
          examQuestion: {
            question: 'Qual é o impacto imediato no sistema caso um tratador confirme o uso de ácido muriático ou limpa pedras?',
            options: [
              'O sistema apenas emite um aviso informativo.',
              'O status da piscina muda compulsoriamente para WARRANTY_SUSPENDED e a diretoria é alertada via WhatsApp.',
              'O sistema apaga os dados da piscina.',
              'Nenhum impacto químico.'
            ],
            correctIndex: 1,
            explanation: 'Exato! O uso de ácidos fortes corrói a matriz cimentícia monolítica e anula legalmente a garantia JHoston Pools.'
          }
        },
        {
          id: 'm-master-3',
          title: 'Módulo 3: Relatórios Executivos & Disparo Ativo WhatsApp',
          duration: '15 min',
          description: 'Emissão e transmissão de relatórios de auditoria para conselhos e proprietários.',
          keyTopics: [
            'Geração de boletins de Panorama Geral, Red Zone e Autonomia de Estoque',
            'Utilização da Agenda Telefônica dinâmica integrada ao Supabase',
            'Envio manual para qualquer número arbitrário com SLA < 10 segundos',
          ],
          practicalExercise: 'Acesse a aba "Relatórios Diretoria (WhatsApp)", selecione um contato da agenda ou digite um número e dispare o Panorama Geral.',
          examQuestion: {
            question: 'Qual API orquestra a entrega em até 10 segundos das mensagens nos celulares dos diretores e clientes?',
            options: [
              'Email SMTP convencional.',
              'Evolution API (instância WhatsApp conectada ao Render/Webhook).',
              'SMS padrão 2G.',
              'Correios.'
            ],
            correctIndex: 1,
            explanation: 'Perfeito! A Evolution API garante a comunicação bidirecional ativa em tempo real com garantia de SLA.'
          }
        }
      ]
    },
    DIRETORIA_JH: {
      role: 'DIRETORIA_JH',
      roleTitle: 'Diretoria Executiva JHoston Pools',
      badge: '👔 Nível 1: Gestão Operacional JH',
      badgeColor: 'bg-cyan-950/80 text-cyan-300 border-cyan-800',
      summary: 'Trilha focada na gestão executiva de contratos, inclusão de novos clientes e análise de conformidade de toda a carteira de piscinas da empresa.',
      responsibilities: [
        'Cadastrar novos resorts, hotéis e condomínios na plataforma.',
        'Incluir clientes e seus tratadores de campo (submetendo para homologação do Master).',
        'Monitorar métricas de conformidade química de toda a base através do Dashboard JHostonTec.',
        'Despachar laudos de garantia e balanços de estoque via WhatsApp.',
      ],
      modules: [
        {
          id: 'm-dir-1',
          title: 'Módulo 1: Visão Geral do Dashboard JHostonTec & Mapa Global',
          duration: '15 min',
          description: 'Acompanhamento de 128+ ativos através de telemetria em tempo real.',
          keyTopics: [
            'Leitura do mapa interativo Leaflet com marcadores coloridos por gravidade',
            'Identificação de piscinas em cura seca (7 dias) e cura submersa (28 dias)',
            'Interpretação do Health Score de cada cliente',
          ],
          practicalExercise: 'Na aba "Dashboard JHostonTec", clique em uma das piscinas no mapa para inspecionar os parâmetros químicos mais recentes.',
          examQuestion: {
            question: 'O que o marcador Vermelho no mapa global de piscinas representa?',
            options: [
              'Piscina fechada para reforma.',
              'Piscina em Red Zone (parâmetros químicos de alto risco ou ácido detectado).',
              'Piscina com água muito fria.',
              'Piscina sem tratador cadastrado.'
            ],
            correctIndex: 1,
            explanation: 'Correto! Marcador vermelho exige intervenção imediata da equipe técnica para proteger o revestimento.'
          }
        },
        {
          id: 'm-dir-2',
          title: 'Módulo 2: Inclusão Hierárquica de Clientes & Equipes',
          duration: '15 min',
          description: 'Como cadastrar um novo cliente e atribuir as devidas piscinas.',
          keyTopics: [
            'Preenchimento de dados de contato e vinculação de WhatsApp',
            'Submissão do cadastro para validação e aprovação do Master',
            'Orientação do cliente sobre o acesso restrito ao portal dele',
          ],
          practicalExercise: 'Abra a aba "Gestão de Usuários", clique em "+ Incluir Novo Usuário" e cadastre uma nova Gerência de Hotel.',
          examQuestion: {
            question: 'Um membro da Diretoria JH pode cadastrar um novo usuário MASTER no sistema?',
            options: [
              'Sim, sem nenhuma restrição.',
              'Não, a criação de novos Masters é exclusiva do próprio MASTER por segurança.',
              'Sim, mas requer assinatura física.',
              'Apenas se pagar taxa extra.'
            ],
            correctIndex: 1,
            explanation: 'Exato! A hierarquia RBAC bloqueia que diretores criem outros masters.'
          }
        }
      ]
    },
    TECNICO_JH: {
      role: 'TECNICO_JH',
      roleTitle: 'Equipe Técnica Especialista JHoston Pools',
      badge: '🔬 Nível 1: Perícia Técnica & Química',
      badgeColor: 'bg-sky-950/80 text-sky-300 border-sky-800',
      summary: 'Trilha voltada para os químicos e consultores de campo da JHoston. Análise de patologias, dosagens de precisão, suporte aos tratadores e validação de evidências fotográficas.',
      responsibilities: [
        'Analisar evidências fotográficas enviadas pelo PWA (teste de fita, água, bordas).',
        'Validar dosagens de correções químicas propostas pelo motor algorítmico.',
        'Atender chamados de Red Zone e dar suporte técnico via WhatsApp.',
      ],
      modules: [
        {
          id: 'm-tec-1',
          title: 'Módulo 1: Química Fina dos Revestimentos de Areia e Monolíticos',
          duration: '20 min',
          description: 'Equilíbrio ácido-base e prevenção de eflorescência e manchas.',
          keyTopics: [
            'Faixa de pH seguro (7.4 a 7.6) e faixa de alcalinidade ideal (80 a 120 ppm)',
            'Efeito tampão do bicarbonato e prevenção do efeito rebote',
            'Impacto da radiação UV e temperatura na evaporação do cloro livre',
          ],
          practicalExercise: 'Analise a memória de cálculo automática de insumos na aba Motor Químico.',
          examQuestion: {
            question: 'Por que o controle rigoroso da Alcalinidade Total entre 80 e 120 ppm é indispensável?',
            options: [
              'Apenas para deixar a água com cheiro agradável.',
              'Para estabilizar o pH e evitar eflorescências ou desgaste prematuro do revestimento.',
              'Para matar mosquitos.',
              'Não tem nenhuma função química.'
            ],
            correctIndex: 1,
            explanation: 'Correto! A alcalinidade atua como tampão químico contra oscilações de pH.'
          }
        }
      ]
    },
    GERENCIA_CLI: {
      role: 'GERENCIA_CLI',
      roleTitle: 'Gerência do Cliente (Hotéis, Resorts & Condomínios)',
      badge: '🏢 Nível 2: Proprietário do Ativo',
      badgeColor: 'bg-amber-950/80 text-amber-300 border-amber-800',
      summary: 'Trilha para síndicos, diretores de hotéis e proprietários de piscinas. Visualização do Gêmeo Digital, controle do estoque de químicos, aprovação de compras e comprovação de garantia.',
      responsibilities: [
        'Visualizar o Gêmeo Digital da piscina do seu estabelecimento.',
        'Acompanhar os check-ins diários do piscineiro contratado.',
        'Aprovar sugestões de reposição de estoque de produtos químicos.',
        'Incluir seus técnicos internos e seus piscineiros no sistema.',
      ],
      modules: [
        {
          id: 'm-cli-1',
          title: 'Módulo 1: Navegação no Portal do Cliente & Gêmeo Digital',
          duration: '15 min',
          description: 'Acompanhe a saúde da piscina em tempo real sem complexidade.',
          keyTopics: [
            'Como entender o Health Score (0 a 100) da sua piscina',
            'Previsão de estoque (quantos dias o cloro e barrilha ainda vão durar)',
            'Certificados mensais de garantia emitidos pela JHoston Pools',
          ],
          practicalExercise: 'Acesse a aba "Portal Gerência / Cliente" e teste o botão de Aprovação de Compras de Insumos.',
          examQuestion: {
            question: 'O cliente de um resort tem acesso aos dados das piscinas de outros hotéis?',
            options: [
              'Sim, todos os clientes veem tudo.',
              'Não, cada cliente enxerga estritamente os ativos pertencentes ao seu cadastro.',
              'Apenas aos sábados.',
              'Depende do valor do condomínio.'
            ],
            correctIndex: 1,
            explanation: 'Correto! O sistema aplica isolamento estrito de dados por cliente (multi-tenant seguro).'
          }
        },
        {
          id: 'm-cli-2',
          title: 'Módulo 2: Inclusão do seu Piscineiro e Equipe Interna',
          duration: '10 min',
          description: 'Como cadastrar quem cuida da sua piscina para usar o aplicativo móvel.',
          keyTopics: [
            'Cadastro do tratador com CPF e PIN numérico de 4 a 6 dígitos',
            'Submissão do cadastro para homologação do Master',
            'Como orientar o piscineiro a fazer o login no celular',
          ],
          practicalExercise: 'Simule o cadastro de um piscineiro preenchendo CPF e PIN numérico no modal de cadastro.',
          examQuestion: {
            question: 'Qual credencial o piscineiro usa para acessar o aplicativo no celular?',
            options: [
              'Email e senha complexa com caracteres especiais.',
              'Apenas CPF cadastrado + PIN numérico simples (4 a 6 dígitos).',
              'Reconhecimento facial obrigatório.',
              'Chave USB.'
            ],
            correctIndex: 1,
            explanation: 'Perfeito! O login do tratador foi projetado para agilidade em campo via CPF + PIN.'
          }
        }
      ]
    },
    PISCINEIRO: {
      role: 'PISCINEIRO',
      roleTitle: 'Piscineiro / Tratador de Campo (PWA Mobile)',
      badge: '📱 Nível 3: Execução Operacional de Campo',
      badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-800',
      summary: 'Trilha voltada para o profissional que está na borda da piscina. Realização de checklists diários, medição com fitas/reagentes, captura de fotos panorâmicas e operação offline.',
      responsibilities: [
        'Realizar check-in diário por geolocalização na piscina.',
        'Fotografar a fita de teste químico e o aspecto da água com compressão WebP nativa.',
        'Registrar valores de pH, cloro e alcalinidade.',
        'Confirmar escovação e aspiração sem utilizar produtos proibidos.',
      ],
      modules: [
        {
          id: 'm-pis-1',
          title: 'Módulo 1: Checklist Diário Passo a Passo no PWA',
          duration: '10 min',
          description: 'Como preencher o checklist matinal em menos de 2 minutos.',
          keyTopics: [
            'Login rápido no celular com CPF e PIN',
            'Seleção da piscina da rota diária',
            'Captura fotográfica nativa com georreferenciamento e compressão automática',
            'Registro das medições químicas (pH, Cloro, Alcalinidade)',
          ],
          practicalExercise: 'Abra a aba "PWA Tratador (Mobile)", preencha o assistente passo a passo e faça o envio do registro.',
          examQuestion: {
            question: 'Se a internet do celular cair na borda da piscina, o piscineiro perde o trabalho?',
            options: [
              'Sim, o aplicativo trava e perde tudo.',
              'Não, o PWA salva tudo offline no banco IndexedDB do celular e sincroniza quando a rede voltar.',
              'O piscineiro precisa ligar para o suporte imediatamente.',
              'A piscina explode.'
            ],
            correctIndex: 1,
            explanation: 'Correto! A arquitetura Offline-First garante funcionamento contínuo mesmo sem sinal de operadora.'
          }
        }
      ]
    }
  };

  const activeTrack = tracks[selectedRole] || tracks.MASTER!;
  const activeModule = activeTrack.modules[activeModuleIndex] || activeTrack.modules[0];

  const handleSelectAnswer = (moduleId: string, optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [moduleId]: optionIndex }));
    setShowResults(prev => ({ ...prev, [moduleId]: true }));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-800 text-cyan-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-black text-white">Academia JHoston Pools: Treinamento & Certificação por Perfil</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Curso prático completo dividido pela matriz de responsabilidade de cada agente (do MASTER ao Piscineiro de Campo), com avaliações de conhecimento e simulações.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-purple-950/80 text-purple-300 border border-purple-800">
            {activeTrack.badge}
          </span>
        </div>
      </div>

      {/* Role Selector Tabs (Escolha a Trilha de Treinamento) */}
      <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 overflow-x-auto">
        <button
          onClick={() => { setSelectedRole('MASTER'); setActiveModuleIndex(0); }}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${
            selectedRole === 'MASTER' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Crown className="w-4 h-4" /> MASTER (Daniel Lopes)
        </button>

        <button
          onClick={() => { setSelectedRole('DIRETORIA_JH'); setActiveModuleIndex(0); }}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${
            selectedRole === 'DIRETORIA_JH' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-4 h-4" /> Diretoria JHoston
        </button>

        <button
          onClick={() => { setSelectedRole('TECNICO_JH'); setActiveModuleIndex(0); }}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${
            selectedRole === 'TECNICO_JH' ? 'bg-sky-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Wrench className="w-4 h-4" /> Técnico Especialista JH
        </button>

        <button
          onClick={() => { setSelectedRole('GERENCIA_CLI'); setActiveModuleIndex(0); }}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${
            selectedRole === 'GERENCIA_CLI' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Building2 className="w-4 h-4" /> Gerência Cliente
        </button>

        <button
          onClick={() => { setSelectedRole('PISCINEIRO'); setActiveModuleIndex(0); }}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${
            selectedRole === 'PISCINEIRO' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Smartphone className="w-4 h-4" /> Piscineiro (PWA)
        </button>
      </div>

      {/* Main Track Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLUNA ESQUERDA: Sumário da Trilha & Lista de Módulos (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${activeTrack.badgeColor}`}>
                {activeTrack.badge}
              </span>
              <h3 className="font-extrabold text-sm text-white mt-2">{activeTrack.roleTitle}</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{activeTrack.summary}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-300">Principais Atribuições no Sistema:</h4>
              <ul className="space-y-1.5 text-[11px] text-slate-400">
                {activeTrack.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Módulos Disponíveis */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h4 className="font-bold text-xs text-white uppercase tracking-wider">Módulos de Aprendizado:</h4>
            <div className="space-y-2">
              {activeTrack.modules.map((mod, index) => (
                <button
                  key={mod.id}
                  onClick={() => setActiveModuleIndex(index)}
                  className={`w-full p-3 rounded-xl border text-left transition flex items-center justify-between cursor-pointer ${
                    activeModuleIndex === index
                      ? 'border-cyan-500 bg-cyan-950/40 text-white shadow-md'
                      : 'border-slate-800/80 bg-slate-950/40 text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs">{mod.title}</div>
                    <div className="text-[10px] text-cyan-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> {mod.duration}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 shrink-0 text-slate-500" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: Conteúdo do Módulo Ativo & Quiz de Certificação (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-5">
            {/* Header do Módulo */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Módulo Selecionado</span>
                <h3 className="font-black text-base text-white">{activeModule.title}</h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                Duração estimada: {activeModule.duration}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activeModule.description}
            </p>

            {/* Tópicos Abordados */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
              <h4 className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> Conceitos Chave & Procedimentos
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                {activeModule.keyTopics.map((topic, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exercício Prático no Sistema */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/30 to-sky-950/30 border border-cyan-800/40 space-y-2">
              <h4 className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <PlayCircle className="w-4 h-4 text-cyan-400" /> Prática Guiada no Sistema JHPCS
              </h4>
              <p className="text-xs text-slate-300">{activeModule.practicalExercise}</p>
            </div>

            {/* Quiz / Prova de Validação do Módulo */}
            <div className="pt-4 border-t border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-black uppercase tracking-wider text-white">
                  Teste de Certificação Rápida
                </h4>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <p className="text-xs font-semibold text-white">
                  {activeModule.examQuestion.question}
                </p>

                <div className="space-y-2">
                  {activeModule.examQuestion.options.map((option, optIdx) => {
                    const isSelected = selectedAnswers[activeModule.id] === optIdx;
                    const isCorrect = activeModule.examQuestion.correctIndex === optIdx;
                    const answered = showResults[activeModule.id];

                    let btnStyle = 'border-slate-800 bg-slate-900/60 text-slate-300 hover:bg-slate-800';
                    if (answered) {
                      if (isCorrect) {
                        btnStyle = 'border-emerald-500 bg-emerald-950/60 text-emerald-200 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'border-rose-500 bg-rose-950/60 text-rose-200';
                      }
                    } else if (isSelected) {
                      btnStyle = 'border-cyan-500 bg-cyan-950/60 text-cyan-200';
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectAnswer(activeModule.id, optIdx)}
                        className={`w-full p-2.5 rounded-lg border text-left text-xs transition flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <span>{option}</span>
                        {answered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {showResults[activeModule.id] && (
                  <div className={`p-3 rounded-lg text-xs leading-relaxed ${
                    selectedAnswers[activeModule.id] === activeModule.examQuestion.correctIndex
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                  }`}>
                    {activeModule.examQuestion.explanation}
                  </div>
                )}
              </div>
            </div>

            {/* Próximo Módulo */}
            <div className="flex justify-between items-center pt-2">
              <span className="text-[11px] text-slate-500">
                Módulo {activeModuleIndex + 1} de {activeTrack.modules.length}
              </span>

              {activeModuleIndex < activeTrack.modules.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setActiveModuleIndex(prev => prev + 1)}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
                >
                  <span>Próximo Módulo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <div className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Trilha Concluída com Sucesso!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
