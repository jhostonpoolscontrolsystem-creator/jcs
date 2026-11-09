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
  name: string;
  role: string;
  tenant_id?: string;
  is_jhoston_direct_client?: boolean;
  email_masked: string;
  phone_masked?: string;
  cpf_masked?: string;
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
 * Mascara telefones: "5511999998888" -> "+55 (11) *****-8888"
 */
export function maskPhone(phone: string): string {
  if (!phone) return 'Não informado';
  const clean = phone.replace(/\D/g, '');
  if (clean.length < 8) return '(**) *****-****';
  const lastFour = clean.slice(-4);
  return `+55 (**) *****-${lastFour}`;
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
 * Sanitiza objeto de usuário para visualização em painéis globais (Super Usuário)
 */
export function sanitizeUserForAudit(user: any): SanitizedUser {
  return {
    id: user.id,
    name: user.name,
    role: user.role,
    tenant_id: user.tenant_id,
    is_jhoston_direct_client: Boolean(user.is_jhoston_direct_client),
    email_masked: maskEmail(user.email || ''),
    phone_masked: maskPhone(user.phone || ''),
    cpf_masked: maskCpf(user.cpf || ''),
  };
}
