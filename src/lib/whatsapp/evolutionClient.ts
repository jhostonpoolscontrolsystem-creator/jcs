/**
 * JHPCS - Client Oficial de Integração com a Evolution API (v2 / Baileys)
 * Multi-Instância, Delay Humanizado Anti-Ban e Suporte a Textos e Documentos Base64/URL
 */

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL || 'https://whatsapp-ecostone.onrender.com';
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || 'Gabriel2006!';

function getHeaders() {
  return {
    'Content-Type': 'application/json',
    apikey: EVOLUTION_API_KEY,
  };
}

/**
 * Normaliza número para o padrão internacional DDI 55 (Brasil)
 */
export function normalizePhoneNumber(rawPhone: string): string {
  const digits = rawPhone.replace(/\D/g, '');
  if (digits.startsWith('55')) {
    return digits;
  }
  return `55${digits}`;
}

/**
 * 1. Cria uma nova instância isolada para o Tenant na Evolution API
 */
export async function createInstance(instanceName: string): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const res = await fetch(`${EVOLUTION_API_URL}/instance/create`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        instanceName,
        token: instanceName,
        qrcode: true,
        integration: 'WHATSAPP-BAILEYS',
      }),
    });

    const data = await res.json();
    return { success: res.ok, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * 2. Solicita o QR Code dinâmico para pareamento via WhatsApp
 */
export async function getQRCode(instanceName: string): Promise<{ success: boolean; base64?: string; pairingCode?: string; error?: string }> {
  try {
    const res = await fetch(`${EVOLUTION_API_URL}/instance/connect/${instanceName}`, {
      method: 'GET',
      headers: getHeaders(),
    });

    const data = await res.json();
    return {
      success: res.ok,
      base64: data.base64 || data.qrcode?.base64,
      pairingCode: data.pairingCode || data.code,
    };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * 3. Consulta o estado da conexão ('open', 'connecting', 'close')
 */
export async function getConnectionState(instanceName: string): Promise<{ success: boolean; state: 'open' | 'connecting' | 'close'; connectedNumber?: string }> {
  try {
    const res = await fetch(`${EVOLUTION_API_URL}/instance/connectionState/${instanceName}`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!res.ok) {
      return { success: false, state: 'close' };
    }

    const data = await res.json();
    const rawState = data?.instance?.state || data?.state || 'close';

    let state: 'open' | 'connecting' | 'close' = 'close';
    if (rawState === 'open' || rawState === 'connected') state = 'open';
    else if (rawState === 'connecting') state = 'connecting';

    return {
      success: true,
      state,
      connectedNumber: data?.instance?.ownerJid?.replace('@s.whatsapp.net', '') || data?.ownerJid,
    };
  } catch {
    return { success: false, state: 'close' };
  }
}

/**
 * 4. Envia mensagem de texto com delay humanizado anti-ban e 'digitando...'
 */
export async function sendTextMessage(
  instanceName: string,
  recipientNumber: string,
  message: string
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const normalizedNumber = normalizePhoneNumber(recipientNumber);

    const res = await fetch(`${EVOLUTION_API_URL}/message/sendText/${instanceName}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        number: normalizedNumber,
        text: message,
        textMessage: { text: message },
        options: {
          delay: 1500, // 1.5s delay anti-ban
          presence: 'composing', // Exibe "digitando..."
        },
      }),
    });

    const data = await res.json();
    return { success: res.ok, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * 5. Envia documento em PDF ou imagem via URL ou Base64
 * Suporta Base64 puro ou com prefixo data:...;base64, e URLs públicas
 */
export async function sendMediaDocument(
  instanceName: string,
  recipientNumber: string,
  mediaContent: string, // URL ou String Base64 pura
  fileName: string,
  caption?: string
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const normalizedNumber = normalizePhoneNumber(recipientNumber);

    // Sanitiza Base64 removendo eventual prefixo de data URI caso presente
    let sanitizedMedia = mediaContent;
    if (sanitizedMedia.includes(';base64,')) {
      sanitizedMedia = sanitizedMedia.split(';base64,')[1];
    }

    const res = await fetch(`${EVOLUTION_API_URL}/message/sendMedia/${instanceName}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        number: normalizedNumber,
        mediaMessage: {
          mediatype: 'document',
          mimetype: 'application/pdf',
          caption: caption || `📄 Relatório Técnico e Prestação de Contas JHPCS: ${fileName}`,
          media: sanitizedMedia,
          fileName,
        },
        options: {
          delay: 1500,
          presence: 'composing',
        },
      }),
    });

    const data = await res.json();
    return { success: res.ok, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * 6. Desconecta e faz logout da instância do Tenant
 */
export async function disconnectInstance(instanceName: string): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`${EVOLUTION_API_URL}/instance/logout/${instanceName}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    return { success: res.ok };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * 7. Reinicia a sessão da instância na Evolution API
 */
export async function restartInstance(instanceName: string): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const res = await fetch(`${EVOLUTION_API_URL}/instance/restart/${instanceName}`, {
      method: 'PUT',
      headers: getHeaders(),
    });
    const data = await res.json().catch(() => ({}));
    return { success: res.ok, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * 8. Deleta permanentemente a instância na Evolution API
 */
export async function deleteInstance(instanceName: string): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const res = await fetch(`${EVOLUTION_API_URL}/instance/delete/${instanceName}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    const data = await res.json().catch(() => ({}));
    return { success: res.ok, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
