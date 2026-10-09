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
  Crown
} from 'lucide-react';

export const metadata = {
  title: 'JHPCS — Apresentação Executiva para a Diretoria JHoston Pools',
  description: 'Plataforma de Engenharia, Digital Twin & Auditoria Forense para Blindagem da Garantia Decenal de Revestimentos Monolíticos.',
};

export default function ApresentacaoDiretoriaPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo JHPCS" className="h-10 w-10 object-contain" />
            <div>
              <span className="text-[10px] font-mono font-black text-amber-400 uppercase tracking-widest block">
                EXECUTIVE VIP EDITION • 2026
              </span>
              <h1 className="text-lg font-black text-white">JHoston Pools Control System</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/api/pdf/executive-magazine"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition shadow-md shadow-amber-500/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar Revista em PDF</span>
            </a>
            <Link
              href="/"
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-slate-800 transition"
            >
              Acessar Portal
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800/60 text-amber-400 font-mono text-xs font-bold">
          <Crown className="w-3.5 h-3.5" />
          HOMOLOGAÇÃO EXECUTIVA OFICIAL
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-4xl">
          A Revolução da Blindagem Decenal & Telemetria F1 de Piscinas Monolíticas
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          Esta plataforma foi concebida sob medida para solucionar de forma definitiva o maior desafio da indústria de revestimentos monolíticos e piscinas de areia: 
          <strong> blindar a JHoston Pools juridicamente contra garantias indevidas provocadas por tratadores despreparados</strong>, 
          ao mesmo tempo em que entregamos aos clientes uma experiência de inteligência e telemetria comparável à Fórmula 1.
        </p>

        {/* Box de Credenciais Homologadas */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-3xl">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">Credenciais Oficiais da Diretoria</span>
            <div className="text-xs text-slate-200">
              <strong>Login:</strong> <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded">jhostontec@jhostontec.com.br</code>
            </div>
            <div className="text-xs text-slate-200">
              <strong>Senha Provisória:</strong> <code className="text-amber-300 bg-slate-950 px-2 py-0.5 rounded">123456</code>
            </div>
          </div>

          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition"
          >
            <span>Entrar no Sistema</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 5 Pilares de Proteção */}
      <section className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-white border-b border-slate-800 pb-4">
          Os 5 Grandes Pilares do JHPCS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Cockpit de Telemetria F1</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tacômetros em tempo real para pH (7.2 - 7.6), Cloro ppm e Alcalinidade, acoplados à equação termodinâmica de Langelier (LSI) e previsão de chuvas da OpenWeather.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-950 border border-red-800 flex items-center justify-center text-red-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Escudo Jurídico Antifraude</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tolerância zero ao uso de ácido muriático ou limpa pedras. A IA detecta violações na borda e gera prontuário pericial inviolável com GPS e fotos ao vivo.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
              <Send className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">WhatsApp Automatizado</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Envio instantâneo do laudo mensal em PDF e alertas de emergência via Evolution API diretamente no WhatsApp dos clientes e diretores em menos de 3.2 segundos.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">PWA Offline do Piscineiro</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Aplicativo independente na rota <code>/pwa</code>, funcionando em subsolos e casas de máquinas sem sinal de internet com sincronização automática.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-800 flex items-center justify-center text-amber-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Loja de Insumos B2B</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cálculo estequiométrico por m³ que prevê quando o estoque de cloro e barrilha vai acabar, gerando pedidos automáticos de insumos homologados.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-400 mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Manuais Oficiais (MD)</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Acesse a documentação técnica, fluxos de uso e regras de negócio para todos os perfis.
              </p>
              <div className="flex flex-col gap-2">
                <a href="/manuais/MANUAL_USUARIO_MASTER.md" target="_blank" className="text-[11px] font-bold text-slate-300 hover:text-white flex items-center gap-1.5 bg-slate-950 p-2 rounded-lg border border-slate-800 transition">
                  <ExternalLink className="w-3 h-3 text-cyan-400" />
                  Manual do Master
                </a>
                <a href="/manuais/MANUAL_USUARIO_PISCINEIRO.md" target="_blank" className="text-[11px] font-bold text-slate-300 hover:text-white flex items-center gap-1.5 bg-slate-950 p-2 rounded-lg border border-slate-800 transition">
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                  Manual do Piscineiro
                </a>
                <a href="/manuais/MANUAL_USUARIO_CLIENTE_FINAL.md" target="_blank" className="text-[11px] font-bold text-slate-300 hover:text-white flex items-center gap-1.5 bg-slate-950 p-2 rounded-lg border border-slate-800 transition">
                  <ExternalLink className="w-3 h-3 text-amber-400" />
                  Manual do Cliente Final
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <p>JHoston Pools Control System • Engenharia de Revestimentos Monolíticos</p>
        <p className="mt-1 font-mono text-[11px] text-cyan-400">jcs-pools.vercel.app</p>
      </footer>
    </div>
  );
}
