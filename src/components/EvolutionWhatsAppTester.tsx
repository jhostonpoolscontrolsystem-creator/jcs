'use client';

import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  FileText,
  PhoneCall,
  Sparkles,
  Zap
} from 'lucide-react';
import { mockPools } from '@/lib/mock-data';

export function EvolutionWhatsAppTester() {
  const [targetPhone, setTargetPhone] = useState('5511999998888');
  const [alertType, setAlertType] = useState<'RED_ZONE_ALERT' | 'WARRANTY_SUSPENSION' | 'CHATBOT_QUERY' | 'AI_MULTIMODAL_IMAGE' | 'RELATORIO_MENSAL'>('RED_ZONE_ALERT');
  const [customPh, setCustomPh] = useState(6.8);
  const [loading, setLoading] = useState(false);
  const [dispatchResult, setDispatchResult] = useState<any>(null);

  const pool = mockPools[1]; // Fasano

  const handleSendTest = async () => {
    setLoading(true);
    setDispatchResult(null);

    try {
      const res = await fetch('/api/evolution/send-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pool_id: pool.id,
          pool_name: pool.name,
          maintainer_name: 'João Tratador',
          target_phone: targetPhone,
          alert_type: alertType,
          details: {
            ph: customPh,
            chlorine_ppm: 1.2,
            violation: 'Check-in de Limpa Pedras / Ácido Muriático',
            health_score: 98,
            stock_runway_days: 14,
          },
        }),
      });

      const data = await res.json();
      setDispatchResult(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-emerald-950 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Comunicação Ativa & Chatbot Preditivo (Evolution API)</h3>
            <p className="text-xs text-slate-400">Mensageria WhatsApp oficial JHostonTec • SLA Crítico &lt; 10s</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 font-bold border border-emerald-800/40 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Evolution Docker Conectado
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Painel de Disparo de Teste */}
        <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
          <h4 className="font-bold text-xs text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-cyan-400" />
            1. Simular Disparo de Notificação
          </h4>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Tipo de Evento:</label>
            <select
              value={alertType}
              onChange={(e) => setAlertType(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium"
            >
              <option value="RED_ZONE_ALERT">🚨 Alerta Crítico B2B (pH &lt; 7.0 Corrosão)</option>
              <option value="WARRANTY_SUSPENSION">🚨 Perda de Garantia (Uso de Limpa Pedras)</option>
              <option value="CHATBOT_QUERY">🟢 Resposta Chatbot Preditivo (Status Piscina)</option>
              <option value="AI_MULTIMODAL_IMAGE">📸 Assistente Técnico IA: Foto de Água/Monólito (Fase 2)</option>
              <option value="RELATORIO_MENSAL">📄 Laudo Mensal em PDF Automático</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Número de Telefone (WhatsApp):</label>
            <input
              type="text"
              value={targetPhone}
              onChange={(e) => setTargetPhone(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
              placeholder="5511999999999"
            />
          </div>

          {alertType === 'RED_ZONE_ALERT' && (
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>pH da Simulação:</span>
                <span className="font-bold text-red-400 font-mono">{customPh.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="6.5"
                max="6.9"
                step="0.1"
                value={customPh}
                onChange={(e) => setCustomPh(Number(e.target.value))}
                className="w-full accent-red-500 cursor-pointer"
              />
            </div>
          )}

          <button
            onClick={handleSendTest}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Disparando via Webhook...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Testar Envio via WhatsApp (SLA &lt; 10s)</span>
              </>
            )}
          </button>
        </div>

        {/* Visualização de Simulação do WhatsApp */}
        <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-emerald-400" />
              2. Interface do Chatbot / Mensagem Recebida
            </h4>

            {/* Balão de Mensagem WhatsApp */}
            <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-2xl p-4 text-xs space-y-2 text-slate-200 shadow-md">
              <div className="flex justify-between items-center text-[10px] text-emerald-400 font-bold border-b border-emerald-900/60 pb-1.5">
                <span>JHoston Pools Oficial • Bot Auditor</span>
                <span>Agora</span>
              </div>
              <p className="leading-relaxed font-sans whitespace-pre-wrap">
                {dispatchResult ? dispatchResult.message_sent : (
                  alertType === 'RED_ZONE_ALERT'
                    ? `🚨 JHoston Pools Informa: Detectamos pH de risco (${customPh.toFixed(1)}) na piscina ${pool.name}. Orientamos intervenção imediata para proteção do revestimento monolítico.`
                    : alertType === 'WARRANTY_SUSPENSION'
                    ? `🚨 RED ZONE CRÍTICA: ${pool.name} | Tratador: João | Falha: Check-in de Limpa Pedras / Ácido. Analisar perda de garantia.`
                    : alertType === 'AI_MULTIMODAL_IMAGE'
                    ? `🤖 Auditor de IA JHostonTec (Análise de Imagem):\nRecebemos a foto da piscina ${pool.name}.\n\n🔬 Diagnóstico Multimodal:\n• Turbidez da Água: Cristalina com perfeita refração\n• Eflorescência: Nenhuma anomalia detectada\n• Estabilidade da Resina: 100% Protegida\n\n💡 Prescrição: Manter filtragem normal de 6h. Proibido uso de ácido muriático!`
                    : `🟢 Sua piscina encontra-se EQUILIBRADA (Health Score: 98/100). Última limpeza: hoje às 08:30. Seu estoque de cloro dura aprox. 14 dias.`
                )}
              </p>
            </div>
          </div>

          {/* Feedback de SLA */}
          {dispatchResult && (
            <div className="pt-3 border-t border-slate-900 flex justify-between items-center text-xs">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                Entrega Confirmada
              </span>
              <span className="font-mono text-cyan-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                SLA: {dispatchResult.sla_seconds}s ({dispatchResult.sla_status})
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
