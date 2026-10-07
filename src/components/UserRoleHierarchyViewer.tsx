'use client';

import React from 'react';
import { ShieldCheck, UserCheck, Lock, CheckCircle2, XCircle, Users } from 'lucide-react';
import { ROLE_DEFINITIONS } from '@/lib/rbac';
import { UserRole } from '@/types/database';

interface UserRoleSwitcherProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export function UserRoleHierarchyViewer({ currentRole, onRoleChange }: UserRoleSwitcherProps) {
  const roles: UserRole[] = [
    'MASTER',
    'DIRETORIA_JH',
    'TECNICO_JH',
    'GERENCIA_CLI',
    'TECNICO_CLI',
    'PISCINEIRO',
  ];

  const currentDef = ROLE_DEFINITIONS[currentRole];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Hierarquia de Acesso & Perfis (RBAC)</h3>
            <p className="text-xs text-slate-400">Controle Estrito de Permissões e Blindagem de Dados no Supabase</p>
          </div>
        </div>

        {/* Simulador de Perfil Ativo */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold">Simular Visão Como:</span>
          <select
            value={currentRole}
            onChange={(e) => onRoleChange(e.target.value as UserRole)}
            className="bg-slate-950 border border-slate-700 text-cyan-400 font-bold text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {ROLE_DEFINITIONS[r].label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid de Níveis Hierárquicos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Nível 1: JHostonTec */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
            <span className="text-[11px] font-black uppercase tracking-wider text-cyan-400">
              Nível 1: JHostonTec (Auditoria)
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {['MASTER', 'DIRETORIA_JH', 'TECNICO_JH'].map((r) => {
              const def = ROLE_DEFINITIONS[r as UserRole];
              const isSelected = currentRole === r;
              return (
                <div
                  key={r}
                  onClick={() => onRoleChange(r as UserRole)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-950/50 border-cyan-500 text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-800/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-xs">{def.label.split('(')[0]}</span>
                    {isSelected && <span className="text-[10px] text-cyan-400 font-mono">Ativo</span>}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">{def.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Nível 2: O Cliente */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-400">
              Nível 2: O Cliente (B2B / B2C)
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {['GERENCIA_CLI', 'TECNICO_CLI'].map((r) => {
              const def = ROLE_DEFINITIONS[r as UserRole];
              const isSelected = currentRole === r;
              return (
                <div
                  key={r}
                  onClick={() => onRoleChange(r as UserRole)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-950/40 border-amber-500 text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-800/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-xs">{def.label.split('(')[0]}</span>
                    {isSelected && <span className="text-[10px] text-amber-400 font-mono">Ativo</span>}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">{def.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Nível 3: Prestador de Serviço */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400">
              Nível 3: Operação de Campo
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {['PISCINEIRO'].map((r) => {
              const def = ROLE_DEFINITIONS[r as UserRole];
              const isSelected = currentRole === r;
              return (
                <div
                  key={r}
                  onClick={() => onRoleChange(r as UserRole)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-800/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-xs">{def.label.split('(')[0]}</span>
                    {isSelected && <span className="text-[10px] text-emerald-400 font-mono">Ativo</span>}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">{def.description}</p>
                </div>
              );
            })}

            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <span className="font-bold text-slate-300 block">Blindagem RLS (Row Level Security):</span>
              <p>O tratador só tem permissão de INSERT diário nas piscinas da sua rota. Não possui visualização comercial, valores nem laudos de outros clientes.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Matriz de Permissões do Perfil Selecionado */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
        <h4 className="font-bold text-xs text-white uppercase tracking-wider">
          Matriz de Acessos para: <span className="text-cyan-400">{currentDef.label}</span>
        </h4>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">Parametrização Master:</span>
            {currentDef.permissions.canAccessMasterSettings ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <XCircle className="w-4 h-4 text-slate-600" />
            )}
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">Visão Global BI:</span>
            {currentDef.permissions.canViewGlobalBI ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <XCircle className="w-4 h-4 text-slate-600" />
            )}
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">Suspender Garantia:</span>
            {currentDef.permissions.canSuspendWarranty ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <XCircle className="w-4 h-4 text-slate-600" />
            )}
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">Aprovar Compra Insumos:</span>
            {currentDef.permissions.canApproveChemicalPurchases ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <XCircle className="w-4 h-4 text-slate-600" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
