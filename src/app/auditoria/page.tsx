'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Activity, Search, RefreshCw, AlertTriangle, UserCheck } from 'lucide-react';
import { format } from 'date-fns';

export default function AuditoriaPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLogs = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/audit/logs');
      const data = await res.json();
      if (data.success) {
        setLogs(data.logs);
      } else {
        setError(data.error || 'Erro ao carregar logs.');
      }
    } catch (err) {
      setError('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Ideally check if user is MASTER or DIRETORIA_JH from context
    // Assuming the user reaching this page is authorized (you can add a context check)
    fetchLogs();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <h1 className="text-2xl font-black text-white">Central de Auditoria</h1>
            </div>
            <p className="text-sm text-slate-400">Monitoramento Inviolável de Acessos e Ações no JHPCS</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={fetchLogs}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-sm font-bold transition"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </button>
            <Link 
              href="/"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-bold transition"
            >
              Voltar ao Portal
            </Link>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-950/50 border border-red-900 text-red-400 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5" />
            <p className="text-sm">A tabela <code>audit_logs</code> ainda não foi criada no Supabase ou houve um erro: {error}</p>
          </div>
        )}

        {/* Filters/Search (Visual mock) */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Buscar por email, ação..." 
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-300 focus:outline-none focus:border-cyan-500 transition"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/50 border-b border-slate-800 text-xs text-slate-400 uppercase tracking-wider">
                  <th className="p-4 font-bold">Data / Hora</th>
                  <th className="p-4 font-bold">Usuário (E-mail)</th>
                  <th className="p-4 font-bold">Ação</th>
                  <th className="p-4 font-bold">Detalhes</th>
                  <th className="p-4 font-bold">IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">
                      <Activity className="w-6 h-6 animate-pulse mx-auto mb-2 text-cyan-500" />
                      Carregando logs invioláveis...
                    </td>
                  </tr>
                ) : logs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">
                      Nenhum registro de auditoria encontrado.
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-800/30 transition">
                      <td className="p-4 whitespace-nowrap text-slate-300">
                        {format(new Date(log.created_at), "dd/MM/yyyy 'às' HH:mm:ss")}
                      </td>
                      <td className="p-4 font-medium text-slate-200 flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-slate-500" />
                        {log.user_email}
                      </td>
                      <td className="p-4">
                        <span className="inline-flex px-2 py-1 rounded bg-slate-950 border border-slate-700 text-[10px] font-mono font-bold text-cyan-400">
                          {log.action}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400 truncate max-w-xs" title={log.details}>
                        {log.details}
                      </td>
                      <td className="p-4 text-slate-500 font-mono text-xs">
                        {log.ip_address}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
