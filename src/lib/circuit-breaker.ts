/**
 * Circuit Breaker & Exponential Backoff Resilience Engine
 * Protege o JHPCS contra instabilidades, timeouts e sobrecargas em serviços externos (Evolution API, OpenWeather, Webhooks)
 */

export interface CircuitBreakerOptions {
  failureThreshold?: number; // Número de falhas consecutivas para abrir o circuito (default: 3)
  recoveryTimeMs?: number;   // Tempo que o circuito fica aberto antes de tentar recuperar (default: 30000ms)
  timeoutMs?: number;        // Timeout individual de cada requisição (default: 8000ms)
  maxRetries?: number;       // Número de retentativas com backoff (default: 3)
}

export type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

class CircuitBreaker {
  private state: CircuitState = 'CLOSED';
  private failureCount = 0;
  private lastFailureTime = 0;
  private readonly failureThreshold: number;
  private readonly recoveryTimeMs: number;
  private readonly timeoutMs: number;
  private readonly maxRetries: number;
  private readonly serviceName: string;

  constructor(serviceName: string, options: CircuitBreakerOptions = {}) {
    this.serviceName = serviceName;
    this.failureThreshold = options.failureThreshold ?? 3;
    this.recoveryTimeMs = options.recoveryTimeMs ?? 30000;
    this.timeoutMs = options.timeoutMs ?? 8000;
    this.maxRetries = options.maxRetries ?? 3;
  }

  public getState(): CircuitState {
    if (this.state === 'OPEN' && Date.now() - this.lastFailureTime > this.recoveryTimeMs) {
      this.state = 'HALF_OPEN';
    }
    return this.state;
  }

  public async execute<T>(action: () => Promise<T>, fallback?: () => Promise<T> | T): Promise<T> {
    const currentState = this.getState();

    if (currentState === 'OPEN') {
      console.warn(`🚨 [CircuitBreaker:${this.serviceName}] Circuito ABERTO. Bloqueando chamada para evitar cascata.`);
      if (fallback) return await fallback();
      throw new Error(`[CircuitBreaker:${this.serviceName}] Serviço temporariamente indisponível (circuito aberto).`);
    }

    let lastError: any = null;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error(`Timeout de ${this.timeoutMs}ms excedido em ${this.serviceName}`)), this.timeoutMs)
        );

        const result = await Promise.race([action(), timeoutPromise]);
        this.onSuccess();
        return result;

      } catch (err: any) {
        lastError = err;
        console.warn(`⚠️ [CircuitBreaker:${this.serviceName}] Tentativa ${attempt}/${this.maxRetries} falhou: ${err.message}`);

        if (attempt < this.maxRetries) {
          // Exponential backoff com jitter: 200ms, 400ms, 800ms...
          const backoff = Math.pow(2, attempt) * 100 + Math.random() * 50;
          await new Promise(r => setTimeout(r, backoff));
        }
      }
    }

    this.onFailure();

    if (fallback) {
      console.info(`🔄 [CircuitBreaker:${this.serviceName}] Executando fallback gracioso.`);
      return await fallback();
    }

    throw lastError;
  }

  private onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  private onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();

    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
      console.error(`💥 [CircuitBreaker:${this.serviceName}] Limite de falhas atingido (${this.failureCount}). Circuito ABERTO por ${this.recoveryTimeMs / 1000}s.`);
    }
  }
}

// Instâncias globais reutilizáveis
export const evolutionApiBreaker = new CircuitBreaker('EvolutionAPI_WhatsApp', {
  failureThreshold: 3,
  recoveryTimeMs: 25000,
  timeoutMs: 6000,
  maxRetries: 3
});

export const weatherApiBreaker = new CircuitBreaker('OpenWeatherAPI', {
  failureThreshold: 4,
  recoveryTimeMs: 60000,
  timeoutMs: 5000,
  maxRetries: 2
});
