/**
 * Configuração Central dos Gestores e Fundadores MASTER do Ecossistema JHPCS
 * Daniel Lopes & Patrícia Grübel
 */

export interface MasterContact {
  id: string;
  name: string;
  firstName: string;
  role: 'MASTER';
  title: string;
  phone: string; // formato internacional Evolution API E.164 (55 + DDD + número)
  email: string;
}

export const MASTER_CONTACTS: MasterContact[] = [
  {
    id: 'master-daniel',
    name: 'Daniel Lopes',
    firstName: 'Daniel',
    role: 'MASTER',
    title: 'Fundador & Arquiteto Tecnológico',
    phone: '5511913192703',
    email: 'danielsmlopes@hotmail.com',
  },
  {
    id: 'master-patricia',
    name: 'Patrícia Grübel',
    firstName: 'Patrícia',
    role: 'MASTER',
    title: 'Fundadora & Gestora Operacional',
    phone: '551178543369',
    email: 'patigrubel@gmail.com',
  },
];

/**
 * Função utilitária para despachar mensagem personalizada para os MASTERs
 */
export async function notifyAllMastersViaWhatsApp(
  getMessageForMaster: (master: MasterContact) => string
): Promise<{ success: boolean; dispatched: Array<{ master: string; phone: string; status: string }> }> {
  const evolutionUrl = process.env.EVOLUTION_API_URL || 'http://localhost:8080';
  const evolutionApiKey = process.env.EVOLUTION_API_KEY || '';
  const instanceName = process.env.EVOLUTION_INSTANCE_NAME || 'jhoston_pools_oficial';

  const dispatched: Array<{ master: string; phone: string; status: string }> = [];

  for (const master of MASTER_CONTACTS) {
    const personalizedText = getMessageForMaster(master);

    if (evolutionApiKey) {
      try {
        await fetch(`${evolutionUrl}/message/sendText/${instanceName}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: evolutionApiKey,
          },
          body: JSON.stringify({
            number: master.phone,
            text: personalizedText,
            textMessage: {
              text: personalizedText,
            },
            options: {
              delay: 800,
              presence: 'composing',
            },
          }),
        });
        dispatched.push({ master: master.name, phone: master.phone, status: 'SENT_VIA_EVOLUTION_API' });
      } catch (e: any) {
        console.warn(`[JHPCS] Falha ao enviar WhatsApp para ${master.name} (${master.phone}):`, e?.message || e);
        dispatched.push({ master: master.name, phone: master.phone, status: 'FAILED' });
      }
    } else {
      dispatched.push({ master: master.name, phone: master.phone, status: 'SIMULATED_NO_API_KEY' });
    }
  }

  return { success: true, dispatched };
}
