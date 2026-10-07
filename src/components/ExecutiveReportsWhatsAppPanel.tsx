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
  Users
} from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  phone: string;
  category: string;
  company: string;
  notes?: string;
}

export function ExecutiveReportsWhatsAppPanel() {
  const [reportType, setReportType] = useState<'EXECUTIVE_SUMMARY' | 'RED_ZONE_AUDIT' | 'WARRANTY_MONTHLY' | 'INVENTORY_RUNWAY'>('EXECUTIVE_SUMMARY');
  const [recipientName, setRecipientName] = useState('');
  const [targetPhone, setTargetPhone] = useState('');
  const [customNotes, setCustomNotes] = useState('');
  
  // Agenda Telefônica
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [contactSearch, setContactSearch] = useState('');
  const [showAddContact, setShowAddContact] = useState(false);
  
  // Novo contato
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newCategory, setNewCategory] = useState('CLIENTE');

  // Estado de Envio
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Carrega contatos
  const fetchContacts = async () => {
    setLoadingContacts(true);
    try {
      const res = await fetch('/api/phonebook');
      const data = await res.json();
      if (data.contacts) {
        setContacts(data.contacts);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingContacts(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSelectContact = (contact: Contact) => {
    setRecipientName(contact.name);
    setTargetPhone(contact.phone);
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

  const handleSendReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetPhone) {
      setErrorMsg('Por favor, informe ou selecione o telefone de destino.');
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
          recipient_name: recipientName || 'Diretor / Gestor',
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
            Exclusivo para Diretoria JHoston Pools e MASTER: gere laudos consolidados e despache em tempo real via Evolution API com agenda telefônica integrada.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-950/80 text-emerald-300 border border-emerald-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Evolution API Online (ecostone)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* COLUNA ESQUERDA: Form de Seleção do Relatório e Disparo (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-5">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-black">1</span>
              Selecione o Tipo de Relatório Executivo
            </h3>

            {/* Grid de 4 Tipos de Relatórios */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  Laudo formal de preservação dos revestimentos monolíticos para encaminhar aos clientes.
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

            {/* Configuração do Destinatário & Telefone */}
            <form onSubmit={handleSendReport} className="space-y-4 pt-2 border-t border-slate-800/80">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-black">2</span>
                Destinatário & Parâmetros de Disparo
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Nome do Destinatário</label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="ex: Dr. Carlos / Gerente Fasano"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    WhatsApp de Destino (qualquer número ou da agenda)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={targetPhone}
                      onChange={(e) => setTargetPhone(e.target.value)}
                      placeholder="ex: 5511999998888 ou 11999998888"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Observações Personalizadas da Diretoria (Opcional)
                </label>
                <textarea
                  rows={2}
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="ex: 'Favor priorizar a checagem das bombas nesta sexta-feira conforme acordado em reunião.'"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
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
                      Relatório Enviado com Sucesso via WhatsApp!
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
                {sending ? 'Disparando via Evolution API...' : 'Disparar Relatório no WhatsApp Agora'}
              </button>
            </form>
          </div>
        </div>

        {/* COLUNA DIREITA: Agenda Telefônica Integrada (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookUser className="w-4 h-4 text-cyan-400" />
                <h3 className="font-bold text-sm text-white">Agenda Telefônica do Usuário</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddContact(!showAddContact)}
                className="px-2.5 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-lg text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                {showAddContact ? 'Fechar' : '+ Novo Contato'}
              </button>
            </div>

            <p className="text-[11px] text-slate-400">
              Clique em qualquer contato para preencher automaticamente o número no relatório ou cadastre novos parceiros e diretores.
            </p>

            {/* Modal Inline: Adicionar Contato à Agenda */}
            {showAddContact && (
              <form onSubmit={handleCreateContact} className="p-3.5 rounded-xl bg-slate-950 border border-cyan-900/60 space-y-3 animate-fadeIn">
                <h4 className="text-xs font-bold text-cyan-300">Salvar Novo Telefone na Agenda</h4>
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
                placeholder="Buscar na agenda por nome, telefone ou empresa..."
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
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
