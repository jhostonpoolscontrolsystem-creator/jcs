'use client';

import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  BookOpen, 
  ShieldAlert, 
  Smartphone, 
  Users, 
  FileText, 
  Layers, 
  Send, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Droplet, 
  Lock, 
  Key, 
  ChevronRight, 
  ChevronDown, 
  ExternalLink,
  MessageSquare,
  Sparkles,
  PhoneCall,
  Flame,
  Info
} from 'lucide-react';
import { UserRole } from '@/types/database';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  tags: string[];
}

interface HelpSection {
  id: string;
  title: string;
  icon: any;
  badge: string;
  summary: string;
  topics: {
    title: string;
    description: string;
    stepByStep?: string[];
    importantNotice?: string;
  }[];
  faqs: FAQItem[];
}

export function SystemHelpCenter({ onNavigateTab }: { onNavigateTab: (tab: any) => void }) {
  const [activeSectionId, setActiveSectionId] = useState<string>('primeiros_passos');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  const sections: HelpSection[] = [
    {
      id: 'primeiros_passos',
      title: 'Primeiros Passos & Visão Geral',
      icon: BookOpen,
      badge: 'Início Rápido',
      summary: 'Entenda como o JHPCS (JHoston Pools Control System) protege o investimento de revestimentos monolíticos de alta durabilidade e unifica a operação entre diretoria, clientes e tratadores.',
      topics: [
        {
          title: 'O Que é o JHPCS?',
          description: 'O JHPCS é uma plataforma serverless e mobile de auditoria química contínua. Ele conecta a telemetria diária de campo, os Digital Twins (Gêmeos Digitais) dos tanques, a gestão de estoque inteligente e a comprovação jurídica para validade do Termo de Garantia da JHoston Pools.',
          stepByStep: [
            'Faça login com seu perfil correspondente (Master, Diretoria, Técnico, Cliente ou Piscineiro).',
            'No primeiro acesso com senha provisória "123456", redefina obrigatoriamente para uma senha forte com caractere especial.',
            'Navegue pelas abas contextuais liberadas exclusivamente para seu nível hierárquico.',
          ]
        },
        {
          title: 'Estrutura dos 3 Níveis de Acesso (RBAC)',
          description: 'Para garantir privacidade absoluta e integridade legal, o sistema é dividido em três camadas rígidas:',
          stepByStep: [
            'Nível 1 (JHoston Pools Interno): MASTER (Daniel Lopes e Patrícia Grübel), Diretoria JH (Joabson) e Responsável Técnico / Químico.',
            'Nível 2 (Clientes & Estabelecimentos): Gerência Geral de Hotéis/Resorts e Manutenção Interna.',
            'Nível 3 (Campo Operacional): Piscineiros e Prestadores credenciados com PWA Mobile.'
          ],
          importantNotice: 'Clientes nunca conseguem visualizar dados ou estoques de outros estabelecimentos concorrentes (Isolamento Multi-Tenant seguro).'
        }
      ],
      faqs: [
        {
          id: 'faq-1',
          question: 'Como faço para recuperar ou trocar minha senha de acesso?',
          answer: 'Caso você use a senha provisória 123456, o sistema solicitará automaticamente a troca no login. Você também pode solicitar a redefinição direta ao MASTER Daniel Lopes ou Patrícia.',
          tags: ['login', 'senha', 'recuperação']
        },
        {
          id: 'faq-2',
          question: 'O sistema funciona em computadores e celulares?',
          answer: 'Sim! O sistema é 100% responsivo e conta com tecnologia PWA (Progressive Web App) que pode ser instalado como aplicativo nativo na tela inicial do celular Android ou iPhone.',
          tags: ['dispositivos', 'mobile', 'celular', 'pwa']
        }
      ]
    },
    {
      id: 'governanca_usuarios',
      title: 'Controle de Usuários & Aprovação MASTER',
      icon: Users,
      badge: 'Governança & Segurança',
      summary: 'Regras de inclusão hierárquica e a chave mestra de homologação do MASTER.',
      topics: [
        {
          title: 'Quem pode cadastrar novos usuários no sistema?',
          description: 'A política de governança da JHoston Pools permite a inclusão descentralizada para dar agilidade, mantendo a aprovação centralizada:',
          stepByStep: [
            'O MASTER pode cadastrar e ativar imediatamente qualquer usuário.',
            'Membros da JHoston (Diretoria e Técnicos) podem cadastrar Clientes e Piscineiros (nascem pendentes).',
            'O Cliente (Gerência) pode cadastrar apenas sua equipe interna de técnicos e piscineiros (nascem pendentes).',
            'Apenas o MASTER (Daniel e Patrícia) possui o botão para APROVAR e autorizar o login definitivo.'
          ]
        },
        {
          title: 'Fila de Homologação MASTER',
          description: 'Na aba "Gestão de Usuários", os administradores Master possuem uma fila em destaque indicando usuários pendentes com botões de "Aprovar" e "Recusar".',
          importantNotice: 'Usuários pendentes não conseguem logar nem consultar relatórios até receberem o status APROVADO.'
        }
      ],
      faqs: [
        {
          id: 'faq-3',
          question: 'Por que o piscineiro cadastrado pelo hotel não consegue logar imediatamente?',
          answer: 'Porque todo usuário cadastrado por terceiros exige homologação expressa do MASTER no painel de governança para prevenir acessos não autorizados.',
          tags: ['cadastro', 'piscineiro', 'homologação', 'master']
        }
      ]
    },
    {
      id: 'motor_quimico_garantia',
      title: 'Motor Químico & Regras de Garantia',
      icon: ShieldAlert,
      badge: 'Engenharia de Materiais',
      summary: 'Entenda os limites de pH, alcalinidade, cura submersa de 28 dias e a Regra Letal de suspensão de garantia por uso de ácidos.',
      topics: [
        {
          title: 'A Regra Letal de Proibição de Ácidos',
          description: 'Revestimentos cimentícios monolíticos e piscinas de areia possuem matriz mineral delicada. O uso de Ácido Muriático, Limpa Pedras ou desincrustantes agressivos provoca corrosão irreversível.',
          importantNotice: 'Se qualquer checklist de piscineiro ou auditoria técnica acusar o uso de ácidos fortes, o status da piscina é compulsoriamente alterado para WARRANTY_SUSPENDED (Garantia Suspensa).'
        },
        {
          title: 'Parâmetros Físico-Químicos Obrigatórios',
          description: 'Para manter o Certificado de Garantia ativo, a água deve respeitar:',
          stepByStep: [
            'pH Ideal: 7.4 a 7.6. Se for inferior a 7.0, a piscina entra em Red Zone por risco de corrosão.',
            'Alcalinidade Total: 80 a 120 ppm. É o "efeito tampão" que impede variações bruscas de pH e eflorescências.',
            'Cloro Livre: 1.0 a 3.0 ppm. Garante desinfecção completa sem descoloração da superfície monolítica.'
          ]
        },
        {
          title: 'Cura Submersa dos 28 Dias',
          description: 'Piscinas recém-aplicadas passam por 7 dias de cura a seco e 28 dias de cura submersa contínua. Durante esse período, o acompanhamento diário é vital para evitar calcificação precoce.'
        }
      ],
      faqs: [
        {
          id: 'faq-4',
          question: 'O que fazer se a piscina entrar em Red Zone?',
          answer: 'O sistema dispara um alerta via WhatsApp em menos de 10 segundos. O tratador deve aplicar a dosagem indicada de Barrilha Leve (Alcalinizante) calculada automaticamente pelo sistema com base no volume em m³ da piscina.',
          tags: ['red zone', 'ph', 'alcalinizante', 'barrilha']
        }
      ]
    },
    {
      id: 'pwa_piscineiro',
      title: 'PWA Mobile do Piscineiro (Offline-First)',
      icon: Smartphone,
      badge: 'Operação de Campo',
      summary: 'Manual de uso do aplicativo de campo do tratador: check-in por GPS, fotos de fita de teste e operação sem internet.',
      topics: [
        {
          title: 'Como o Piscineiro Acessa o Sistema?',
          description: 'O tratador de campo não precisa de senhas complexas. Ele acessa através da aba PWA Tratador inserindo seu CPF e um PIN numérico simples de 4 a 6 dígitos cadastrado previamente.'
        },
        {
          title: 'Passo a Passo do Checklist Diário',
          description: 'Rotina de 2 minutos na borda da piscina:',
          stepByStep: [
            'Etapa 1: Check-in com captura automática de GPS.',
            'Etapa 2: Captura das fotos (Panorâmica da Piscina e Fita de Medição da Água). O sistema comprime as imagens em WebP nativo no próprio celular economizando 95% do plano de dados.',
            'Etapa 3: Lançamento dos dados de pH, Cloro e Alcalinidade.',
            'Etapa 4: Confirmação de escovação e aspiração sem uso de ácidos.',
            'Etapa 5: Envio e validação da conformidade.'
          ]
        },
        {
          title: 'Funcionamento Offline (Sem Sinal de Celular)',
          description: 'Caso a piscina esteja em local sem sinal de internet (subsolo de hotel ou área rural), o PWA salva todas as fotos e medições no banco local IndexedDB do aparelho e realiza o envio automático assim que a conexão 4G/Wi-Fi for restabelecida.'
        }
      ],
      faqs: [
        {
          id: 'faq-5',
          question: 'O piscineiro pode fraudar a foto pegando uma imagem da internet?',
          answer: 'Não. O sistema registra o timestamp, as coordenadas de GPS do momento exato do clique e bloqueia o checklist se a localização divergir do raio da piscina cadastrada.',
          tags: ['fraude', 'foto', 'gps', 'segurança']
        }
      ]
    },
    {
      id: 'portal_cliente',
      title: 'Portal do Cliente & Gêmeo Digital',
      icon: Layers,
      badge: 'Hotéis, Resorts & Síndicos',
      summary: 'Como proprietários e gerentes de hotéis acompanham a saúde da piscina, estoque e aprovam compras de produtos.',
      topics: [
        {
          title: 'Visualização do Gêmeo Digital',
          description: 'O Digital Twin exibe o status 3D virtual da piscina: volume total de água (m³), vazão de bombas (m³/h), histórico de medições e o Health Score de 0 a 100.'
        },
        {
          title: 'Autonomia Preditiva de Estoque & Compras',
          description: 'Com base no volume da piscina e nos tratamentos realizados, o sistema estima quantos dias de cloro e barrilha ainda restam no almoxarifado do hotel.',
          stepByStep: [
            'Acompanhe o indicador de "Dias Restantes de Estoque".',
            'Quando o estoque estiver baixo, o sistema sugere o lote exato de reposição.',
            'O gerente clica no botão "Aprovar Compra de Insumos" para despachar o pedido diretamente à JHoston Pools.'
          ]
        }
      ],
      faqs: [
        {
          id: 'faq-6',
          question: 'Onde encontro o certificado de garantia mensal da minha piscina?',
          answer: 'Na aba do Portal do Cliente existe a seção de "Certificado de Garantia Contratual", onde é possível emitir ou baixar o relatório mensal em PDF com carimbo de conformidade.',
          tags: ['certificado', 'garantia', 'pdf', 'cliente']
        }
      ]
    },
    {
      id: 'whatsapp_relatorios',
      title: 'Relatórios Executivos & Disparo WhatsApp',
      icon: Send,
      badge: 'Comunicação Oficial',
      summary: 'Geração de laudos executivos da diretoria e transmissão ativa via Evolution API com agenda telefônica integrada.',
      topics: [
        {
          title: 'Tipos de Relatórios Disponíveis para WhatsApp',
          description: 'A Diretoria e o Master podem disparar 4 formatos executivos padronizados:',
          stepByStep: [
            '1. Panorama Geral dos Ativos: Métrica consolidada de todas as piscinas monitoradas e conformidade.',
            '2. Boletim de Auditoria Crítica (Red Zone): Alerta de piscinas em risco químico para intervenção de emergência.',
            '3. Certificado de Garantia Mensal: Laudo técnico de conformidade para envio aos clientes.',
            '4. Balanço Preditivo de Estoque: Estimativa de autonomia de químicos e sugestão de compras.'
          ]
        },
        {
          title: 'Agenda Telefônica Dinâmica',
          description: 'Integrada diretamente ao banco de dados Supabase. Permite selecionar contatos pré-cadastrados (Diretoria, Técnicos, Clientes) ou digitar manualmente qualquer número de WhatsApp com DDI/DDD.',
          importantNotice: 'A Evolution API conectada ao servidor garante a entrega da mensagem no WhatsApp com SLA inferior a 10 segundos.'
        }
      ],
      faqs: [
        {
          id: 'faq-7',
          question: 'Posso enviar relatórios para números que não estão na agenda?',
          answer: 'Sim! Basta digitar o número de telefone desejado no campo "WhatsApp de Destino" e clicar em "Disparar Relatório no WhatsApp Agora".',
          tags: ['whatsapp', 'telefone', 'número', 'disparo']
        }
      ]
    },
    {
      id: 'telemetria_f1_clientes',
      title: 'Clientes & Cockpit Telemetria F1',
      icon: Activity,
      badge: 'Nova Funcionalidade v4.2',
      summary: 'Visão centralizada de clientes, portfólios de piscinas e o cockpit de telemetria estilo Fórmula 1 com tacômetros digitais e LSI ao vivo.',
      topics: [
        {
          title: 'Visão Centralizada de Portfólios por Cliente',
          description: 'A Diretoria da JHoston Pools e o perfil MASTER podem acessar a aba "Clientes & Telemetria F1" para inspecionar clientes específicos (Resort Terravista, Fasano, Alphaville, Copacabana Palace). Cada card exibe o Health Score da piscina (0-100%), dados de volume, vazão e status do monólito.',
          stepByStep: [
            'Acesse a aba "Clientes & Telemetria F1" no menu superior.',
            'Selecione o cliente desejado no seletor do topo.',
            'Visualize o resumo do contrato: volume total de água monitorado e número de piscinas.',
            'Clique no card de qualquer piscina para acionar o Cockpit de Telemetria F1.'
          ]
        },
        {
          title: 'Cockpit de Telemetria F1 ("Pit Wall")',
          description: 'Painel imersivo de engenharia química com tacômetros digitais em tempo real (pH, Cloro ppm, Alcalinidade, Temperatura e Dureza Cálcica) e mostrador dinâmico da equação de equilíbrio LSI (Langelier Saturation Index).',
          stepByStep: [
            'Tacômetro de pH: Exibe a faixa de segurança (7.2 a 7.6) e acusa zona ácida corrosiva imediatamente.',
            'Mostrador LSI Dial: Mostrador analógico colorido dividindo as zonas: Corrosiva (< -0.3), Equilíbrio (-0.3 a +0.3) e Incrustante (> +0.3).',
            'Série Histórica Contínua: Gráfico dinâmico com curvas de 7 e 14 dias acoplado ao clima meteorológico diário.',
            'Prescrição de Pit Stop Químico: Cálculo estequiométrico exato em gramas/kg para rebalancear a piscina sem produtos proibidos.'
          ],
          importantNotice: 'A Diretoria do Cliente Final também tem acesso a este cockpit para acompanhar sua própria piscina em tempo real.'
        }
      ],
      faqs: [
        {
          id: 'faq-8',
          question: 'O que significa o Índice LSI no Cockpit de Telemetria?',
          answer: 'O LSI (Langelier Saturation Index) mede a tendência da água em corroer ou incrustar no revestimento monolítico. Se o LSI estiver entre -0.30 e +0.30, o monólito está 100% blindado contra desgaste.',
          tags: ['lsi', 'telemetria', 'f1', 'química', 'langelier']
        },
        {
          id: 'faq-9',
          question: 'Como alternar entre as piscinas de um mesmo resort no Cockpit F1?',
          answer: 'No canto superior direito da janela do Cockpit F1 há um seletor de piscinas que permite alternar instantaneamente entre os tanques do cliente sem fechar o painel.',
          tags: ['f1', 'cockpit', 'seletor', 'piscinas']
        }
      ]
    }
  ];

  const activeSection = sections.find(s => s.id === activeSectionId) || sections[0];

  // Filtro de busca global na Central de Ajuda
  const matchingFaqs = searchTerm.trim() === '' 
    ? activeSection.faqs 
    : sections.flatMap(s => s.faqs).filter(f => 
        f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
      );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-800 text-cyan-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-black text-white">Central de Ajuda, Tutoriais & FAQ do Sistema</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Base de conhecimento operacional completa do JHPCS: governança RBAC, motor químico, PWA offline, relatórios WhatsApp e portal do cliente.
          </p>
        </div>

        {/* Global Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquise por dúvidas, termos ou regras..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* COLUNA ESQUERDA: Menu de Navegação por Seção (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1 block mb-2">
            Tópicos de Ajuda do Sistema
          </span>

          {sections.map((sec) => {
            const Icon = sec.icon;
            const isSelected = activeSectionId === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => {
                  setActiveSectionId(sec.id);
                  setSearchTerm('');
                }}
                className={`w-full p-3.5 rounded-xl border text-left transition flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'border-cyan-500 bg-cyan-950/40 text-white shadow-lg shadow-cyan-950/30'
                    : 'border-slate-800/80 bg-slate-950/40 text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-cyan-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs">{sec.title}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{sec.badge}</div>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition ${isSelected ? 'text-cyan-400 transform translate-x-1' : 'text-slate-600'}`} />
              </button>
            );
          })}

          {/* Atalho Rápido para Treinamento Interativo */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 to-indigo-950/40 border border-purple-800/40 space-y-2 mt-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Deseja um curso completo?</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Acesse a Academia JHPCS com trilhas certificadas para MASTER, Diretoria, Técnicos e Piscineiros.
            </p>
            <button
              type="button"
              onClick={() => onNavigateTab('training')}
              className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg text-xs transition cursor-pointer"
            >
              Ir para Academia de Treinamento
            </button>
          </div>
        </div>

        {/* COLUNA DIREITA: Conteúdo Detalhado da Seção Selecionada (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {searchTerm.trim() !== '' ? (
            /* Visualização de Resultados da Busca */
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-cyan-400" />
                Resultados da busca para: &quot;{searchTerm}&quot; ({matchingFaqs.length})
              </h3>

              {matchingFaqs.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs">
                  Nenhum tópico encontrado. Tente buscar por termos como &quot;pH&quot;, &quot;senha&quot;, &quot;piscineiro&quot; ou &quot;garantia&quot;.
                </div>
              ) : (
                <div className="space-y-3">
                  {matchingFaqs.map((faq) => (
                    <div key={faq.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <h4 className="text-xs font-bold text-cyan-300">{faq.question}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Visualização Normal da Seção Selecionada */
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
              {/* Header da Seção */}
              <div className="pb-4 border-b border-slate-800">
                <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">{activeSection.badge}</span>
                <h3 className="text-lg font-black text-white mt-1">{activeSection.title}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{activeSection.summary}</p>
              </div>

              {/* Tópicos e Guias Passo a Passo */}
              <div className="space-y-5">
                {activeSection.topics.map((topic, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-3">
                    <h4 className="text-xs font-bold text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-black">
                        {i + 1}
                      </span>
                      {topic.title}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed">{topic.description}</p>

                    {topic.stepByStep && (
                      <div className="space-y-1.5 pt-2 border-t border-slate-900">
                        <span className="text-[11px] font-semibold text-cyan-400 block">Procedimento Passo a Passo:</span>
                        <ul className="space-y-1 text-[11px] text-slate-400">
                          {topic.stepByStep.map((step, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {topic.importantNotice && (
                      <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{topic.importantNotice}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* FAQ Sanfonado da Seção */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-cyan-400" />
                  Perguntas Frequentes (FAQ) desta Seção
                </h4>

                <div className="space-y-2">
                  {activeSection.faqs.map((faq) => {
                    const isExpanded = expandedFaqId === faq.id;
                    return (
                      <div key={faq.id} className="border border-slate-800/80 rounded-xl overflow-hidden bg-slate-950/60">
                        <button
                          type="button"
                          onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                          className="w-full p-3.5 text-left flex items-center justify-between text-xs font-semibold text-slate-200 hover:text-white transition cursor-pointer"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown className={`w-4 h-4 transition text-slate-500 ${isExpanded ? 'transform rotate-180 text-cyan-400' : ''}`} />
                        </button>
                        {isExpanded && (
                          <div className="p-3.5 pt-0 text-xs text-slate-400 leading-relaxed border-t border-slate-900">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
