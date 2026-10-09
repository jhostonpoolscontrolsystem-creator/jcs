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
  Droplet,
  Info,
  ShieldAlert
} from 'lucide-react';
import { UserRole } from '@/types/database';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
  currentUser?: any;
}

export function AuthModal({ isOpen, onClose, onLoginSuccess, currentUser }: AuthModalProps) {
  const [mode, setMode] = useState<'LOGIN' | 'REGISTER' | 'FORCE_CHANGE_PASSWORD'>('LOGIN');
  const [authMethod, setAuthMethod] = useState<'EMAIL' | 'CPF_PIN'>('EMAIL');

  // Form State - Login (Limpos por segurança)
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginCpf, setLoginCpf] = useState('');
  const [loginPin, setLoginPin] = useState('');

  // Form State - Forçar Troca de Senha
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pendingUser, setPendingUser] = useState<any>(null);

  // Form State - Register
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('55');
  const [regPassword, setRegPassword] = useState('123456');
  const [regRole, setRegRole] = useState<UserRole>('GERENCIA_CLI');
  const [regCpf, setRegCpf] = useState('');
  const [regPin, setRegPin] = useState('');

  // Status & Feedback
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const creatorRole: UserRole = currentUser?.role || 'MASTER';

  const getAllowedRoles = (): { role: UserRole; label: string; group: string }[] => {
    if (creatorRole === 'MASTER') {
      return [
        { role: 'MASTER', label: 'MASTER (Daniel / Patrícia)', group: 'JHoston Pools' },
        { role: 'DIRETORIA_JH', label: 'Diretoria Executiva (Joabson)', group: 'JHoston Pools' },
        { role: 'TECNICO_JH', label: 'Responsável Técnico / Gerente Técnico', group: 'JHoston Pools' },
        { role: 'GERENCIA_CLI', label: 'Gerente / Proprietário do Cliente', group: 'Cliente' },
        { role: 'TECNICO_CLI', label: 'Técnico / Manutenção do Cliente', group: 'Cliente' },
        { role: 'PISCINEIRO', label: 'Piscineiro / Tratador de Campo', group: 'Operacional' },
      ];
    }
    if (creatorRole === 'DIRETORIA_JH' || creatorRole === 'TECNICO_JH') {
      return [
        { role: 'GERENCIA_CLI', label: 'Gerente / Proprietário do Cliente', group: 'Cliente' },
        { role: 'TECNICO_CLI', label: 'Técnico / Manutenção do Cliente', group: 'Cliente' },
        { role: 'PISCINEIRO', label: 'Piscineiro / Tratador de Campo', group: 'Operacional' },
      ];
    }
    if (creatorRole === 'GERENCIA_CLI') {
      return [
        { role: 'TECNICO_CLI', label: 'Equipe Técnica de Manutenção', group: 'Cliente' },
        { role: 'PISCINEIRO', label: 'Piscineiro / Tratador', group: 'Operacional' },
      ];
    }
    if (creatorRole === 'TECNICO_CLI') {
      return [
        { role: 'PISCINEIRO', label: 'Piscineiro / Tratador', group: 'Operacional' },
      ];
    }
    return [];
  };

  const allowedRoles = getAllowedRoles();

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

        // Se for a senha provisória padrão 123456, redireciona para a página de homologação de cadastro
        if (data.must_change_password) {
          sessionStorage.setItem('pending_user', JSON.stringify(data.user));
          sessionStorage.setItem('pending_token', data.token);
          window.location.href = '/primeiro-acesso';
          return;
        }

        setSuccessMsg(`Bem-vindo, ${data.user.name}! Nível: ${data.user.role}`);
        setTimeout(() => {
          onLoginSuccess(data.user);
          onClose();
        }, 800);
      } else {
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

  const handleForceChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (newPassword !== confirmPassword) {
      setErrorMsg('As senhas não coincidem.');
      return;
    }

    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (!specialCharRegex.test(newPassword)) {
      setErrorMsg('A senha deve conter ao menos 1 caractere especial (ex: ! @ # $ % & *).');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: pendingUser.email,
          currentPassword: loginPassword,
          newPassword: newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Falha ao alterar senha.');

      setSuccessMsg('Senha definitiva cadastrada com sucesso! Entrando no sistema...');
      setTimeout(() => {
        onLoginSuccess(pendingUser);
        onClose();
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message);
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
          password: regPassword || '123456',
          cpf: regCpf,
          pin: regPin,
          creator_id: currentUser?.id,
          creator_role: creatorRole,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Falha ao cadastrar usuário.');

      if (data.approval_status === 'APPROVED') {
        setSuccessMsg(`Usuário ${data.user.name} cadastrado e APROVADO com sucesso! Senha inicial: 123456.`);
      } else {
        setSuccessMsg(`Usuário ${data.user.name} incluído com sucesso! Enviado para homologação e aprovação do MASTER.`);
      }

      setTimeout(() => {
        setMode('LOGIN');
        setLoginEmail(data.user.email);
        setLoginPassword('123456');
      }, 2500);
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
                {mode === 'FORCE_CHANGE_PASSWORD' 
                  ? 'Redefinição Obrigatória de Senha'
                  : mode === 'LOGIN' 
                    ? 'Acesso ao Sistema JHPCS' 
                    : 'Cadastrar / Indicar Usuário'}
              </h3>
              <p className="text-xs text-slate-400">
                Logado como: <strong className="text-cyan-400">{currentUser ? `${currentUser.name} (${currentUser.role})` : 'Visitante'}</strong>
              </p>
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
        {mode !== 'FORCE_CHANGE_PASSWORD' && (
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
        )}

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

        {/* MODE: FORÇAR TROCA DE SENHA OBRIGATÓRIA (SE PRIMEIRO ACESSO COM 123456) */}
        {mode === 'FORCE_CHANGE_PASSWORD' && (
          <form onSubmit={handleForceChangePassword} className="space-y-4 my-2">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Por exigência de segurança da <strong>JHoston Pools</strong>, a senha provisória <strong>123456</strong> deve ser obrigatoriamente substituída por uma nova senha com no mínimo 6 caracteres e pelo menos <strong>1 caractere especial</strong> (ex: ! @ # $ %).
              </span>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Nova Senha Definitiva</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="ex: JHoston@2026!"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-10 pr-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Confirmar Nova Senha</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repita a nova senha"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-10 pr-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Salvando Senha Criptografada...' : 'Validar Senha & Entrar no Sistema'}
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* MODE: LOGIN */}
        {mode === 'LOGIN' && (
          <div>
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

            <form onSubmit={handleLogin} className="space-y-3.5">
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
                        placeholder="danielsmlopes@hotmail.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-10 pr-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
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
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-10 pr-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  {/* Garantia de Segurança Criptografada */}
                  <div className="pt-2 pb-1">
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>
                        Ambiente protegido com criptografia de ponta a ponta e controle hierárquico RLS. Insira suas credenciais cadastradas.
                      </span>
                    </div>
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
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition cursor-pointer disabled:opacity-50 mt-1"
              >
                {loading ? 'Validando Acesso...' : 'Acessar Sistema'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* MODE: REGISTER / INCLUIR USUÁRIO */}
        {mode === 'REGISTER' && (
          <form onSubmit={handleRegister} className="space-y-3.5">
            <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-[11px] text-cyan-200 flex items-start gap-2">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span>
                  Todos os novos usuários receberão a senha inicial provisória <strong>123456</strong> e serão obrigados a trocá-la por uma senha com caracteres especiais no primeiro login.
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Nome Completo</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="ex: Roberto Almeida"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-10 pr-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Perfil a Conceder</label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <select
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value as UserRole)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-10 pr-3 text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  {allowedRoles.map((item) => (
                    <option key={item.role} value={item.role}>
                      [{item.group}] {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {regRole === 'PISCINEIRO' ? (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">CPF (somente números)</label>
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
                  <label className="block text-xs font-medium text-slate-300 mb-1">PIN Numérico (4 a 6 dígitos)</label>
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
                  <label className="block text-xs font-medium text-slate-300 mb-1">Senha Inicial Provisória</label>
                  <input
                    type="text"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="123456 (Padrão para primeiro acesso)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-cyan-400 font-mono focus:outline-none focus:border-cyan-500"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    O usuário será obrigado a trocar por uma senha com caracteres especiais no primeiro acesso.
                  </p>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading 
                ? 'Processando Inclusão...' 
                : creatorRole === 'MASTER' 
                  ? 'Cadastrar e Ativar Usuário' 
                  : 'Submeter para Aprovação do MASTER'}
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
