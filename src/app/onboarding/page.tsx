'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  CreditCard, 
  QrCode, 
  Sparkles, 
  ArrowRight, 
  Building2, 
  Users, 
  Store, 
  Hotel, 
  ShieldCheck, 
  Lock, 
  Phone, 
  Mail, 
  User, 
  AlertCircle,
  RefreshCw,
  Copy,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

interface PlanOption {
  id: 'solo' | 'fleet' | 'facility' | 'retail';
  name: string;
  tagline: string;
  price: string;
  icon: any;
  highlight?: boolean;
  features: string[];
}

const PLANS: PlanOption[] = [
  {
    id: 'solo',
    name: 'Plano SOLO',
    tagline: 'Tratador Autônomo & Técnico Individual',
    price: 'R$ 89,00 /mês',
    icon: User,
    features: ['Até 30 piscinas ativas', 'App PWA Offline de Campo', 'Cálculo de ISL Multi-Substrato', 'Relatórios WhatsApp Marca Própria'],
  },
  {
    id: 'fleet',
    name: 'Plano FLEET',
    tagline: 'Frotas de Campo & Empresas de Serviços',
    price: 'R$ 299,00 /mês',
    icon: Users,
    highlight: true,
    features: ['Gestão de Múltiplos Técnicos', 'Geofencing GPS de Chegada', 'Estoque Volante na Caminhonete', 'Baixa Estequiométrica Automática'],
  },
  {
    id: 'facility',
    name: 'Plano FACILITY',
    tagline: 'Hotéis, Resorts, Clubes & Condomínios',
    price: 'R$ 490,00 /mês',
    icon: Hotel,
    features: ['Logbook Sanitário Digital Anvisa', 'Controle por Turnos e Assinatura Digital', 'Totem de Recepção & Selo QR Code', 'Módulo Financeiro Oculto'],
  },
  {
    id: 'retail',
    name: 'Plano RETAIL',
    tagline: 'Lojas Físicas & Revendas de Químicos',
    price: 'R$ 189,00 /mês',
    icon: Store,
    features: ['Receituário Químico de Balcão', 'QR Code de Reposição na Casa de Máquinas', 'Checkout PIX com sua Chave Própria', 'Laudo Impr. em Térmica 80mm'],
  },
];

