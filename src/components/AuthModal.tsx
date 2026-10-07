'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  Smartphone, 
  UserPlus, 
  LogIn, 
  AlertCircle, 
  CheckCircle2, 
  User, 
  Phone, 
  CreditCard, 
  KeyRound, 
  Briefcase,
  ChevronRight,
  Droplet
} from 'lucide-react';
import { UserRole } from '@/types/database';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
  currentUser?: any;
}

export function AuthModal({ isOpen, onClose, onLoginSuccess, currentUser }: AuthModalProps) {
  const [mode, setMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [authMethod, setAuthMethod] = useState<'EMAIL' | 'CPF_PIN'>('EMAIL');

  // Form State - Login
  const [loginEmail, setLoginEmail] = useState('danielsmlopes@hotmail.com');
  const [loginPassword, setLoginPassword] = useState('Gabriel2006');
  const [loginCpf, setLoginCpf] = useState('');
  const [loginPin, setLoginPin] = useState('');

  // Form State - Register
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('55');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState<UserRole>('GERENCIA_CLI');
  const [regCpf, setRegCpf] = useState('');
  const [regPin, setRegPin] = useState('');

  // Status & Feedback
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (authMethod === 'EMAIL') {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: loginEmail, password: loginPassword }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Falha ao autenticar.');

        setSuccessMsg(`Bem-vindo, ${data.user.name}! Nível: ${data.user.role}`);
        setTimeout(() => {
          onLoginSuccess(data.user);
          onClose();
        }, 800);
      } else {
        // PWA login via CPF + PIN
        const res = await fetch('/api/auth/pwa-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cpf: loginCpf, pin: loginPin }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Falha na autenticação rápida de tratador.');

        setSuccessMsg(`Acesso concedido: ${data.maintainer.name} (Piscineiro)`);
        setTimeout(() => {
          onLoginSuccess({
            id: data.maintainer.id,
            name: data.maintainer.name,
            role: 'PISCINEIRO',
            cpf: data.maintainer.cpf,
          });
          onClose();
        }, 800);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro inesperado ao realizar login.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/users/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          phone: regPhone,
          role: regRole,
          password: regPassword,
          cpf: regCpf,
          pin: regPin,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Falha ao cadastrar usuário.');

      setSuccessMsg(`Usuário ${data.user.name} cadastrado com sucesso como ${data.user.role}!`);
      setTimeout(() => {
        setMode('LOGIN');
        setLoginEmail(data.user.email);
        setLoginPassword('');
        setSuccessMsg('Agora faça login com as credenciais criadas.');
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro ao registrar usuário.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl shadow-cyan-950/50 text-slate-100 overflow-hidden">
        {/* Glow Header Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-sky-500 to-emerald-400 p-[2px] shadow-lg shadow-cyan-500/20">
              <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Droplet className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-wider text-white">
                {mode === 'LOGIN' ? 'Acesso ao Sistema JHPCS' : 'Cadastrar Novo Usuário'}
              </h3>
              <p className="text-xs text-slate-400">Controle de Acesso & Hierarquias RBAC</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition"
          >
            ✕
          </button>
        </div>

        {/* Tabs Mode Switcher (Login vs Register) */}
        <div className="flex bg-slate-950 p-1 rounded-xl my-5 border border-slate-800">
          <button
            type="button"
            onClick={() => { setMode('LOGIN'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition ${
              mode === 'LOGIN' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <LogIn className="w-4 h-4" /> Entrar
          </button>
          <button
            type="button"
            onClick={() => { setMode('REGISTER'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition ${
              mode === 'REGISTER' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-4 h-4" /> Novo Cadastro
          </button>
        </div>

        {/* Feedback Alerts */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-rose-300 text-xs font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-emerald-300 text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* MODE: LOGIN */}
        {mode === 'LOGIN' && (
          <div>
            {/* Login Method Sub-Toggle */}
            <div className="flex justify-center gap-2 mb-4 text-xs">
              <button
                type="button"
                onClick={() => setAuthMethod('EMAIL')}
                className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition ${
                  authMethod === 'EMAIL'
                    ? 'border-cyan-500/50 bg-cyan-950/40 text-cyan-300 font-semibold'
                    : 'border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Mail className="w-3.5 h-3.5" /> E-mail (Master / Equipe / Cliente)
              </button>
              <button
                type="button"
                onClick={() => setAuthMethod('CPF_PIN')}
                className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition ${
                  authMethod === 'CPF_PIN'
                    ? 'border-cyan-500/50 bg-cyan-950/40 text-cyan-300 font-semibold'
                    : 'border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" /> CPF + PIN (Piscineiro PWA)
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {authMethod === 'EMAIL' ? (
                <>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">E-mail Cadastrado</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="ex: danielsmlopes@hotmail.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Senha</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                      <input
                        type="password"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  {/* Master Quick Credentials Hint */}
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Acesso Master configurado:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setLoginEmail('danielsmlopes@hotmail.com');
                        setLoginPassword('Gabriel2006');
                      }}
                      className="text-cyan-400 font-bold hover:underline cursor-pointer"
                    >
                      Preencher Daniel (Master)
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">CPF do Piscineiro</label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={loginCpf}
                        onChange={(e) => setLoginCpf(e.target.value)}
                        placeholder="000.000.000-00"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">PIN de Segurança (4 a 6 dígitos)</label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                      <input
                        type="password"
                        maxLength={6}
                        required
                        value={loginPin}
                        onChange={(e) => setLoginPin(e.target.value)}
                        placeholder="ex: 1234"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Validando Acesso...' : 'Acessar Sistema'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* MODE: REGISTER */}
        {mode === 'REGISTER' && (
          <form onSubmit={handleRegister} className="space-y-3.5">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Nome Completo</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="ex: Carlos Alberto"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-10 pr-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Perfil / Hierarquia (RBAC)</label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <select
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value as UserRole)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-10 pr-3 text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <optgroup label="1. JHoston Pools (Interno)">
                    <option value="MASTER">Nível 1: MASTER (Daniel Lopes)</option>
                    <option value="DIRETORIA_JH">Nível 1: Diretoria JH</option>
                    <option value="TECNICO_JH">Nível 1: Equipe Técnica JH</option>
                  </optgroup>
                  <optgroup label="2. Cliente (Hotéis / Resorts / Condomínios)">
                    <option value="GERENCIA_CLI">Nível 2: Gerência / Síndico / Proprietário</option>
                    <option value="TECNICO_CLI">Nível 2: Manutenção Interna do Cliente</option>
                  </optgroup>
                  <optgroup label="3. Campo / Operacional">
                    <option value="PISCINEIRO">Nível 3: Piscineiro / Prestador de Serviço</option>
                  </optgroup>
                </select>
              </div>
            </div>

            {regRole === 'PISCINEIRO' ? (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">CPF (apenas números)</label>
                  <input
                    type="text"
                    required
                    value={regCpf}
                    onChange={(e) => setRegCpf(e.target.value)}
                    placeholder="12345678900"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">PIN (4 a 6 dígitos)</label>
                  <input
                    type="password"
                    maxLength={6}
                    required
                    value={regPin}
                    onChange={(e) => setRegPin(e.target.value)}
                    placeholder="ex: 1234"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">E-mail</label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="usuario@dominio.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">WhatsApp</label>
                    <input
                      type="text"
                      required
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="5511999999999"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Senha de Acesso</label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? 'Cadastrando no Supabase...' : 'Confirmar Cadastro'}
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
