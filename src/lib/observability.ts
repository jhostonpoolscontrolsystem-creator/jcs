/**
 * OpenTelemetry & Telemetry Observability Client for JHPCS
 * Monitoramento contínuo de latência, erros e envio de alertas estruturados para canais de engenharia (Slack/Discord Webhooks)
 */

interface TelemetryEvent {
  name: string;
  category: 'DATABASE' | 'CIRCUIT_BREAKER' | 'SECURITY' | 'PWA_SYNC' | 'PERFORMANCE';
  level: 'INFO' | 'WARN' | 'ERROR' | 'CRITICAL';
  durationMs?: number;
  metadata?: Record<string, any>;
  timestamp?: string;
}

class JhpcsObservability {
  private webhookUrl: string | undefined;

  constructor() {
    this.webhookUrl = process.env.DISCORD_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL;
  }

  public recordSpan(name: string, durationMs: number, success: boolean, metadata?: Record<string, any>) {
    const isSlow = durationMs > 1200;
    
    if (!success || isSlow) {
      this.dispatchAlert({
        name,
        category: 'PERFORMANCE',
        level: !success ? 'ERROR' : 'WARN',
        durationMs,
        metadata: {
          ...metadata,
          reason: isSlow ? 'Degradação de SLA de Performance (>1200ms)' : 'Falha na execução do span'
        }
      });
    }
  }

  public async dispatchAlert(event: TelemetryEvent) {
    const payload = {
      ...event,
      timestamp: event.timestamp || new Date().toISOString(),
      environment: process.env.NODE_ENV || 'production',
      app: 'JHPCS-CORE-SYSTEM'
    };

    console.log(`📡 [Observability:${payload.level}] [${payload.category}] ${payload.name}`, payload.metadata || '');

    // Se houver webhook do Slack ou Discord configurado, despacha em segundo plano sem bloquear a requisição
    if (this.webhookUrl && (payload.level === 'ERROR' || payload.level === 'CRITICAL')) {
      try {
        const bodyContent = this.webhookUrl.includes('discord.com')
          ? {
              content: `🚨 **[JHPCS Alerta de Engenharia]**\n**Evento:** \`${payload.name}\`\n**Gravidade:** \`${payload.level}\` | **Pilar:** \`${payload.category}\`\n**Duração:** ${payload.durationMs || 0}ms\n\`\`\`json\n${JSON.stringify(payload.metadata, null, 2)}\n\`\`\``
            }
          : {
              text: `🚨 *[JHPCS Alerta de Engenharia]*: ${payload.name} (${payload.level}) - ${JSON.stringify(payload.metadata)}`
            };

        fetch(this.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyContent)
        }).catch(e => console.warn('Falha silenciosa ao despachar webhook de observabilidade:', e.message));
      } catch (e) {
        // Observabilidade nunca deve derrubar o fluxo principal
      }
    }
  }
}

export const telemetry = new JhpcsObservability();