export default function OnboardingPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Etapa 1
  const [selectedPlan, setSelectedPlan] = useState<'solo' | 'fleet' | 'facility' | 'retail'>('fleet');

  // Etapa 2
  const [docType, setDocType] = useState<'CNPJ' | 'CPF'>('CNPJ');
  const [document, setDocument] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [tradeName, setTradeName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [searchingCnpj, setSearchingCnpj] = useState(false);
  const [cnpjError, setCnpjError] = useState('');
  const [cnpjSuccess, setCnpjSuccess] = useState(false);

  // Etapa 3
  const [paymentMethod, setPaymentMethod] = useState<'PIX' | 'CREDIT_CARD'>('PIX');
  const enableCreditCard = process.env.NEXT_PUBLIC_ENABLE_CREDIT_CARD === 'true'; // Standby por padrão

  // Etapa 4
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [createdTenantId, setCreatedTenantId] = useState('');

  // Busca Automática de CNPJ
  const handleCnpjChange = async (val: string) => {
    setDocument(val);
    const clean = val.replace(/\D/g, '');
    if (clean.length === 14) {
      setSearchingCnpj(true);
      setCnpjError('');
      setCnpjSuccess(false);
      try {
        const res = await fetch(`/api/onboarding/cnpj?cnpj=${clean}`);
        const data = await res.json();
        if (res.ok && data.success) {
          setCompanyName(data.razao_social);
          setTradeName(data.nome_fantasia || data.razao_social);
          setAddress(`${data.logradouro}, ${data.numero} - ${data.bairro}, ${data.municipio}/${data.uf}`);
          setCnpjSuccess(true);
          if (data.alerta_impedimento) {
            setCnpjError(data.alerta_impedimento);
          }
        } else {
          setCnpjError(data.error || 'Não foi possível autocompletar. Preencha manualmente.');
        }
      } catch {
        setCnpjError('Erro na consulta da Receita Federal. Prossiga preenchendo manualmente.');
      } finally {
        setSearchingCnpj(false);
      }
    }
  };

  const handleFinishOnboarding = async () => {
    setLoadingRegister(true);
    try {
      const res = await fetch('/api/onboarding/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tierId: selectedPlan,
          documentType: docType,
          document,
          companyName: companyName || contactName,
          tradeName,
          contactName,
          email,
          phone,
          password,
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setCreatedTenantId(data.tenantId);
        setRegisterSuccess(true);
        setStep(4);
      } else {
        alert(data.error || 'Erro ao processar ativação de conta');
      }
    } catch (e: any) {
      alert(e.message || 'Erro de conexão no cadastro');
    } finally {
      setLoadingRegister(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Topo Institucional */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-sky-400 flex items-center justify-center font-black text-slate-950 text-lg shadow-lg shadow-cyan-500/20">
              J
            </div>
            <div>
              <span className="font-extrabold text-sm text-white tracking-wide block">JHPCS ECOSYSTEM</span>
              <span className="text-[10px] text-cyan-400 font-mono">Onboarding & Ativação de Clientes</span>
            </div>
          </div>

          <Link href="/" className="text-xs text-slate-400 hover:text-white transition">
            Voltar ao Início
          </Link>
        </div>
      </header>

      {/* Conteúdo Central */}
      <main className="max-w-4xl mx-auto w-full px-4 py-8 md:py-12 flex-1">
        
        {/* Stepper Header */}
        <div className="mb-10">
          <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold">
            <div className={`p-2 rounded-xl border transition ${step === 1 ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' : step > 1 ? 'bg-slate-900 border-slate-800 text-emerald-400' : 'bg-slate-900/40 border-slate-800 text-slate-600'}`}>
              1. Plano
            </div>
            <div className={`p-2 rounded-xl border transition ${step === 2 ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' : step > 2 ? 'bg-slate-900 border-slate-800 text-emerald-400' : 'bg-slate-900/40 border-slate-800 text-slate-600'}`}>
              2. Cadastro
            </div>
            <div className={`p-2 rounded-xl border transition ${step === 3 ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' : step > 3 ? 'bg-slate-900 border-slate-800 text-emerald-400' : 'bg-slate-900/40 border-slate-800 text-slate-600'}`}>
              3. Ativação
            </div>
            <div className={`p-2 rounded-xl border transition ${step === 4 ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' : 'bg-slate-900/40 border-slate-800 text-slate-600'}`}>
              4. Acesso
            </div>
          </div>
        </div>

        {/* ETAPA 1: SELEÇÃO DE PLANO */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center space-y-2">
              <h1 className="text-2xl md:text-3xl font-black text-white">Escolha a Experiência Ideal para o seu Negócio</h1>
              <p className="text-xs md:text-sm text-slate-400 max-w-xl mx-auto">
                O JHPCS adapta visualmente todo o fluxo e ferramentas para a realidade do seu setor. Altere de plano quando desejar.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {PLANS.map((plan) => {
                const Icon = plan.icon;
                const isSelected = selectedPlan === plan.id;

                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`p-6 rounded-3xl border transition cursor-pointer relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-slate-900 border-cyan-500 shadow-xl shadow-cyan-500/10'
                        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {plan.highlight && (
                      <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-extrabold uppercase border border-cyan-500/30">
                        Mais Popular
                      </span>
                    )}

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-2xl ${isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-base text-white">{plan.name}</h3>
                          <span className="text-[11px] text-slate-400 block">{plan.tagline}</span>
                        </div>
                      </div>

                      <div className="text-xl font-black text-white font-mono">
                        {plan.price}
                      </div>

                      <ul className="space-y-2 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                        {plan.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6">
                      <button
                        type="button"
                        className={`w-full py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-cyan-500 text-slate-950'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {isSelected ? 'Plano Selecionado' : 'Selecionar Plano'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setStep(2)}
                className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-sky-400 hover:brightness-110 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition cursor-pointer"
              >
                <span>Prosseguir para Cadastro</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ETAPA 2: DADOS CADASTRAIS */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8">
            <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-white">Dados da Sua Empresa / Operação</h2>
                <p className="text-xs text-slate-400">Preencha o CNPJ para preenchimento automático via Receita Federal.</p>
              </div>
              <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setDocType('CNPJ')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${docType === 'CNPJ' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'}`}
                >
                  Pessoa Jurídica
                </button>
                <button
                  type="button"
                  onClick={() => setDocType('CPF')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${docType === 'CPF' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'}`}
                >
                  Pessoa Física
                </button>
              </div>
            </div>

            {cnpjSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Dados da empresa obtidos com sucesso na base da Receita Federal!</span>
              </div>
            )}

            {cnpjError && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span>{cnpjError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {docType === 'CNPJ' ? 'CNPJ (Auto-Busca)' : 'CPF'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={document}
                    onChange={(e) => handleCnpjChange(e.target.value)}
                    placeholder={docType === 'CNPJ' ? '00.000.000/0000-00' : '000.000.000-00'}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                  {searchingCnpj && (
                    <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin absolute right-3 top-2.5" />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Razão Social / Nome Completo</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="ex: AcquaClean Serviços Ltda"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nome Fantasia (Marca Comercial)</label>
                <input
                  type="text"
                  value={tradeName}
                  onChange={(e) => setTradeName(e.target.value)}
                  placeholder="ex: AcquaClean Piscinas"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nome do Gestor / Responsável</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="ex: Marcos Silva"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">E-mail Corporativo (Login)</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="marcos@acquaclean.com.br"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp para Conexão White-Label</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="5511999998888"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">Senha de Acesso Master</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
              >
                Voltar ao Plano
              </button>

              <button
                type="button"
                disabled={!document || !email || !password}
                onClick={() => setStep(3)}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-sky-400 hover:brightness-110 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition cursor-pointer disabled:opacity-50"
              >
                <span>Prosseguir para Ativação</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ETAPA 3: PAGAMENTO & ATIVAÇÃO */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-lg font-black text-white">Forma de Ativação do Plano {selectedPlan.toUpperCase()}</h2>
              <p className="text-xs text-slate-400">Ative agora e aproveite os primeiros 7 dias grátis sem compromisso.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Opção PIX */}
              <div 
                onClick={() => setPaymentMethod('PIX')}
                className={`p-5 rounded-2xl border transition cursor-pointer space-y-3 ${
                  paymentMethod === 'PIX'
                    ? 'bg-slate-900 border-emerald-500 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-emerald-400" />
                    <strong className="text-sm text-white">PIX Instantâneo (Ativo)</strong>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-extrabold uppercase">
                    Liberação Imediata
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Sem burocracia. O sistema provisiona sua instância WhatsApp e suas ferramentas imediatamente com 7 dias grátis.
                </p>
              </div>

              {/* Opção Cartão (Standby) */}
              <div 
                onClick={() => setPaymentMethod('CREDIT_CARD')}
                className={`p-5 rounded-2xl border transition cursor-pointer space-y-3 ${
                  paymentMethod === 'CREDIT_CARD'
                    ? 'bg-slate-900 border-amber-500'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-amber-400" />
                    <strong className="text-sm text-white">Cartão de Crédito</strong>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-extrabold uppercase">
                    Em Standby
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Recorrência automática mensal. Suporte a todas as bandeiras nacionais.
                </p>
              </div>
            </div>

            {/* Aviso quando seleciona Cartão em Standby */}
            {paymentMethod === 'CREDIT_CARD' && !enableCreditCard && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2 text-amber-300 text-xs">
                <div className="flex items-center gap-2 font-bold">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Homologação Bancária de Cartão em Fase Final</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  O gateway de captura com operadoras de cartão está concluindo a homologação de segurança PCI-DSS. Você pode ativar sua conta agora mesmo com os <strong className="text-white">7 Dias Grátis via PIX</strong> sem qualquer cobrança imediata.
                </p>
              </div>
            )}

            <div className="flex justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
              >
                Voltar
              </button>

              <button
                type="button"
                disabled={loadingRegister}
                onClick={handleFinishOnboarding}
                className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 hover:brightness-110 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer disabled:opacity-50"
              >
                {loadingRegister ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Provisionando Conta e Instância WhatsApp...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Finalizar Cadastro & Iniciar 7 Dias Grátis</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ETAPA 4: SUCESSO & PROVISIONAMENTO */}
        {step === 4 && (
          <div className="space-y-6 animate-fadeIn bg-slate-900/80 border border-emerald-500/40 rounded-3xl p-8 text-center max-w-xl mx-auto shadow-2xl">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white">Parabéns! Sua Conta Está Ativa</h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                O ambiente do seu tenant <strong className="text-cyan-400 font-bold">{companyName || tradeName}</strong> foi gerado com sucesso. A sua instância dedicada da Evolution API já foi provisionada.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Plano Selecionado:</span>
                <span className="font-bold text-white uppercase">{selectedPlan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Usuário de Login:</span>
                <span className="font-bold text-cyan-300">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Período de Degustação:</span>
                <span className="font-bold text-emerald-400">7 Dias Livres</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/"
                className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-sky-400 hover:brightness-110 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition block"
              >
                <span>Acessar Painel Principal (Cockpit)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

      </main>

      {/* Rodapé Seguro */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        JHPCS PoolTech Ecosystem • Blindagem LGPD & Criptografia Ponta a Ponta
      </footer>

    </div>
  );
}
