/**
 * LGPD & Privacy Guard: Anonimização e Mascaramento de Dados Pessoais Sensíveis
 * 
 * Regra de Ouro (LGPD Art. 6º, III - Necessidade & Minimização):
 * O Super Usuário (Master / Diretoria) tem visão de telemetria da piscina,
 * saúde química e integridade estrutural, mas NÃO deve acessar dados pessoais
 * expostos (CPF, Telefones pessoais, senhas ou faturas bancárias individuais)
 * de clientes e prestadores terceiros que utilizam a plataforma aberta.
 */

export interface SanitizedUser {
  id: string;
  name_masked: string;
  role: string;
  tenant_id?: string;
  is_jhoston_direct_client?: boolean;
  email_masked: string;
  phone_masked?: string;
  cpf_masked?: string;
}

/**
 * Mascara nomes completos: "Daniel Souto Lopes" -> "D**** S**** L****"
 */
export function maskName(fullName: string): string {
  if (!fullName) return 'U*******';
  return fullName
    .split(' ')
    .filter(Boolean)
    .map(part => {
      if (part.length <= 2) return part;
      return `${part[0]}${'*'.repeat(Math.min(4, part.length - 1))}`;
    })
    .join(' ');
}

/**
 * Mascara e-mails: "danielsmlopes@hotmail.com" -> "d***s@hotmail.com"
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return '***@***.com';
  const [local, domain] = email.split('@');
  if (local.length <= 2) return `${local[0]}***@${domain}`;
  return `${local[0]}***${local[local.length - 1]}@${domain}`;
}

/**
 * Mascara telefones e WhatsApp: "5511999998888" -> "+55 (11) 9****-**88"
 */
export function maskPhone(phone: string): string {
  if (!phone) return 'Não informado';
  const clean = phone.replace(/\D/g, '');
  if (clean.length < 8) return '(**) *****-****';
  const ddd = clean.slice(2, 4) || clean.slice(0, 2);
  const lastTwo = clean.slice(-2);
  return `(${ddd}) 9****-**${lastTwo}`;
}

/**
 * Mascara CPF: "123.456.789-00" -> "***.456.***-00"
 */
export function maskCpf(cpf: string): string {
  if (!cpf) return '***.***.***-**';
  const clean = cpf.replace(/\D/g, '');
  if (clean.length !== 11) return '***.***.***-**';
  return `***.${clean.substring(3, 6)}.***-${clean.substring(9, 11)}`;
}

/**
 * Mascara Endereço Residencial: Exibe apenas Cidade/UF para correlação climática OpenWeather
 * Oculta Rua, Número e Bairro conforme determinação da LGPD.
 */
export function sanitizeAddressForTelemetry(city?: string, state?: string): string {
  if (!city && !state) return 'Localização Protegida (LGPD)';
  return `${city || 'Região'} - ${state || 'BR'}`;
}

/**
 * Cláusula de Consentimento Explícito (Termo de Adesão LGPD & Garantia JHoston)
 */
export const LGPD_JHOSTON_TELEMETRY_CONSENT_TEXT = 
  'Autorizo o compartilhamento estritamente técnico dos dados de equilíbrio químico (pH, Cloro, Alcalinidade, Dureza Cálcica e fotos de teste) com a JHoston Pools & Lagoons exclusivamente para efeito de auditoria pericial, monitoramento termodinâmico do ISL e manutenção da garantia contratual do revestimento. Declaro estar ciente de que valores comerciais, rotinas financeiras e dados pessoais não são compartilhados.';

/**
 * Sanitiza objeto de usuário para visualização em painéis globais (Super Usuário)
 */
export function sanitizeUserForAudit(user: any): SanitizedUser {
  return {
    id: user.id,
    name_masked: maskName(user.name || ''),
    role: user.role,
    tenant_id: user.tenant_id,
    is_jhoston_direct_client: Boolean(user.is_jhoston_direct_client),
    email_masked: maskEmail(user.email || ''),
    phone_masked: maskPhone(user.phone || ''),
    cpf_masked: maskCpf(user.cpf || ''),
  };
}
