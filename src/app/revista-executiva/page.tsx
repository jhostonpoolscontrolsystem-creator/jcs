import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Layers, 
  Send, 
  Smartphone, 
  ShoppingBag, 
  Download, 
  ExternalLink,
  ArrowRight,
  FileText,
  Activity,
  Award,
  Crown,
  BookOpen,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Droplets,
  Scale
} from 'lucide-react';

export const metadata = {
  title: 'Revista Executiva JHPCS 2026 — Edição Única Colecionável',
  description: 'Compêndio de Luxo: Roteiro de Apresentação, Manual JHoston Pools, Gestão do Piscineiro, Roteiro de Testes de Estresse, Flyers e Certificado do Plano de Manutenção Ativo (3 Anos).',
};

export default function RevistaExecutivaPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-400 selection:text-slate-950 pb-24">
      {/* Barra Superior Executiva */}
      <header className="border-b border-amber-500/20 bg-slate-950/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Crown className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <span className="text-[10px] font-mono font-black text-amber-400 uppercase tracking-widest block">
                EDIÇÃO ÚNICA COLECIONÁVEL • OUTUBRO 2026
              </span>
              <h1 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                JHPCS EXECUTIVE COMPENDIUM
                <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
                  8 CAPÍTULOS
                </span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/api/pdf/luxury-compendium?download=true"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs flex items-center gap-2 transition shadow-lg shadow-amber-500/20"
            >
              <Download className="w-4 h-4" />
              <span>Baixar Revista Completa (PDF)</span>
            </a>
            <a
              href="/api/pdf/presentation-flyer?target=diretoria&download=true"
              className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 font-bold text-xs border border-cyan-500/30 transition flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Flyer Diretoria</span>
            </a>
            <a
              href="/api/pdf/presentation-flyer?target=cliente&download=true"
              className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-300 font-bold text-xs border border-emerald-500/30 transition flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Flyer Cliente</span>
            </a>
            <Link
              href="/"
              className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-slate-800 transition"
            >
              Portal JHPCS
            </Link>
          </div>
        </div>
      </header>

      {/* Capa Principal Hero / Editorial */}
      <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900/60 via-slate-950 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 py-16 sm:py-24 space-y-8 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            COMPÊNDIO OFICIAL DA ALTA DIRETORIA • PLANO DE MANUTENÇÃO ATIVO
          </div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
              A Bíblia Operacional & Soberana da <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent">Garantia Trienal Ativa</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              A unificação editorial definitiva entre o <strong>Roteiro de Apresentação Executiva</strong>, o <strong>Manual do Usuário JHoston Pools</strong> com o <strong>Plano de Manutenção Ativo de 3 Anos</strong> (acompanhamento semanal sem mensalidade e intervenções anuais com mão de obra isenta), a <strong>Gestão de Campo do Tratador</strong> com isolamento por etiquetas QR Code, o <strong>Roteiro Oficial de Testes de Estresse</strong> e os <strong>Flyers de Boas-Vindas</strong>.
            </p>
          </div>

          {/* Cartão de Expediente dos Autores */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-amber-500/30 backdrop-blur max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">Arquitetura de Sistemas & IA</span>
              <h3 className="text-sm font-black text-white">Daniel Lopes</h3>
              <p className="text-xs text-slate-400">Chief Architect & Forensic Logic Lead</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">Engenharia de Processos & UX</span>
              <h3 className="text-sm font-black text-white">Patrícia Grübel</h3>
              <p className="text-xs text-slate-400">Executive Director of Quality & Usability</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">Homologação Soberana</span>
              <h3 className="text-sm font-black text-cyan-200">JHoston Pools Brasil</h3>
              <p className="text-xs text-slate-400">Garantia Ativa (3 Anos) Homologada</p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid de Capítulos da Revista */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* Navegação Rápida entre seções */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center font-mono text-[11px]">
          {[
            { n: '01', t: 'Capa Gala', id: 'cap-1' },
            { n: '02', t: 'Editorial', id: 'cap-2' },
            { n: '03', t: 'Apresentação I', id: 'cap-3' },
            { n: '04', t: 'Pit Wall F1', id: 'cap-4' },
            { n: '05', t: 'Manual JHP', id: 'cap-5' },
            { n: '06', t: 'Piscineiro & QR', id: 'cap-6' },
            { n: '07', t: 'Testes Estresse', id: 'cap-7' },
            { n: '08', t: 'Certificado', id: 'cap-8' },
          ].map((item) => (
            <a
              key={item.n}
              href={`#${item.id}`}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800/80 transition text-slate-300"
            >
              <span className="text-amber-400 font-bold block">{item.n}</span>
              <span className="truncate block font-sans font-semibold text-xs mt-0.5">{item.t}</span>
            </a>
          ))}
        </div>

        {/* CAPÍTULO 2 & 3: ROTEIRO DE APRESENTAÇÃO */}
        <section id="cap-3" className="space-y-6 pt-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-mono font-black flex items-center justify-center text-sm border border-amber-500/40">
              03
            </span>
            <div>
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold tracking-widest">Capítulo I & II da Revista</span>
              <h2 className="text-2xl font-black text-white">Roteiro Oficial de Apresentação Executiva</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <Crown className="w-4 h-4" />
                <span>Os 5 Personagens da Apresentação</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
                <li className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-white block font-bold">1. Daniel Lopes (Apresentador & Arquiteto):</strong>
                  Condutor da apresentação, demonstração ao vivo, contextualização de valor e autoridade técnica.
                </li>
                <li className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-white block font-bold">2. Dr. Marcos Silveira (Diretoria JHoston Pools):</strong>
                  Focado na margem de lucro, escala comercial e corte de R$ 180.000/ano em chamados indevidos.
                </li>
                <li className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-white block font-bold">3. Eng. Sofia Albuquerque (Engenharia & Garantia):</strong>
                  Exige rigor técnico em pH 7.2-7.6, dureza cálcica 200-400 ppm e veto total ao Ácido Muriático.
                </li>
                <li className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-white block font-bold">4. Roberto Mendes (Síndico Condomínio Jardins):</strong>
                  Quer transparência no condomínio, QR Code no elevador e relatórios automáticos no WhatsApp.
                </li>
                <li className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-white block font-bold">5. João Tratador (Operador de Campo):</strong>
                  Instalação com 1 toque por WhatsApp/QR Code da Casa de Máquinas, sem senhas complexas.
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Activity className="w-4 h-4" />
                <span>A Sequência dos 4 Atos Dramáticos</span>
              </div>
              <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-amber-400 font-bold font-mono text-[10px] uppercase">Ato I • O Diagnóstico da Dor</span>
                  <p className="mt-1">
                    Como a JHoston Pools era culpada injustamente pela perda de brilho e corrosão mineral provocada por piscineiros terceirizados.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-amber-400 font-bold font-mono text-[10px] uppercase">Ato II • O Pit Wall de Fórmula 1</span>
                  <p className="mt-1">
                    Painel em tempo real com ISA (Índice de Saturação de Areia), pH, Cloro e o Radar de Alerta Precoce com previsão climática de 30 min.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-amber-400 font-bold font-mono text-[10px] uppercase">Ato III • A Caixa-Preta Pericial</span>
                  <p className="mt-1">
                    Auditoria forense que registra cada leitura no banco e emite laudos periciais com valor probatório incontestável.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-amber-400 font-bold font-mono text-[10px] uppercase">Ato IV • O Kit de Boas-Vindas & Fechamento</span>
                  <p className="mt-1">
                    Flyers de gala, Manual de bolso, Placa física de casa de máquinas e o Selo de Garantia Trienal Ativa (3 Anos).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* NOVO BLOCO COMERCIAL: PLANOS DE ASSINATURA PREMIUM DE LAUDOS */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-amber-500/30 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-black text-white">
                  Plano Comercial de Assinatura Premium de Relatórios (JHPCS Analytics VIP)
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold">
                NOVA RECEITA RECORRENTE (ARR)
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Além de blindar a garantia, o JHPCS transforma-se em um poderoso gerador de receita recorrente para a JHoston Pools. O cliente escolhe o nível de frequência dos despachos automáticos no WhatsApp:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              {/* TIER 1: STANDARD */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">Standard Incluso</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">GRATUITO</span>
                </div>
                <div className="text-slate-400 text-[11px] leading-relaxed space-y-1">
                  <p>• Despacho <strong>Mensal</strong> (1º dia útil) no WhatsApp</p>
                  <p>• Status do Plano de Manutenção Ativo</p>
                  <p>• Médias mensais de pH e Cloro</p>
                  <p>• Certificado básico de conformidade</p>
                </div>
              </div>

              {/* TIER 2: PRO EXECUTIVE */}
              <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-2 text-xs relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-300">Pro Executive</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">R$ 29,90/mês</span>
                </div>
                <div className="text-slate-300 text-[11px] leading-relaxed space-y-1">
                  <p>• Despacho <strong>Quinzenal</strong> (dias 01 e 15) no WhatsApp</p>
                  <p>• Gráficos de telemetria F1 e balanço LSI</p>
                  <p>• Alerta preditivo de reposição de insumos</p>
                  <p>• Comparativo fotográfico de evolução mineral</p>
                </div>
              </div>

              {/* TIER 3: BLACK ELITE */}
              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/50 space-y-2 text-xs relative overflow-hidden shadow-lg shadow-amber-500/5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-400">Black Elite / Resort</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">R$ 49,90/mês</span>
                </div>
                <div className="text-slate-300 text-[11px] leading-relaxed space-y-1">
                  <p>• Despacho <strong>Semanal</strong> (segunda 08h) + On-Demand</p>
                  <p>• Auditoria semanal detalhada do tratador</p>
                  <p>• Radar de chuva ácida meteorológico antecipado</p>
                  <p>• Laudo com Hash SHA-256 e assinatura digital</p>
                  <p>• 1-toque para reabastecimento de produtos</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CAPÍTULO 5: MANUAL DO USUÁRIO JHOSTON POOLS */}
        <section id="cap-5" className="space-y-6 pt-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-black flex items-center justify-center text-sm border border-emerald-500/40">
              05
            </span>
            <div>
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold tracking-widest">Capítulo III da Revista</span>
              <h2 className="text-2xl font-black text-white">Manual do Usuário JHoston Pools (Engenharia de Cura)</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-rose-950/30 border border-rose-800/50 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <AlertTriangle className="w-5 h-5" />
                <span>A Regra de Ouro do Ácido</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>PROIBIÇÃO ABSOLUTA:</strong> É terminantemente proibido o uso de <em>Ácido Muriático ou Clorídrico puro</em> no revestimento monolítico. O ataque ácido dissolve a matriz de carbonato de cálcio, descalça os grãos minerais e anula a garantia trienal de forma instantânea e irrevogável registrada em perícia.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-amber-950/30 border border-amber-800/50 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Droplets className="w-5 h-5" />
                <span>Cura Inicial de 28 Dias</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Durante o primeiro ciclo de 28 dias após a entrega técnica, a escovação diária é mandatória com cerdas de nylon. O pH deve ser mantido entre <strong>7.2 e 7.4</strong> e a alcalinidade total estabilizada em <strong>100 a 120 ppm</strong> para consolidar a cristalização mineral sem eflorescência.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-cyan-950/30 border border-cyan-800/50 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <Scale className="w-5 h-5" />
                <span>Índice de Saturação (ISA / Langelier)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                O equilíbrio físico-químico ideal exige que o ISA permaneça na faixa de <strong>-0.2 a +0.2</strong>. Índices negativos tornam a água corrosiva à matriz vítrea; índices positivos superiores a +0.5 geram precipitação calcária opaca. O sistema calcula a dosagem compensatória no ato.
              </p>
            </div>
          </div>

          {/* O NOVO PLANO DE MANUTENÇÃO ATIVO: 3 ANOS DE CUIDADO PROATIVO */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-2 border-amber-500/40 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold">
                <Award className="w-3.5 h-3.5" />
                DIRETRIZ OFICIAL DE PÓS-VENDA & GARANTIA ATIVA
              </div>
              <h3 className="text-2xl font-black text-white">
                Plano de Manutenção Ativo: A Revolução no Pós-Venda e Garantia Trienal
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                Esqueça os termos de garantia genéricos do mercado que apenas transferem a responsabilidade e a culpa para o cliente em caso de problemas. Nós assumimos o compromisso real com a longevidade estética e estrutural do seu investimento. Para isso, substituímos a garantia tradicional pelo nosso <strong>Plano de Manutenção Ativo</strong>, uma estratégia exclusiva de acompanhamento direto durante os <strong>3 primeiros anos</strong>, garantindo que o seu revestimento permaneça impecável:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-3 text-xs">
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase block">Pilar 1 • Semanal</span>
                <h4 className="text-white font-bold text-sm">Monitoramento Remoto Semanal</h4>
                <p className="text-slate-300 leading-relaxed">
                  Nossa equipe técnica fará contato direto e semanal com o responsável pelos cuidados da sua piscina (caseiro, tratador ou zelador) para auditar os parâmetros químicos de pH e cloro. Você terá a segurança de uma água sempre balanceada e relatórios periódicos, com <strong>zero custo de mensalidade</strong>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-3 text-xs">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block">Pilar 2 • Ano 1 & 2</span>
                <h4 className="text-white font-bold text-sm">Intervenção Anual Preventiva</h4>
                <p className="text-slate-300 leading-relaxed">
                  Uma vez ao ano, nossa equipe especializada se deslocará até o local para esvaziar a piscina, realizar uma lavagem técnica e reaplicar a resina protetora preventiva. A nossa <strong>mão de obra especializada é 100% isenta</strong>! O cliente arcará exclusivamente com os custos logísticos de deslocamento e com os materiais (resinas).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-3 text-xs">
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">Pilar 3 • Ano 3</span>
                <h4 className="text-white font-bold text-sm">Manutenção Pesada & Revitalização</h4>
                <p className="text-slate-300 leading-relaxed">
                  No encerramento do ciclo, realizamos um check-up profundo com lavagem química intensiva (alta pressão) e camada final de proteção. <strong>Isenção total da nossa mão de obra mantida</strong>, cabendo ao cliente deslocamento e insumos. Ao final, você poderá optar pela renovação do plano.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center text-xs text-amber-300 italic">
              &ldquo;Com o Plano de Manutenção Ativo, sua única preocupação será aproveitar o seu espaço de lazer. A responsabilidade técnica e o cuidado contínuo são nossos.&rdquo;
            </div>
          </div>
        </section>

        {/* CAPÍTULO 6: GESTÃO DO PISCINEIRO & QR CODE DA CASA DE MÁQUINAS */}
        <section id="cap-6" className="space-y-6 pt-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <span className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 font-mono font-black flex items-center justify-center text-sm border border-cyan-500/40">
              06
            </span>
            <div>
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-widest">Capítulo IV da Revista</span>
              <h2 className="text-2xl font-black text-white">Gestão de Campo & Ativação de Piscinas via QR Code</h2>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold">
                  <QrCode className="w-3.5 h-3.5" />
                  ETIQUETA ADESIVA IMPERMEÁVEL DE CASA DE MÁQUINAS
                </div>
                <h3 className="text-xl font-black text-white">
                  Instalação Imediata & Isolamento Rigoroso de Condomínio
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Para eliminar a fricção do piscineiro ter que digitar senhas ou baixar apps em lojas virtuais, criamos a <strong>Placa Oficial de Ativação</strong>. Colada pelo cliente final diretamente na casa de máquinas ou enviada por link direto no WhatsApp, ela garante:
                </p>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Isolamento Multi-Tenant:</strong> O tratador só enxerga as piscinas do condomínio autorizado, nunca dados de concorrentes ou residências vizinhas.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Validação Criptográfica:</strong> O backend valida o <code>client_id</code> na submissão pericial em <code>/api/maintenance/submit</code>.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Check-in Georreferenciado:</strong> Carimbo de data/hora, parâmetros dosados e foto do teste de colorimetria em alta resolução.</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-cyan-500/30 flex flex-col items-center text-center space-y-4">
                <div className="w-32 h-32 rounded-xl bg-white p-2 shadow-2xl flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-slate-950" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                    PLACA DE IDENTIFICAÇÃO HOMOLOGADA
                  </span>
                  <p className="text-xs text-white font-bold">
                    Escaneie para Registrar Manutenção Instantânea
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Disponível no painel do cliente para impressão A4 e plastificação
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CAPÍTULO 7: ROTEIRO OFICIAL DE TESTES DE ESTRESSE */}
        <section id="cap-7" className="space-y-6 pt-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <span className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 font-mono font-black flex items-center justify-center text-sm border border-purple-500/40">
              07
            </span>
            <div>
              <span className="text-[10px] font-mono uppercase text-purple-400 font-bold tracking-widest">Capítulo V da Revista</span>
              <h2 className="text-2xl font-black text-white">Roteiro Oficial de Testes de Estresse (EX-01 a EX-08)</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {[
              { id: 'EX-01', t: 'Ataque Ácido Intencional', desc: 'Simulação de dosagem crítica de ácido. O motor forense bloqueia o laudo, gera alarme sonoro e marca sinistro trienal com timestamp.', badge: 'FORENSE' },
              { id: 'EX-02', t: 'Queda de Conexão Offline', desc: 'Preenchimento em subsolo sem internet. O PWA armazena localmente em IndexedDB e sincroniza assim que restabelece o 4G.', badge: 'OFFLINE' },
              { id: 'EX-03', t: 'Invasão Multi-Tenant', desc: 'Tentativa de submissão com ID de cliente cruzado. O backend intercepta com HTTP 403 Forbidden e registra log de auditoria.', badge: 'SEGURANÇA' },
              { id: 'EX-04', t: 'Estresse Concorrente', desc: '100 submissões simultâneas de tratadores. O SQLite/Prisma sustenta sem corrupção com locks transacionais protegidos.', badge: 'PERFORMANCE' },
              { id: 'EX-05', t: 'Disparo WhatsApp em Massa', desc: 'Disparo de relatórios e etiquetas para 50 síndicos simultâneos sem estouro de cota e com fila resiliente.', badge: 'COMUNICAÇÃO' },
              { id: 'EX-06', t: 'Eflorescência Acelerada', desc: 'Simulação de dureza cálcica descompensada. Alerta imediato de dosagem de sequestrante antes da formação do véu.', badge: 'QUÍMICA' },
              { id: 'EX-07', t: 'Foto Pericial Falsificada', desc: 'Submissão de imagem repetida ou corrompida. Validação de integridade do payload de evidência com hash forense.', badge: 'AUDITORIA' },
              { id: 'EX-08', t: 'Emissão de Laudo Trienal', desc: 'Geração de PDF do laudo pericial com certificado digital, QR Code de validação pública e assinatura autorizada.', badge: 'JURÍDICO' },
            ].map((test) => (
              <div key={test.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-amber-400">{test.id}</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                    {test.badge}
                  </span>
                </div>
                <h4 className="text-white font-bold">{test.t}</h4>
                <p className="text-slate-400 text-[11px] leading-relaxed">{test.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CAPÍTULO 8: CERTIFICADO SOBERANO DE HOMOLOGAÇÃO */}
        <section id="cap-8" className="space-y-6 pt-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-mono font-black flex items-center justify-center text-sm border border-amber-500/40">
              08
            </span>
            <div>
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold tracking-widest">Capítulo VI da Revista</span>
              <h2 className="text-2xl font-black text-white">Certificado Soberano de Homologação Trienal</h2>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-2 border-amber-500/40 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Award className="w-64 h-64 text-amber-400" />
            </div>

            <div className="space-y-6 max-w-3xl relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold">
                <Award className="w-4 h-4" />
                CERTIFICADO DE CONFORMIDADE TECNOLÓGICA & FORENSE
              </div>

              <h3 className="text-2xl sm:text-4xl font-black text-white">
                Homologado no Plano de Manutenção Ativo (3 Anos)
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Certificamos para todos os fins de direito e engenharia que o <strong>JHoston Pools Control System (JHPCS)</strong> atende integralmente às diretrizes químicas do <strong>Plano de Manutenção Ativo de 3 Anos</strong>, garantindo auditoria semanal sem mensalidade e intervenções presenciais no 1º, 2º e 3º ano com isenção integral da mão de obra especializada.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">CÓDIGO DE HOMOLOGAÇÃO</span>
                  <span className="text-amber-400 font-bold">JHPCS-TRIENNIAL-ACTIVE-PLAN-2026</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">HASH CRIPTOGRÁFICO SHA-256</span>
                  <span className="text-cyan-300 font-bold truncate block">e7b92f8a14c...5d81c20e</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="/api/pdf/luxury-compendium?download=true"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs flex items-center gap-2 shadow-xl shadow-amber-500/20 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar Revista Completa (PDF)</span>
                </a>
                <Link
                  href="/apresentacao-diretoria"
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition"
                >
                  Ver Roteiro com Personagens
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
