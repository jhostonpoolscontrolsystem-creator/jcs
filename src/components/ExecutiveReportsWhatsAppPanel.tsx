'use client';

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Send, 
  BookUser, 
  Phone, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  Package, 
  RefreshCw,
  Search,
  PlusCircle,
  Copy,
  ExternalLink,
  MessageSquare,
  Users,
  Trash2,
  Bookmark
} from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  phone: string;
  category: string;
  company: string;
  notes?: string;
}

interface WhatsAppGroup {
  id: string;
  name: string;
  jid: string;
  category: string;
  description?: string;
}

interface ExecutiveReportsWhatsAppPanelProps {
  currentUserRole?: string;
}

// Cache persistente na sessão do cliente para eliminar chamadas duplicadas
let cachedContacts: Contact[] | null = null;
let cachedGroups: WhatsAppGroup[] | null = null;

export function ExecutiveReportsWhatsAppPanel({ currentUserRole = 'MASTER' }: ExecutiveReportsWhatsAppPanelProps) {
  const isMaster = currentUserRole === 'MASTER';
  const [reportType, setReportType] = useState<'EXECUTIVE_SUMMARY' | 'RED_ZONE_AUDIT' | 'WARRANTY_MONTHLY' | 'INVENTORY_RUNWAY'>('EXECUTIVE_SUMMARY');
  const [recipientName, setRecipientName] = useState('');
  const [targetPhone, setTargetPhone] = useState('');
  const [customNotes, setCustomNotes] = useState('');
  
  // Abas do catálogo de contatos: Pessoas vs Grupos (Default: GROUPS para Master, CONTACTS para outros)
  const [addressBookTab, setAddressBookTab] = useState<'CONTACTS' | 'GROUPS'>(isMaster ? 'GROUPS' : 'CONTACTS');

  // Agenda Telefônica (Pessoas)
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [contactSearch, setContactSearch] = useState('');
  const [showAddContact, setShowAddContact] = useState(false);
  
  // Novo contato
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newCategory, setNewCategory] = useState('CLIENTE');

  // Grupos de WhatsApp
  const [groups, setGroups] = useState<WhatsAppGroup[]>([]);
  const [loadingGroups, setLoadingGroups] = useState(false);
  const [groupSearch, setGroupSearch] = useState('');
  const [showAddGroup, setShowAddGroup] = useState(false);

  // Novo Grupo
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupJid, setNewGroupJid] = useState('');
  const [newGroupCategory, setNewGroupCategory] = useState('CLIENTE');
  const [newGroupDescription, setNewGroupDescription] = useState('');

  // Cache em memória para evitar requisições repetidas ao alternar abas
  // Estado de Envio
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Carrega contatos com cache
  const fetchContacts = async (force: boolean = false) => {
    if (!force && cachedContacts && cachedContacts.length > 0) {
      setContacts(cachedContacts);
      return;
    }
    setLoadingContacts(true);
    try {
      const res = await fetch('/api/phonebook');
      const data = await res.json();
      if (data.contacts) {
        cachedContacts = data.contacts;
        setContacts(data.contacts);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingContacts(false);
    }
  };

  // Carrega Grupos de WhatsApp com cache
  const fetchGroups = async (force: boolean = false) => {
    if (!force && cachedGroups && cachedGroups.length > 0) {
      setGroups(cachedGroups);
      return;
    }
    setLoadingGroups(true);
    try {
      const res = await fetch('/api/whatsapp-groups');
      const data = await res.json();
      if (data.groups) {
        cachedGroups = data.groups;
        setGroups(data.groups);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingGroups(false);
    }
  };

  useEffect(() => {
    fetchContacts();
    fetchGroups();
  }, []);

  const handleSelectContact = (contact: Contact) => {
    setRecipientName(contact.name);
    setTargetPhone(contact.phone);
  };

  const handleSelectGroup = (group: WhatsAppGroup) => {
    setRecipientName(`Grupo: ${group.name}`);
    setTargetPhone(group.jid);
  };

  const handleCreateContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone) return;

    try {
      const res = await fetch('/api/phonebook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName,
          phone: newPhone,
          company: newCompany,
          category: newCategory,
        }),
      });
      const data = await res.json();
      if (data.contact) {
        setContacts(prev => [data.contact, ...prev]);
        setRecipientName(data.contact.name);
        setTargetPhone(data.contact.phone);
        setShowAddContact(false);
        setNewName('');
        setNewPhone('');
        setNewCompany('');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteContact = async (contactId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Deseja realmente excluir este contato da agenda?')) return;

    try {
      const res = await fetch(`/api/phonebook?id=${contactId}`, { method: 'DELETE' });
      if (res.ok) {
        setContacts(prev => prev.filter(c => c.id !== contactId));
        if (targetPhone === contacts.find(c => c.id === contactId)?.phone) {
          setTargetPhone('');
          setRecipientName('');
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName || !newGroupJid) return;

    try {
      const res = await fetch('/api/whatsapp-groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newGroupName,
          jid: newGroupJid,
          category: newGroupCategory,
          description: newGroupDescription,
        }),
      });
      const data = await res.json();
      if (data.group) {
        setGroups(prev => [data.group, ...prev]);
        setRecipientName(`Grupo: ${data.group.name}`);
        setTargetPhone(data.group.jid);
        setShowAddGroup(false);
        setNewGroupName('');
        setNewGroupJid('');
        setNewGroupDescription('');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteGroup = async (groupId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Deseja realmente remover este grupo da lista de transmissão?')) return;

    try {
      const res = await fetch(`/api/whatsapp-groups?id=${groupId}`, { method: 'DELETE' });
      if (res.ok) {
        setGroups(prev => prev.filter(g => g.id !== groupId));
        if (targetPhone === groups.find(g => g.id === groupId)?.jid) {
          setTargetPhone('');
          setRecipientName('');
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetPhone) {
      setErrorMsg('Por favor, informe ou selecione o telefone ou grupo de destino.');
      return;
    }

    if (targetPhone.includes('@g.us') && !isMaster) {
      setErrorMsg('Permissão Restrita: O disparo de relatórios para GRUPOS de WhatsApp está autorizado temporariamente apenas para o usuário MASTER.');
      return;
    }

    setSending(true);
    setSendResult(null);
    setErrorMsg('');

    try {
      const res = await fetch('/api/reports/whatsapp-dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          report_type: reportType,
          target_phone: targetPhone,
          recipient_name: recipientName || 'Diretor / Gestor / Grupo',
          notes: customNotes,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Falha no disparo do relatório.');
      setSendResult(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro ao enviar relatório via WhatsApp.');
    } finally {
      setSending(false);
    }
  };

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
    c.phone.includes(contactSearch) ||
    c.company.toLowerCase().includes(contactSearch.toLowerCase())
  );

  const filteredGroups = groups.filter(g => 
    g.name.toLowerCase().includes(groupSearch.toLowerCase()) ||
    g.jid.toLowerCase().includes(groupSearch.toLowerCase()) ||
    (g.description && g.description.toLowerCase().includes(groupSearch.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-800 text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-black text-white">Central de Relatórios Executivos & Disparo WhatsApp</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Exclusivo para Diretoria JHoston Pools e MASTER: despache laudos e comunicados em tempo real tanto para <span className="text-cyan-400 font-semibold">contatos individuais</span> quanto para <span className="text-emerald-400 font-semibold">Grupos Oficiais do WhatsApp</span>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Evolution API Conectada
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* COLUNA ESQUERDA: Tipos de Relatório e Formulário de Disparo (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-black">1</span>
              Selecione o Formato do Laudo Executivo
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setReportType('EXECUTIVE_SUMMARY')}
                className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                  reportType === 'EXECUTIVE_SUMMARY'
                    ? 'border-cyan-500 bg-cyan-950/40 text-white shadow-lg shadow-cyan-950/50'
                    : 'border-slate-800/80 bg-slate-950/50 text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs text-cyan-300 mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  Panorama Geral dos Ativos
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Consolidação do total de piscinas, percentual de conformidade e status das curas de 28 dias.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setReportType('RED_ZONE_AUDIT')}
                className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                  reportType === 'RED_ZONE_AUDIT'
                    ? 'border-rose-500 bg-rose-950/40 text-white shadow-lg shadow-rose-950/50'
                    : 'border-slate-800/80 bg-slate-950/50 text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs text-rose-300 mb-1">
                  <AlertTriangle className="w-4 h-4" />
                  Boletim Crítico (Red Zone)
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Piscinas com pH ácido (&lt; 7.0), risco de perda de garantia e alertas de dosagem corretiva.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setReportType('WARRANTY_MONTHLY')}
                className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                  reportType === 'WARRANTY_MONTHLY'
                    ? 'border-emerald-500 bg-emerald-950/40 text-white shadow-lg shadow-emerald-950/50'
                    : 'border-slate-800/80 bg-slate-950/50 text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs text-emerald-300 mb-1">
                  <FileText className="w-4 h-4" />
                  Certificado de Garantia Mensal
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Laudo formal de preservação dos revestimentos monolíticos para encaminhar aos clientes ou grupos.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setReportType('INVENTORY_RUNWAY')}
                className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                  reportType === 'INVENTORY_RUNWAY'
                    ? 'border-amber-500 bg-amber-950/40 text-white shadow-lg shadow-amber-950/50'
                    : 'border-slate-800/80 bg-slate-950/50 text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs text-amber-300 mb-1">
                  <Package className="w-4 h-4" />
                  Balanço Preditivo de Estoque
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Autonomia em dias de cloro e barrilha, sugerindo pedidos de compras automáticos.
                </p>
              </button>
            </div>

            {/* Configuração do Destinatário & Telefone / Grupo */}
            <form onSubmit={handleSendReport} className="space-y-4 pt-2 border-t border-slate-800/80">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-black">2</span>
                Destinatário & Parâmetros de Disparo
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Nome do Destinatário ou Grupo</label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="ex: 'Diretoria JHoston' ou 'Grupo Terravista'"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    {targetPhone.includes('@g.us') ? 'ID do Grupo WhatsApp (JID)' : 'WhatsApp de Destino'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={targetPhone}
                      onChange={(e) => setTargetPhone(e.target.value)}
                      placeholder="ex: 5511999998888 ou 120363023456789012@g.us"
                      className={`w-full bg-slate-950 border rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none font-mono ${
                        targetPhone.includes('@g.us') ? 'border-emerald-500/70 text-emerald-300' : 'border-slate-800 focus:border-cyan-500'
                      }`}
                    />
                    {targetPhone.includes('@g.us') && (
                      <span className="absolute right-3 top-3 text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                        GRUPO WHATSAPP
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Nota Executiva Adicional (Opcional)</label>
                <textarea
                  rows={2}
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="ex: 'Atenção especial para a fiscalização da cura na piscina principal do resort.'"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Live Preview Card do Balão de WhatsApp */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <MessageSquare className="w-3.5 h-3.5" />
                    Pré-visualização do Balão WhatsApp (Tempo Real):
                  </span>
                  <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-emerald-400 border border-slate-800">
                    {targetPhone.includes('@g.us') ? 'Modo: Broadcast Grupo' : 'Modo: Contato Direto'}
                  </span>
                </div>
                <div className="bg-[#0b141a] p-3.5 rounded-2xl border border-emerald-950/60 font-mono text-[11px] text-slate-200 leading-relaxed shadow-inner max-h-44 overflow-y-auto whitespace-pre-wrap selection:bg-emerald-600">
                  {reportType === 'EXECUTIVE_SUMMARY' && `📊 *JHOSTON POOLS CONTROL SYSTEM*\n👑 *RELATÓRIO EXECUTIVO DA DIRETORIA*\n👤 *Destinatário:* ${recipientName || 'Diretor / Gestor / Grupo'}\n\n🏊 *PANORAMA GERAL DOS ATIVOS:*\n• Total de Piscinas: 128 ativos\n• Conformidade Química: 94.2%\n• Curas de 28 dias: 14 ativos\n• Red Zones Ativas: 3 críticas\n${customNotes ? `\n📝 *Nota:* ${customNotes}\n` : ''}\n🔗 Portal: https://jcs-pools.vercel.app`}
                  {reportType === 'RED_ZONE_AUDIT' && `🚨 *JHOSTON POOLS - AUDITORIA DE RISCO CRÍTICO*\n⚠️ *BOLETIM DE INTERVENÇÃO IMEDIATA*\n\n🔴 *PISCINAS EM ESTADO DE ATENÇÃO:*\n• Hotel Fasano: pH 6.8 (Ácido) - Risco de corrosão\nAção: Aplicar Barrilha Leve imediatamente\n${customNotes ? `\n📝 *Nota:* ${customNotes}\n` : ''}\n_Auditoria Central JHostonTec_`}
                  {reportType === 'WARRANTY_MONTHLY' && `📄 *JHOSTON POOLS - LAUDO MENSAL DE GARANTIA*\n🏆 *CERTIFICADO DE CONFORMIDADE QUÍMICA*\n👤 *Aos Cuidados:* ${recipientName || 'Cliente / Grupo'}\n\n✅ Cobertura de Garantia: ATIVA E REGULAR\n• 124 Check-ins auditados via PWA\n• 0 Incidentes com produtos abrasivos proibidos\n${customNotes ? `\n📝 *Nota:* ${customNotes}\n` : ''}`}
                  {reportType === 'INVENTORY_RUNWAY' && `📦 *JHOSTON POOLS - BALANÇO PREDITIVO DE ESTOQUE*\n👤 *Para:* ${recipientName || 'Almoxarifado'}\n\n🧪 *AUTONOMIA DOS PRODUTOS:*\n• Cloro Granulado: 18 dias restantes\n• Elevador de Alcalinidade: 24 dias restantes\n• Barrilha Leve (pH Mais): 32 dias restantes\n${customNotes ? `\n📝 *Nota:* ${customNotes}\n` : ''}`}
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                  {errorMsg}
                </div>
              )}

              {sendResult && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      {targetPhone.includes('@g.us') ? 'Relatório Enviado com Sucesso para o Grupo!' : 'Relatório Enviado com Sucesso via WhatsApp!'}
                    </span>
                    <span className="text-[11px] text-slate-400">SLA: {sendResult.sla_seconds}s</span>
                  </div>
                  <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 whitespace-pre-wrap max-h-48 overflow-y-auto">
                    {sendResult.preview_text}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {sending 
                  ? 'Disparando via Evolution API...' 
                  : targetPhone.includes('@g.us')
                    ? 'Disparar Relatório no Grupo do WhatsApp Agora'
                    : 'Disparar Relatório no WhatsApp Agora'}
              </button>
            </form>
          </div>
        </div>

        {/* COLUNA DIREITA: Catálogo Unificado de Grupos & Contatos (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
            {/* Seletor de Abas: Grupos vs Pessoas */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setAddressBookTab('GROUPS')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    addressBookTab === 'GROUPS'
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  Grupos ({groups.length})
                </button>
                <button
                  type="button"
                  onClick={() => setAddressBookTab('CONTACTS')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    addressBookTab === 'CONTACTS'
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <BookUser className="w-3.5 h-3.5" />
                  Contatos ({contacts.length})
                </button>
              </div>

              {addressBookTab === 'GROUPS' ? (
                <button
                  type="button"
                  onClick={() => setShowAddGroup(!showAddGroup)}
                  className="px-2.5 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-lg text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  {showAddGroup ? 'Fechar' : '+ Novo Grupo'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAddContact(!showAddContact)}
                  className="px-2.5 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-lg text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  {showAddContact ? 'Fechar' : '+ Novo Contato'}
                </button>
              )}
            </div>

            {/* ABA DE GRUPOS */}
            {addressBookTab === 'GROUPS' && (
              <div className="space-y-3">
                <p className="text-[11px] text-slate-400">
                  Envie laudos em lote para os grupos de gestão. Clique para selecionar ou use o botão de excluir para remover grupos antigos.
                </p>

                {/* Modal Inline: Adicionar Novo Grupo */}
                {showAddGroup && (
                  <form onSubmit={handleCreateGroup} className="p-3.5 rounded-xl bg-slate-950 border border-emerald-900/60 space-y-3 animate-fadeIn">
                    <h4 className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                      <PlusCircle className="w-3.5 h-3.5" />
                      Incluir Novo Grupo de WhatsApp
                    </h4>
                    <div className="space-y-2">
                      <input
                        type="text"
                        required
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                        placeholder="Nome do Grupo (ex: Diretoria & Engenharia)"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg py-1.5 px-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                      <input
                        type="text"
                        required
                        value={newGroupJid}
                        onChange={(e) => setNewGroupJid(e.target.value)}
                        placeholder="ID do Grupo / JID (ex: 120363023456789012@g.us)"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg py-1.5 px-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <select
                          value={newGroupCategory}
                          onChange={(e) => setNewGroupCategory(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg py-1.5 px-2 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                        >
                          <option value="DIRETORIA">Diretoria</option>
                          <option value="ENGENHARIA">Engenharia</option>
                          <option value="CLIENTE">Cliente / Resort</option>
                          <option value="OPERACIONAL">Operacional</option>
                        </select>
                        <input
                          type="text"
                          value={newGroupDescription}
                          onChange={(e) => setNewGroupDescription(e.target.value)}
                          placeholder="Finalidade do Grupo"
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg py-1.5 px-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-lg text-xs transition cursor-pointer"
                    >
                      Cadastrar Grupo na Lista
                    </button>
                  </form>
                )}

                {/* Barra de Busca de Grupos */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={groupSearch}
                    onChange={(e) => setGroupSearch(e.target.value)}
                    placeholder="Buscar grupo por nome, ID (@g.us) ou finalidade..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-8 pr-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Lista de Grupos */}
                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                  {filteredGroups.length === 0 ? (
                    <div className="text-center py-6 text-slate-500 text-xs">
                      Nenhum grupo encontrado.
                    </div>
                  ) : (
                    filteredGroups.map((group) => (
                      <div
                        key={group.id}
                        onClick={() => handleSelectGroup(group)}
                        className={`p-3 rounded-xl border text-left transition cursor-pointer flex items-center justify-between ${
                          targetPhone === group.jid
                            ? 'border-emerald-500 bg-emerald-950/40 text-white'
                            : 'border-slate-800/80 bg-slate-950/40 hover:bg-slate-800/40 text-slate-300'
                        }`}
                      >
                        <div className="pr-2">
                          <div className="font-bold text-xs text-white flex items-center gap-1.5">
                            <span>{group.name}</span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                              {group.category}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate max-w-[200px]">
                            {group.jid}
                          </div>
                          {group.description && (
                            <p className="text-[10px] text-slate-500 mt-0.5 italic truncate max-w-[220px]">
                              {group.description}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectGroup(group);
                            }}
                            className="px-2.5 py-1 bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 text-slate-300 rounded-lg text-[10px] font-bold border border-slate-700 transition"
                          >
                            Usar
                          </button>
                          <button
                            type="button"
                            title="Excluir grupo antigo"
                            onClick={(e) => handleDeleteGroup(group.id, e)}
                            className="p-1 hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 rounded-lg transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ABA DE CONTATOS INDIVIDUAIS */}
            {addressBookTab === 'CONTACTS' && (
              <div className="space-y-3">
                <p className="text-[11px] text-slate-400">
                  Dispare para gerentes, síndicos ou tratadores específicos. Clique para selecionar ou use a lixeira para remover.
                </p>

                {/* Modal Inline: Adicionar Contato à Agenda */}
                {showAddContact && (
                  <form onSubmit={handleCreateContact} className="p-3.5 rounded-xl bg-slate-950 border border-cyan-900/60 space-y-3 animate-fadeIn">
                    <h4 className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                      <PlusCircle className="w-3.5 h-3.5" />
                      Salvar Novo Contato na Agenda
                    </h4>
                    <div className="space-y-2">
                      <input
                        type="text"
                        required
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Nome do Contato (ex: Diretor Comercial)"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg py-1.5 px-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                      <input
                        type="text"
                        required
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        placeholder="WhatsApp (ex: 5511999998888)"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg py-1.5 px-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={newCompany}
                          onChange={(e) => setNewCompany(e.target.value)}
                          placeholder="Empresa / Hotel"
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg py-1.5 px-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                        />
                        <select
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg py-1.5 px-2 text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                        >
                          <option value="DIRETORIA_JH">Diretoria JH</option>
                          <option value="TECNICO_JH">Técnico JH</option>
                          <option value="CLIENTE">Cliente / Resort</option>
                          <option value="PISCINEIRO">Piscineiro</option>
                        </select>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-lg text-xs transition cursor-pointer"
                    >
                      Salvar na Agenda
                    </button>
                  </form>
                )}

                {/* Barra de Busca na Agenda */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={contactSearch}
                    onChange={(e) => setContactSearch(e.target.value)}
                    placeholder="Buscar por nome, telefone ou empresa..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-8 pr-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Lista Rolável de Contatos */}
                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                  {filteredContacts.length === 0 ? (
                    <div className="text-center py-6 text-slate-500 text-xs">
                      Nenhum contato encontrado.
                    </div>
                  ) : (
                    filteredContacts.map((contact) => (
                      <div
                        key={contact.id}
                        onClick={() => handleSelectContact(contact)}
                        className={`p-3 rounded-xl border text-left transition cursor-pointer flex items-center justify-between ${
                          targetPhone === contact.phone
                            ? 'border-cyan-500/80 bg-cyan-950/40 text-white'
                            : 'border-slate-800/80 bg-slate-950/40 hover:bg-slate-800/40 text-slate-300'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-xs text-white flex items-center gap-1.5">
                            <span>{contact.name}</span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                              {contact.company}
                            </span>
                          </div>
                          <div className="text-[11px] text-cyan-400 font-mono mt-0.5 flex items-center gap-1">
                            <Phone className="w-3 h-3 text-emerald-400" />
                            <span>{contact.phone}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectContact(contact);
                            }}
                            className="px-2.5 py-1 bg-slate-900 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 rounded-lg text-[10px] font-bold border border-slate-700 transition"
                          >
                            Usar
                          </button>
                          <button
                            type="button"
                            title="Excluir contato"
                            onClick={(e) => handleDeleteContact(contact.id, e)}
                            className="p-1 hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 rounded-lg transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
