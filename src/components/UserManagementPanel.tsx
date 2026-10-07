'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  Search, 
  Mail, 
  Phone, 
  CreditCard, 
  RefreshCw,
  Building,
  CheckCircle,
  Briefcase
} from 'lucide-react';
import { UserRole } from '@/types/database';

interface UserItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  cpf?: string;
  created_at: string;
}

export function UserManagementPanel({ onOpenRegisterModal }: { onOpenRegisterModal: () => void }) {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users/create');
      const data = await res.json();
      if (data.users) {
        setUsers(data.users);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.cpf && u.cpf.includes(searchTerm));
    const matchRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'MASTER':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-950/80 text-purple-300 border border-purple-800">
            👑 MASTER (Daniel Lopes)
          </span>
        );
      case 'DIRETORIA_JH':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-950/80 text-cyan-300 border border-cyan-800">
            JH Diretoria
          </span>
        );
      case 'TECNICO_JH':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-sky-950/80 text-sky-300 border border-sky-800">
            JH Técnico Químico
          </span>
        );
      case 'GERENCIA_CLI':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-950/80 text-amber-300 border border-amber-800">
            🏢 Gerência Cliente
          </span>
        );
      case 'TECNICO_CLI':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-950/80 text-orange-300 border border-orange-800">
            🔧 Técnico Cliente
          </span>
        );
      case 'PISCINEIRO':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-950/80 text-emerald-300 border border-emerald-800">
            📱 Tratador / PWA
          </span>
        );
      default:
        return <span className="text-xs text-slate-400">{role}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">Gestão Unificada de Usuários & Acessos</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Cadastre e administre contas da Diretoria JH, Equipe Técnica, Clientes (Hotéis/Condomínios) e Piscineiros de campo.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
            title="Atualizar lista"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={onOpenRegisterModal}
            className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 hover:opacity-95 transition cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Cadastrar Novo Usuário</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome, email ou CPF..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
        >
          <option value="ALL">Todos os Perfis (RBAC)</option>
          <option value="MASTER">MASTER</option>
          <option value="DIRETORIA_JH">Diretoria JH</option>
          <option value="TECNICO_JH">Técnico JH</option>
          <option value="GERENCIA_CLI">Gerência Cliente</option>
          <option value="TECNICO_CLI">Técnico Cliente</option>
          <option value="PISCINEIRO">Piscineiro / Tratador</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Usuário</th>
                <th className="py-3 px-4">Perfil (RBAC)</th>
                <th className="py-3 px-4">Contato (WhatsApp / Email)</th>
                <th className="py-3 px-4">Identificador Acesso</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    Nenhum usuário localizado com os filtros selecionados.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{u.name}</div>
                      <div className="text-[11px] text-slate-400">{u.email}</div>
                    </td>
                    <td className="py-3 px-4">{getRoleBadge(u.role)}</td>
                    <td className="py-3 px-4 text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{u.phone}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                      {u.role === 'PISCINEIRO' ? (
                        <span className="flex items-center gap-1 text-slate-300">
                          <CreditCard className="w-3.5 h-3.5 text-cyan-400" /> CPF: {u.cpf || 'Cadastrado'} (PIN)
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-slate-300">
                          <Mail className="w-3.5 h-3.5 text-purple-400" /> E-mail + Senha
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        <CheckCircle className="w-3 h-3" /> Ativo
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
