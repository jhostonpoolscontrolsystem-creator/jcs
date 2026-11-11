'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  LogIn, 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle, 
  RefreshCw, 
  Crown,
  KeyRound,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Por favor, preencha seu e-mail e sua senha.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Credenciais inválidas. Verifique seu e-mail e senha.');
      }

      toast.success(`Bem-vindo(a), ${data.user?.name || 'Operador'}!`);
      
      // Salva dados de sessão no localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('jhpcs_user', JSON.stringify(data.user));
      }

      // Redireciona para o Cockpit / Dashboard
      router.push('/cockpit');
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro ao realizar login. Tente novamente.');
      toast.error(err.message || 'Erro na autenticação.');
    } finally {
      setLoading(false);
    }
  };

  const fillQuickAccess = (userEmail: string, pass: string) => {
    setEmail(userEmail);
    setPassword(pass);
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-[#080C16] text-slate-200 flex flex-col justify-between relative overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* GLOWS DE FUNDO */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-cyan-500/10 via-blue-600/5 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="fixed -bottom-40 -right-40 w-[500px] h-[500px] bg-amber-500/5 blur-[150px] pointer-events-none -z-10" />

      {/* CABEÇALHO COMPACTO */}
      <header className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <Link href="/" className="inline-block group">
          <Image
            src="/images/jhpcs-full-logo.png"
            alt="JHPCS PoolTech Ecosystem"
            width={210}
            height={50}
            priority
            className="h-10 w-auto object-contain group-hover:brightness-110 transition-all duration-300"
          />
        </Link>

        <Link
          href="/onboarding"
          className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition flex items-center gap-1.5"
        >
          <span>Criar Conta Nova</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </header>

      {/* ÁREA CENTRAL DE LOGIN */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-md w-full space-y-8">
          
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>PORTAL DE ACESSO CORPORATIVO</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Acesse sua Conta
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Digite suas credenciais corporativas para entrar na plataforma.
            </p>
          </div>

          {/* CARD PRINCIPAL DO FORMULÁRIO */}
          <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">
            
            {errorMsg && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                <span className="leading-relaxed">{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>E-mail Corporativo</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@empresa.com.br"
                  required
                  autoFocus
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Senha de Acesso</span>
                  </label>
                  <a
                    href="https://wa.me/5511999998888?text=Ol%C3%A1%2C%20esqueci%20minha%20senha%20de%20acesso%20ao%20JHPCS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-slate-400 hover:text-cyan-400 transition"
                  >
                    Esqueceu a senha?
                  </a>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:brightness-110 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Autenticando...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Entrar no Sistema</span>
                  </>
                )}
              </button>
            </form>

            {/* SEPARADOR */}
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-800" />
              <span className="flex-shrink mx-3 text-[10px] uppercase font-mono text-slate-500 font-bold">
                Acessos de Demonstração & Master
              </span>
              <div className="flex-grow border-t border-slate-800" />
            </div>

            {/* ATALHOS RÁPIDOS PARA HOMOLOGAÇÃO / DEMO */}
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => fillQuickAccess('danielsmlopes@hotmail.com', 'Gabriel2006!')}
                  className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/30 hover:border-amber-400 text-amber-300 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer text-left"
                >
                  <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">Master (Daniel)</span>
                </button>

                <button
                  type="button"
                  onClick={() => fillQuickAccess('patigrubel@gmail.com', 'Maraca132')}
                  className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/30 hover:border-amber-400 text-amber-300 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer text-left"
                >
                  <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">Master (Patrícia)</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => fillQuickAccess('teste.solo@teste.com', 'teste123')}
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-slate-300 text-[11px] font-semibold transition text-center cursor-pointer truncate"
                >
                  Demo Solo (Tratador)
                </button>
                <button
                  type="button"
                  onClick={() => fillQuickAccess('teste.frota@teste.com', 'teste123')}
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-slate-300 text-[11px] font-semibold transition text-center cursor-pointer truncate"
                >
                  Demo Frota (Gestor)
                </button>
              </div>
            </div>

          </div>

          <div className="text-center">
            <p className="text-xs text-slate-500">
              Ainda não tem conta?{' '}
              <Link href="/onboarding" className="text-cyan-400 hover:underline font-bold">
                Inicie seu Teste Gratuito de 7 Dias
              </Link>
            </p>
          </div>

        </div>
      </main>

      {/* RODAPÉ COMPACTO */}
      <footer className="py-6 px-4 text-center border-t border-slate-800/80 text-[11px] text-slate-500">
        <p>
          © 2026 JHPCS PoolTech Ecosystem. Desenvolvido por{' '}
          <Link href="/gadap" className="text-slate-400 hover:text-cyan-400 underline transition">
            GADAP Engenharia & Sistemas
          </Link>
          .
        </p>
      </footer>

    </div>
  );
}

